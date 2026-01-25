import Link from "next/link";
import Image from "next/image";
import { socials } from "@/lib/socials";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/80 backdrop-blur-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/5 via-transparent to-transparent pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-brand-cyan/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-brand-cyan/20 pointer-events-none" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logos/rbr-icon-logo.svg"
                alt="RBR Logo"
                width={48}
                height={48}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground font-syne">
                  Randomizer Brasil
                </span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  Hub da Comunidade
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground font-dm-sans leading-relaxed max-w-sm">
              Conectando a comunidade brasileira de randomizers.
              Assista streams, participe de eventos e faça parte da nossa comunidade.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">
              Navegação
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-brand-cyan transition-colors font-dm-sans"
              >
                Assista
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-brand-cyan transition-colors font-dm-sans"
              >
                Sobre
              </Link>
            </nav>
          </div>

          {/* Socials Section */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-cyan mb-4">
              Conecte-se
            </h3>

            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-xl border border-border/50 bg-card/30 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-brand-cyan/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                  <social.icon className="relative w-5 h-5 text-muted-foreground group-hover:text-brand-cyan transition-colors duration-300" />
                </a>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground/60 font-mono">
              Siga-nos nas redes sociais
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60 font-mono">
            © {new Date().getFullYear()} Randomizer Brasil
          </p>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-cyan/60 animate-pulse" />
            <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wider">
              Feito com 💙 pela comunidade
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
