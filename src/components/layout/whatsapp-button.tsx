'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { generateWhatsAppLink } from '@/lib/utils';

export function WhatsAppButton() {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    'Bonjour artsource! Je souhaite obtenir un devis pour mes impressions.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20BD5A] transition-all duration-300 group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden sm:inline font-medium">WhatsApp</span>
      {/* Pulse animation */}
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]" />
      </span>
    </a>
  );
}
