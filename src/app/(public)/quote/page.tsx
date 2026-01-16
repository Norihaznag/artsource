import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui';
import { QuoteForm } from '@/components/forms';
import { siteConfig } from '@/lib/config';
import { Check, MessageCircle, Phone, Clock } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Demander un Devis Gratuit',
  description: 'Obtenez un devis gratuit pour vos impressions à Guelmim. Cartes de visite, flyers, bâches, stickers. Réponse rapide garantie.',
  openGraph: {
    title: `Devis Gratuit | ${siteConfig.name}`,
    description: 'Obtenez un devis gratuit pour vos impressions à Guelmim. Réponse rapide garantie.',
  },
};

const benefits = [
  'Devis gratuit et sans engagement',
  'Réponse sous 24h maximum',
  'Conseils personnalisés',
  'Prix compétitifs garantis',
  'Livraison dans toute la région',
];

export default function QuotePage() {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    'Bonjour artsource! Je souhaite obtenir un devis.'
  );

  return (
    <>
      {/* Header */}
      <section className="bg-secondary-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" aria-hidden="true" />
              Réponse sous 24h
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Demandez votre Devis Gratuit
            </h1>
            <p className="text-lg text-secondary-300">
              Remplissez le formulaire ci-dessous et recevez un devis personnalisé 
              pour votre projet d&apos;impression. C&apos;est rapide, gratuit et sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {/* Benefits Card */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-secondary-900 mb-4">
                      Pourquoi nous choisir?
                    </h2>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-secondary-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="bg-secondary-900 text-white">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4">
                      Besoin d&apos;aide?
                    </h2>
                    <p className="text-secondary-300 text-sm mb-4">
                      Notre équipe est disponible pour répondre à vos questions.
                    </p>
                    <div className="space-y-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-white hover:text-primary-400 transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        <span className="text-sm">WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 text-white hover:text-primary-400 transition-colors"
                      >
                        <Phone className="h-5 w-5" aria-hidden="true" />
                        <span className="text-sm">{siteConfig.contact.phone}</span>
                      </a>
                      <div className="flex items-center gap-3 text-secondary-300">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                        <span className="text-sm">{siteConfig.hours.weekdays}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                    Formulaire de Devis
                  </h2>
                  <p className="text-secondary-600 mb-8">
                    Décrivez votre projet et nous vous enverrons un devis détaillé.
                  </p>
                  <QuoteForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-secondary-600">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span className="font-medium">+500 clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span className="font-medium">Qualité garantie</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span className="font-medium">Livraison rapide</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
