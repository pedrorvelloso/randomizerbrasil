'use client'

import { Button } from '@/components/ui/button'
import { DiscordIcon } from '@/components/icons/social-icons'
import { cn } from '@/lib/utils'

interface ConnectButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function ConnectButton({
  className,
  variant = 'default',
  size = 'default',
}: ConnectButtonProps) {
  const handleClick = () => {
    window.location.href = '/api/auth/discord'
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn(
        'gap-2',
        variant === 'default' &&
          'bg-[#5865F2] hover:bg-[#4752C4] text-white',
        className
      )}
    >
      <DiscordIcon className="w-4 h-4" />
      <span>Conectar com Discord</span>
    </Button>
  )
}
