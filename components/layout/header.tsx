"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { navLinks } from "@/lib/navigation";
import { Logo } from "./logo";

// Dynamic import for mobile menu to reduce initial bundle size
// Sheet components are heavy and only needed on mobile
const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => ({ default: mod.MobileMenu })),
  {
    ssr: false, // Mobile menu doesn't need SSR
  }
);

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        {/* Mobile: icon only */}
        <Link
          href="/"
          className="md:hidden"
          aria-label="Randomizer Brasil Home"
        >
          <Image
            src="/images/logos/rbr-icon-logo.svg"
            alt="RBR Logo"
            width={40}
            height={40}
            priority
          />
        </Link>
        {/* Desktop: full logo */}
        <Logo size="md" className="hidden md:inline-flex" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-stretch h-full" aria-label="Main navigation">
          {navLinks.map((link) => {
            const normalizePathname = pathname.replace('/index', '/')
            const isActive = link.href === "/"
              ? normalizePathname === "/"
              : normalizePathname?.startsWith(link.href)
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
        <MobileMenu navigationLinks={navLinks} />
      </div>
    </header>
  );
}
