export interface OAuthState {
  state: string
  returnUrl: string
  expiresAt: number
}

export interface PendingConnection {
  discordId: string
  discordUsername: string
  discordAvatar: string | null
  twitchId: string
  twitchUsername: string
}

export interface ConnectSession {
  pendingConnection: PendingConnection | null
  connectedAt: string | null
}

export type ConnectErrorCode =
  | 'not_in_guild'
  | 'no_twitch'
  | 'already_connected'
  | 'bot_unavailable'
  | 'oauth_denied'
  | 'invalid_state'
  | 'generic'

export interface ConnectError {
  code: ConnectErrorCode
  title: string
  description: string
  action: {
    label: string
    href?: string
  }
}

export const CONNECT_ERRORS: Record<ConnectErrorCode, ConnectError> = {
  not_in_guild: {
    code: 'not_in_guild',
    title: 'Entre no Discord primeiro',
    description:
      'Você precisa ser membro do servidor da Randomizer Brasil para conectar sua conta.',
    action: { label: 'Entrar no Discord', href: '/discord' },
  },
  no_twitch: {
    code: 'no_twitch',
    title: 'Conecte sua Twitch ao Discord',
    description:
      'Vá em Discord → Configurações → Conexões e conecte sua conta Twitch.',
    action: { label: 'Tentar novamente' },
  },
  already_connected: {
    code: 'already_connected',
    title: 'Conta já registrada',
    description: 'Esta conta Twitch já está na lista de streamers.',
    action: { label: 'Voltar', href: '/' },
  },
  bot_unavailable: {
    code: 'bot_unavailable',
    title: 'Serviço indisponível',
    description:
      'Não foi possível verificar sua conta. Tente novamente em alguns minutos.',
    action: { label: 'Tentar novamente' },
  },
  oauth_denied: {
    code: 'oauth_denied',
    title: 'Autorização negada',
    description: 'Você precisa autorizar o acesso para conectar sua conta.',
    action: { label: 'Tentar novamente' },
  },
  invalid_state: {
    code: 'invalid_state',
    title: 'Erro de segurança',
    description: 'O link expirou ou é inválido. Por favor, tente novamente.',
    action: { label: 'Tentar novamente' },
  },
  generic: {
    code: 'generic',
    title: 'Algo deu errado',
    description: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    action: { label: 'Tentar novamente' },
  },
}
