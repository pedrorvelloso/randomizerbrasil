"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { socials } from "@/lib/socials";
import type { NavLink } from "@/lib/navigation";

interface MobileMenuProps {
  navigationLinks: NavLink[];
}

// Hoisted style objects to prevent recreation on each render
const gridBackgroundStyle = {
  backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)',
  backgroundSize: '40px 40px',
  animation: 'gridPulse 4s ease-in-out infinite'
};

const accentLineStyle = {
  animationDelay: '1s'
};

const getNavItemAnimationStyle = (index: number) => ({
  animation: `slideInRight 0.5s ease-out forwards`,
  animationDelay: `${index * 0.1}s`,
  opacity: 0
});

const bottomAccentStyle = (navLinksLength: number) => ({
  animation: `slideInRight 0.5s ease-out forwards`,
  animationDelay: `${navLinksLength * 0.1}s`,
  opacity: 0
});

export function MobileMenu({ navigationLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-brand-cyan hover:bg-brand-cyan/10"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full bg-background border-l-2 border-brand-cyan/20 p-0 overflow-hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Menu de Navegação</SheetTitle>
          <SheetDescription>Navegue pelas páginas do site</SheetDescription>
        </VisuallyHidden>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={gridBackgroundStyle} />

        {/* Diagonal Accent Lines */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-2 bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent rotate-45 animate-pulse-slow" />
          <div className="absolute top-40 -right-32 w-64 h-1 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent rotate-45" style={accentLineStyle} />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-brand-cyan/40" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-brand-cyan/40" />

        {/* Glowing Orb */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] animate-pulse-slow" />

        {/* Mobile Navigation */}
        <nav className="relative flex flex-col h-full justify-center px-8 gap-1" aria-label="Mobile navigation">
          {navigationLinks.map((link, index) => {
            const isActive = link.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(link.href) ?? false;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group relative overflow-hidden"
                style={getNavItemAnimationStyle(index)}
              >
                {/* Nav Link */}
                <div className={`relative pl-8 py-6 border-l-4 transition-all duration-300 ${isActive ? 'border-brand-cyan' : 'border-transparent group-hover:border-brand-cyan'}`}>
                  <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-brand-cyan/5' : 'bg-brand-cyan/0 group-hover:bg-brand-cyan/5'}`} style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }} />
                  <span className={`relative font-syne text-3xl font-bold transition-all duration-300 inline-block uppercase tracking-wide ${isActive ? 'text-brand-cyan translate-x-2' : 'text-foreground group-hover:text-brand-cyan group-hover:translate-x-2'}`}>
                    {link.label}
                  </span>

                  {/* Glow Effect */}
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-cyan rounded-full transition-opacity duration-300 shadow-[0_0_20px_rgba(0,217,255,0.8)] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </Link>
            );
          })}

          {/* Social Links */}
          <div className="mt-12 pl-8 flex gap-4" style={bottomAccentStyle(navigationLinks.length)}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 transition-colors"
                aria-label={social.label}
              >
                <span
                  className="block text-muted-foreground transition-colors duration-300 group-hover:text-[var(--social-color)]"
                  style={{ "--social-color": social.color } as React.CSSProperties}
                >
                  <social.icon className="w-6 h-6" />
                </span>
              </a>
            ))}
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 pl-8 space-y-2">
            <div className="h-px w-32 bg-gradient-to-r from-brand-cyan/50 to-transparent" />
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Hub da Comunidade
            </p>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
