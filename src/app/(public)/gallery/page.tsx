import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui';
import { CTASection } from '@/components/sections';
import { siteConfig, defaultCategories } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Galerie de nos Réalisations',
  description: 'Découvrez nos réalisations d\'impression: cartes de visite, flyers, bâches, stickers et plus. Qualité professionnelle à Guelmim.',
  openGraph: {
    title: `Galerie | ${siteConfig.name}`,
    description: 'Nos réalisations d\'impression professionnelle à Guelmim.',
  },
};

// Static gallery data (SSG) - empty for now, will show placeholder
const galleryItems: { id: string; title: string; category_id: string; image_url: string }[] = [];

export default function GalleryPage() {
  const categories = defaultCategories;
  const gallery = galleryItems;

  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Galerie de nos Réalisations
            </h1>
            <p className="text-lg text-secondary-300">
              Découvrez quelques exemples de nos travaux d&apos;impression. 
              Chaque projet est réalisé avec soin pour garantir la satisfaction de nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {gallery.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-12 w-12 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-secondary-900 mb-2">
                Galerie en cours de création
              </h2>
              <p className="text-secondary-600 max-w-md mx-auto">
                Nous préparons notre galerie de réalisations. 
                En attendant, contactez-nous pour voir des exemples de nos travaux.
              </p>
            </div>
          ) : (
            <>
              {/* Category Filter Tabs */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  <button className="px-4 py-2 rounded-full bg-primary-500 text-secondary-900 font-medium text-sm">
                    Tous
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 font-medium text-sm hover:bg-secondary-200 transition-colors"
                    >
                      {category.name_fr}
                    </button>
                  ))}
                </div>
              )}

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gallery.map((item) => (
                  <Card key={item.id} hover className="group overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-secondary-100 to-secondary-200 relative">
                      {/* Placeholder - replace with actual image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-500">
                            {item.title_fr?.[0] || 'G'}
                          </span>
                        </div>
                      </div>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-secondary-900/0 group-hover:bg-secondary-900/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white font-medium">Voir</span>
                      </div>
                    </div>
                    {(item.title_fr || item.category) && (
                      <CardContent className="p-4">
                        {item.title_fr && (
                          <h3 className="font-semibold text-secondary-900 truncate">
                            {item.title_fr}
                          </h3>
                        )}
                        {item.category && (
                          <p className="text-sm text-secondary-500">
                            {(item.category as { name_fr: string }).name_fr}
                          </p>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
