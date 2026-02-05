'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ConnectModal } from './connect-modal'
import { ConnectStatus } from './connect-status'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import type { ConnectErrorCode, PendingConnection } from '@/lib/auth/types'

interface ConnectFlowProps {
  pendingConnection: PendingConnection | null
}

export function ConnectFlow({ pendingConnection }: ConnectFlowProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const connectParam = searchParams.get('connect')
  const errorCode = searchParams.get('code') as ConnectErrorCode | null

  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<'pending' | 'success' | 'error' | null>(null)
  const [connectedUsername, setConnectedUsername] = useState<string | null>(null)

  useEffect(() => {
    if (connectParam === 'pending' && pendingConnection) {
      setStatus('pending')
      setIsOpen(true)
    } else if (connectParam === 'error') {
      setStatus('error')
      setIsOpen(true)
    } else if (connectParam === 'success') {
      setStatus('success')
      setIsOpen(true)
    }
  }, [connectParam, pendingConnection])

  const clearParams = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('connect')
    url.searchParams.delete('code')
    router.replace(url.pathname, { scroll: false })
  }

  const handleClose = async () => {
    if (status === 'pending') {
      // Clear the session when canceling
      await fetch('/api/auth/connect', { method: 'DELETE' })
    }
    setIsOpen(false)
    setStatus(null)
    clearParams()
  }

  const handleConfirm = async () => {
    try {
      const response = await fetch('/api/auth/connect', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.code === 'already_connected') {
          setStatus('error')
          return
        }
        throw new Error(data.error || 'Failed to connect')
      }

      setConnectedUsername(data.data.stream_name)
      setStatus('success')
      clearParams()
    } catch (error) {
      console.error('Error confirming connection:', error)
      setStatus('error')
    }
  }

  if (!isOpen) {
    return null
  }

  // Show confirmation modal
  if (status === 'pending' && pendingConnection) {
    return (
      <ConnectModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        discordUsername={pendingConnection.discordUsername}
        discordAvatar={pendingConnection.discordAvatar}
        twitchUsername={pendingConnection.twitchUsername}
      />
    )
  }

  // Show success or error state in a dialog
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>
            {status === 'success' ? 'Conexão realizada' : 'Erro na conexão'}
          </DialogTitle>
        </VisuallyHidden>
        <ConnectStatus
          status={status === 'success' ? 'success' : 'error'}
          errorCode={errorCode || undefined}
          twitchUsername={connectedUsername || pendingConnection?.twitchUsername}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}
