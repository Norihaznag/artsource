import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { siteConfig } from '@/lib/config';
import { generateWhatsAppLink } from '@/lib/utils';

export function CTASection() {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    'Bonjour artsource! Je souhaite obtenir un devis pour mes impressions.'
  );

  return (
    <section className="py-16 md:py-20 bg-secondary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à lancer votre projet d&apos;impression?
          </h2>
          <p className="text-lg text-secondary-300 mb-8">
            Obtenez un devis gratuit en quelques minutes. Notre équipe est à votre disposition 
            pour vous accompagner dans tous vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button size="lg" className="w-full sm:w-auto">
                Demander un devis gratuit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp direct
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
