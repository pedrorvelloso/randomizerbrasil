import { cookies } from 'next/headers'
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import type { OAuthState, ConnectSession, PendingConnection } from './types'

const SESSION_SECRET = process.env.SESSION_SECRET || ''
const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16

const OAUTH_STATE_COOKIE = 'oauth_state'
const CONNECT_SESSION_COOKIE = 'connect_session'

const STATE_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes
const SESSION_EXPIRY_MS = 60 * 60 * 1000 // 1 hour

function getKey(): Buffer {
  if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set')
  }
  // Use first 32 bytes of base64-decoded secret
  const decoded = Buffer.from(SESSION_SECRET, 'base64')
  if (decoded.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 bytes when base64 decoded')
  }
  return decoded.subarray(0, 32)
}

function encrypt(data: string): string {
  const key = getKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(data, 'utf8', 'base64')
  encrypted += cipher.final('base64')

  const authTag = cipher.getAuthTag()

  // Format: iv:authTag:encrypted (all base64)
  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted}`
}

function decrypt(encryptedData: string): string | null {
  try {
    const key = getKey()
    const [ivB64, authTagB64, encrypted] = encryptedData.split(':')

    if (!ivB64 || !authTagB64 || !encrypted) {
      return null
    }

    const iv = Buffer.from(ivB64, 'base64')
    const authTag = Buffer.from(authTagB64, 'base64')

    const decipher = createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch {
    return null
  }
}

/**
 * Generate a cryptographically secure state parameter
 */
export function generateState(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Store OAuth state in an encrypted cookie
 */
export async function setOAuthState(state: string, returnUrl: string): Promise<void> {
  const cookieStore = await cookies()

  const data: OAuthState = {
    state,
    returnUrl,
    expiresAt: Date.now() + STATE_EXPIRY_MS,
  }

  const encrypted = encrypt(JSON.stringify(data))

  cookieStore.set(OAUTH_STATE_COOKIE, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: STATE_EXPIRY_MS / 1000,
    path: '/',
  })
}

/**
 * Validate and retrieve OAuth state from cookie
 */
export async function validateOAuthState(state: string): Promise<OAuthState | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(OAUTH_STATE_COOKIE)

  if (!cookie?.value) {
    return null
  }

  const decrypted = decrypt(cookie.value)
  if (!decrypted) {
    return null
  }

  try {
    const data: OAuthState = JSON.parse(decrypted)

    // Validate state matches
    if (data.state !== state) {
      return null
    }

    // Validate not expired
    if (Date.now() > data.expiresAt) {
      return null
    }

    return data
  } catch {
    return null
  }
}

/**
 * Clear OAuth state cookie
 */
export async function clearOAuthState(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(OAUTH_STATE_COOKIE)
}

/**
 * Store pending connection in session
 */
export async function setPendingConnection(connection: PendingConnection): Promise<void> {
  const cookieStore = await cookies()

  const session: ConnectSession = {
    pendingConnection: connection,
    connectedAt: null,
  }

  const encrypted = encrypt(JSON.stringify(session))

  cookieStore.set(CONNECT_SESSION_COOKIE, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY_MS / 1000,
    path: '/',
  })
}

/**
 * Get current connect session
 */
export async function getConnectSession(): Promise<ConnectSession | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(CONNECT_SESSION_COOKIE)

  if (!cookie?.value) {
    return null
  }

  const decrypted = decrypt(cookie.value)
  if (!decrypted) {
    return null
  }

  try {
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}

/**
 * Mark connection as completed
 */
export async function markConnectionComplete(): Promise<void> {
  const cookieStore = await cookies()
  const session = await getConnectSession()

  if (!session) {
    return
  }

  const updatedSession: ConnectSession = {
    pendingConnection: null,
    connectedAt: new Date().toISOString(),
  }

  const encrypted = encrypt(JSON.stringify(updatedSession))

  cookieStore.set(CONNECT_SESSION_COOKIE, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY_MS / 1000,
    path: '/',
  })
}

/**
 * Clear connect session
 */
export async function clearConnectSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(CONNECT_SESSION_COOKIE)
}
