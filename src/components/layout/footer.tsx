import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from './logo';
import { siteConfig, navLinks } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-2" aria-label="artsource - Accueil">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-secondary-900 font-black text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white leading-none">
                    {siteConfig.name}
                  </span>
                  <span className="text-[10px] text-secondary-400 uppercase tracking-widest">
                    Impression Pro
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-secondary-400 text-sm leading-relaxed">
              Votre partenaire impression à Guelmim. Qualité professionnelle, 
              délais rapides, prix compétitifs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nos Services</h3>
            <ul className="space-y-3 text-sm text-secondary-400">
              <li>
                <Link href="/products/cartes-de-visite" className="hover:text-primary-400 transition-colors">
                  Cartes de visite
                </Link>
              </li>
              <li>
                <Link href="/products/flyers-depliants" className="hover:text-primary-400 transition-colors">
                  Flyers & Dépliants
                </Link>
              </li>
              <li>
                <Link href="/products/baches-banderoles" className="hover:text-primary-400 transition-colors">
                  Bâches & Banderoles
                </Link>
              </li>
              <li>
                <Link href="/products/stickers-autocollants" className="hover:text-primary-400 transition-colors">
                  Stickers
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary-400 transition-colors font-medium">
                  Voir tous les produits →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-3 text-secondary-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-400">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-400">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div className="text-sm">
                  <p>Lun - Sam: {siteConfig.hours.weekdays}</p>
                  <p>Dimanche: {siteConfig.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-500 text-sm">
              © {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-secondary-500 hover:text-primary-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-secondary-500 hover:text-primary-400 transition-colors"
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
