import { QuoteForm } from '@/components/forms';

export function QuoteSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="quote-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Demandez votre devis gratuit
            </h2>
            <p className="text-lg text-secondary-600">
              Remplissez le formulaire ci-dessous et recevez votre devis personnalisé rapidement. 
              Réponse garantie sous 24h.
            </p>
          </div>

          {/* Quote Form */}
          <div className="bg-secondary-50 rounded-2xl p-6 md:p-10 shadow-sm">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
