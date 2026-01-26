/**
 * Shared navigation links used across the application
 */

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Assista' },
  { href: '/about', label: 'Sobre' },
] as const;
