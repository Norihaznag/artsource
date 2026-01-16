import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import { QuoteForm } from '@/components/forms';
import { siteConfig } from '@/lib/config';
import { generateWhatsAppLink } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez artsource pour vos projets d\'impression à Guelmim. Téléphone, WhatsApp, email ou visitez-nous.',
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: 'Contactez-nous pour vos projets d\'impression à Guelmim.',
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`,
    action: 'Appeler',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: siteConfig.contact.phone,
    href: generateWhatsAppLink(siteConfig.contact.whatsapp, 'Bonjour artsource!'),
    action: 'Envoyer un message',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    action: 'Envoyer un email',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: siteConfig.contact.address,
    href: siteConfig.maps.directionsUrl,
    action: 'Voir sur la carte',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-secondary-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-secondary-300">
              Une question? Un projet d&apos;impression? Notre équipe est à votre disposition 
              pour vous accompagner. Réponse garantie sous 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Nos Coordonnées
              </h2>
              
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-secondary-500 mb-1">{item.label}</p>
                          <p className="font-semibold text-secondary-900 mb-2 truncate">
                            {item.value}
                          </p>
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {item.action} →
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Opening Hours */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-500 mb-1">Horaires d&apos;ouverture</p>
                      <div className="space-y-1">
                        <p className="font-medium text-secondary-900">
                          Lun - Ven: {siteConfig.hours.weekdays}
                        </p>
                        <p className="font-medium text-secondary-900">
                          Samedi: {siteConfig.hours.saturday}
                        </p>
                        <p className="text-secondary-500">
                          Dimanche: {siteConfig.hours.sunday}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <a
                href={generateWhatsAppLink(siteConfig.contact.whatsapp, 'Bonjour artsource!')}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="whatsapp" size="lg" className="w-full">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp Direct
                </Button>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Envoyez-nous un message
                  </h2>
                  <QuoteForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-secondary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Nous Trouver
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-[21/9] bg-secondary-200 relative">
              {siteConfig.maps.embedUrl ? (
                <iframe
                  src={siteConfig.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation artsource Guelmim"
                  className="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-secondary-400 mx-auto mb-4" aria-hidden="true" />
                    <p className="text-secondary-600 font-medium">{siteConfig.contact.address}</p>
                    <a
                      href={siteConfig.maps.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline mt-2 inline-block"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
