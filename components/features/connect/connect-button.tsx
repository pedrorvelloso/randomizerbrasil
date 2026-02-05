'use client'

import { SocialButton } from '@/components/ui/social-button'

interface ConnectButtonProps {
  className?: string
}

export function ConnectButton({ className }: ConnectButtonProps) {
  const handleClick = () => {
    window.location.href = '/api/auth/discord'
  }

  return (
    <SocialButton
      platform="discord"
      onClick={handleClick}
      className={className}
    >
      Conectar com Discord
    </SocialButton>
  )
}
