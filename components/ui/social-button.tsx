import Link from "next/link"
import { cn } from "@/lib/utils"
import { DiscordIcon, TwitchIcon } from "@/components/icons/social-icons"

const platformStyles = {
  discord: {
    bg: "bg-[#5865F2]",
    hover: "hover:bg-[#4752C4]",
    icon: DiscordIcon,
  },
  twitch: {
    bg: "bg-[#9146FF]",
    hover: "hover:bg-[#772CE8]",
    icon: TwitchIcon,
  },
} as const

type Platform = keyof typeof platformStyles

interface SocialButtonBaseProps {
  platform: Platform
  children: React.ReactNode
  className?: string
}

interface SocialButtonLinkProps extends SocialButtonBaseProps {
  href: string
  external?: boolean
  onClick?: never
}

interface SocialButtonActionProps extends SocialButtonBaseProps {
  onClick: () => void
  href?: never
  external?: never
}

type SocialButtonProps = SocialButtonLinkProps | SocialButtonActionProps

export function SocialButton({
  platform,
  children,
  className,
  href,
  external = true,
  onClick,
}: SocialButtonProps) {
  const { bg, hover, icon: Icon } = platformStyles[platform]

  const buttonClasses = cn(
    "inline-flex items-center gap-2 px-3 py-2 text-white text-sm rounded-lg transition-colors cursor-pointer font-semibold",
    bg,
    hover,
    className
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={buttonClasses}>
        <Icon className="w-5 h-5" />
        {children}
      </button>
    )
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        <Icon className="w-5 h-5" />
        {children}
      </a>
    )
  }

  return (
    <Link href={href!} className={buttonClasses}>
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  )
}
