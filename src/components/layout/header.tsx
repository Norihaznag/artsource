'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, FileText } from 'lucide-react';
import { Logo } from './logo';
import { Button } from '@/components/ui';
import { navLinks, siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary-100">
      <nav className="container mx-auto px-4" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-primary-100 text-secondary-900'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
              aria-label="Appelez-nous"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{siteConfig.contact.phone}</span>
            </a>
            <Link href="/quote">
              <Button size="sm">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Demander un Devis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary-100 text-secondary-900'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-secondary-100 mt-2">
              <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full" size="md">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Demander un Devis
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
