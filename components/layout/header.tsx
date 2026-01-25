"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for mobile menu to reduce initial bundle size
// Sheet components are heavy and only needed on mobile
const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => ({ default: mod.MobileMenu })),
  {
    ssr: false, // Mobile menu doesn't need SSR
  }
);

interface NavLink {
  href: string;
  label: string;
}

// Navigation links defined at module level to prevent recreation
const navigationLinks: NavLink[] = [
  { href: "/", label: "Assista" },
  { href: "/about", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Randomizer Brasil Home"
        >
          {/* Logo */}
          <Image
            src="/images/logos/rbr-icon-logo.svg"
            alt="RBR Logo"
            width={40}
            height={40}
            className="md:hidden"
            priority
          />
          <Image
            src="/images/logos/rbr-icon-logo.svg"
            alt="RBR Logo"
            width={48}
            height={48}
            className="hidden md:block"
            priority
          />

          {/* Brand Text */}
          <div className="hidden md:flex flex-col">
            <span className="text-lg md:text-xl font-bold text-foreground">
              Randomizer Brasil
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground">
              Hub da Comunidade
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-stretch h-full" aria-label="Main navigation">
          {navigationLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="group relative flex items-center">
                <div className="relative px-5 h-full flex items-center overflow-hidden">
                  {/* Background */}
                  <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-brand-cyan/10' : 'bg-brand-cyan/0 group-hover:bg-brand-cyan/10'}`} />

                  {/* Border Accent */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-brand-cyan transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />

                  {/* Text */}
                  <span className={`relative font-syne font-semibold transition-all duration-300 uppercase tracking-wide text-sm ${isActive ? 'text-brand-cyan' : 'text-foreground group-hover:text-brand-cyan'}`}>
                    {link.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu - Dynamically loaded to reduce initial bundle */}
        <MobileMenu navigationLinks={navigationLinks} />
      </div>
    </header>
  );
}
