'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TwitchIcon, DiscordIcon } from '@/components/icons/social-icons'
import { Loader2, ExternalLink } from 'lucide-react'

interface ConnectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  discordUsername: string
  discordAvatar: string | null
  twitchUsername: string
}

export function ConnectModal({
  isOpen,
  onClose,
  onConfirm,
  discordUsername,
  discordAvatar,
  twitchUsername,
}: ConnectModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-syne">Confirmar conexão</DialogTitle>
          <DialogDescription>
            Verifique se as informações abaixo estao corretas antes de confirmar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Discord Account */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center overflow-hidden">
              {discordAvatar ? (
                <Image
                  src={discordAvatar}
                  alt={discordUsername}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DiscordIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Discord</p>
              <p className="font-medium truncate">{discordUsername}</p>
            </div>
          </div>

          {/* Twitch Account */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#9146FF] flex items-center justify-center">
              <TwitchIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Twitch</p>
              <p className="font-medium truncate">{twitchUsername}</p>
            </div>
            <a
              href={`https://twitch.tv/${twitchUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-cyan transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Ao confirmar, sua conta Twitch sera adicionada a lista de streamers da
          comunidade Randomizer Brasil.
        </p>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-brand-cyan hover:bg-brand-cyan/80 text-brand-navy"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Conectando...
              </>
            ) : (
              'Confirmar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
