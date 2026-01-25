import Link from "next/link";

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  statusLabel?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function ErrorPage({
  code,
  title,
  description,
  statusLabel = "Erro Detectado",
  actionLabel = "Voltar ao Início",
  actionHref = "/",
}: ErrorPageProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 217, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-cyan/5 rounded-full blur-[80px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Glitchy error code */}
        <div className="relative mb-8">
          {/* Shadow layers for depth */}
          <span
            className="absolute inset-0 font-syne text-[7rem] sm:text-[12rem] md:text-[16rem] font-black text-brand-cyan/10 select-none"
            style={{ transform: "translate(8px, 8px)" }}
            aria-hidden="true"
          >
            {code}
          </span>
          <span
            className="absolute inset-0 font-syne text-[7rem] sm:text-[12rem] md:text-[16rem] font-black text-brand-cyan/5 select-none hidden sm:block"
            style={{ transform: "translate(16px, 16px)" }}
            aria-hidden="true"
          >
            {code}
          </span>

          {/* Main code with glitch effect */}
          <h1 className="relative font-syne text-[7rem] sm:text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter">
            <span className="relative inline-block">
              {/* Cyan layer - offset left */}
              <span
                className="absolute inset-0 text-brand-cyan opacity-70"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                  transform: "translateX(-4px)",
                }}
                aria-hidden="true"
              >
                {code}
              </span>
              {/* White main text */}
              <span className="relative text-foreground">{code}</span>
              {/* Cyan layer - offset right */}
              <span
                className="absolute inset-0 text-brand-cyan opacity-70"
                style={{
                  clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                  transform: "translateX(4px)",
                }}
                aria-hidden="true"
              >
                {code}
              </span>
            </span>
          </h1>

          {/* Decorative lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6 max-w-md mx-auto">
          <div className="relative px-4 py-2">
            <p className="font-mono text-xs text-brand-cyan uppercase tracking-[0.3em] mb-2">
              Erro de Navegação
            </p>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="font-dm-sans text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-center mt-4">
            <Link
              href={actionHref}
              className="group relative inline-flex items-center gap-3 px-8 py-4"
            >
              {/* Button background with hover effect */}
              <div className="absolute inset-0 bg-brand-cyan/10 border border-brand-cyan/30 transition-all duration-300 group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/50" />

              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-brand-cyan transition-all duration-300 group-hover:w-4 group-hover:h-4" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-brand-cyan transition-all duration-300 group-hover:w-4 group-hover:h-4" />

              {/* Arrow icon */}
              <svg
                className="relative w-5 h-5 text-brand-cyan transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>

              <span className="relative font-syne font-semibold text-foreground uppercase tracking-wide">
                {actionLabel}
              </span>
            </Link>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Status: {statusLabel}
          </span>
        </div>
      </div>

      {/* Floating decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-brand-cyan/30 to-transparent" />
      <div className="hidden md:block absolute top-40 left-10 w-8 h-px bg-gradient-to-r from-brand-cyan/30 to-transparent" />

      <div className="hidden md:block absolute bottom-20 right-10 w-px h-24 bg-gradient-to-t from-brand-cyan/30 to-transparent" />
      <div className="hidden md:block absolute bottom-20 right-10 w-12 h-px bg-gradient-to-l from-brand-cyan/30 to-transparent" />
    </div>
  );
}
