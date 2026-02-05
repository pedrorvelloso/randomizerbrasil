import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    image: 40,
    title: "text-lg font-bold",
    subtitle: "text-xs",
  },
  md: {
    image: 48,
    title: "text-xl font-bold",
    subtitle: "text-xs",
  },
  lg: {
    image: 56,
    title: "text-2xl font-bold",
    subtitle: "text-sm",
  },
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="Randomizer Brasil Home"
    >
      <Image
        src="/images/logos/rbr-icon-logo.svg"
        alt="RBR Logo"
        width={config.image}
        height={config.image}
        priority
      />
      {showText && (
        <div className="flex flex-col">
          <span className={cn(config.title, "text-foreground font-syne")}>
            Randomizer Brasil
          </span>
          <span className={cn(config.subtitle, "text-muted-foreground font-mono uppercase tracking-widest")}>
            Hub da Comunidade
          </span>
        </div>
      )}
    </Link>
  );
}
