import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { siteConfig } from '@/lib/config';
import { generateWhatsAppLink } from '@/lib/utils';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

export function HeroSection({
  title = 'Impression Professionnelle à Guelmim',
  subtitle = 'Cartes de visite, flyers, stickers, bâches… devis rapide sur WhatsApp. Qualité premium, prix compétitifs.',
  ctaPrimaryText = 'Demander un Devis',
  ctaPrimaryLink = '/quote',
  ctaSecondaryText = 'WhatsApp Maintenant',
  ctaSecondaryLink,
}: HeroSectionProps) {
  const whatsappUrl = ctaSecondaryLink || generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    'Bonjour artsource! Je souhaite obtenir un devis pour mes impressions.'
  );

  return (
    <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Yellow accent */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-primary-500 opacity-10 blur-3xl transform translate-x-1/4"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" aria-hidden="true" />
            Imprimerie professionnelle à Guelmim
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {title.split(' – ')[0]}
            {title.includes(' – ') && (
              <>
                <br />
                <span className="text-primary-400">{title.split(' – ')[1]}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaPrimaryLink}>
              <Button size="lg" className="w-full sm:w-auto text-lg">
                {ctaPrimaryText}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto text-lg">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {ctaSecondaryText}
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-secondary-400">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Livraison rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Qualité garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Devis gratuit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
