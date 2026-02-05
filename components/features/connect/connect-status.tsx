'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CONNECT_ERRORS, type ConnectErrorCode } from '@/lib/auth/types'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ConnectStatusProps {
  status: 'success' | 'error'
  errorCode?: ConnectErrorCode
  twitchUsername?: string
  onClose?: () => void
}

export function ConnectStatus({
  status,
  errorCode,
  twitchUsername,
  onClose,
}: ConnectStatusProps) {
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-syne">Conectado com sucesso!</h2>
          <p className="text-muted-foreground">
            Sua conta Twitch{' '}
            <span className="text-brand-cyan font-medium">{twitchUsername}</span>{' '}
            foi adicionada a lista de streamers.
          </p>
        </div>
        {onClose ? (
          <Button onClick={onClose}>Fechar</Button>
        ) : (
          <Button asChild>
            <Link href="/">Voltar ao inicio</Link>
          </Button>
        )}
      </div>
    )
  }

  const error = errorCode ? CONNECT_ERRORS[errorCode] : CONNECT_ERRORS.generic

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-syne">{error.title}</h2>
        <p className="text-muted-foreground max-w-md">{error.description}</p>
      </div>
      <div className="flex gap-2">
        {error.action.href ? (
          <Button asChild>
            <Link href={error.action.href}>{error.action.label}</Link>
          </Button>
        ) : (
          <Button onClick={() => (window.location.href = '/api/auth/discord')}>
            {error.action.label}
          </Button>
        )}
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        )}
      </div>
    </div>
  )
}
