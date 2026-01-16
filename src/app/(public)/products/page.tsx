import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '@/components/ui';
import { CTASection } from '@/components/sections';
import { formatPrice } from '@/lib/utils';
import { siteConfig, defaultCategories, defaultProducts } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Nos Produits d\'Impression',
  description: 'Découvrez notre gamme complète de produits d\'impression: cartes de visite, flyers, bâches, stickers et plus. Qualité professionnelle à Guelmim.',
  openGraph: {
    title: `Produits d'Impression | ${siteConfig.name}`,
    description: 'Cartes de visite, flyers, bâches, stickers et plus. Qualité professionnelle à Guelmim.',
  },
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

// Static data with category filtering (SSG)
function getProductsData(categorySlug?: string) {
  const categories = defaultCategories;
  
  // Filter products by category if provided
  let products = [...defaultProducts];
  if (categorySlug) {
    const category = categories.find((c) => c.slug === categorySlug);
    if (category) {
      products = products.filter((p) => p.category_id === category.id);
    }
  }

  return {
    categories,
    products,
    currentCategory: categorySlug,
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { categories, products, currentCategory } = getProductsData(params.category);
  const activeCategory = categories.find((c) => c.slug === currentCategory);

  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {activeCategory ? activeCategory.name_fr : 'Nos Produits d\'Impression'}
            </h1>
            <p className="text-lg text-secondary-300">
              {activeCategory
                ? activeCategory.description_fr
                : 'Découvrez notre gamme complète de produits d\'impression professionnelle. Qualité garantie, délais rapides.'}
            </p>
          </div>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories Filter */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-secondary-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-secondary-500" aria-hidden="true" />
                  <h2 className="font-bold text-secondary-900">Catégories</h2>
                </div>
                <nav aria-label="Filtrer par catégorie">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/products"
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          !currentCategory
                            ? 'bg-primary-100 text-secondary-900 font-medium'
                            : 'text-secondary-600 hover:bg-secondary-50'
                        }`}
                      >
                        Tous les produits
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products?category=${category.slug}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            currentCategory === category.slug
                              ? 'bg-primary-100 text-secondary-900 font-medium'
                              : 'text-secondary-600 hover:bg-secondary-50'
                          }`}
                        >
                          {category.name_fr}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary-600 mb-4">Aucun produit trouvé dans cette catégorie.</p>
                  <Link href="/products">
                    <Button variant="outline">Voir tous les produits</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => {
                    const category = categories.find((c) => c.id === product.category_id);
                    return (
                      <Link key={product.id} href={`/products/${product.slug}`}>
                        <Card hover className="h-full group">
                          {/* Product Image */}
                          <div className="aspect-[4/3] bg-gradient-to-br from-secondary-100 to-secondary-200 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center">
                                <span className="text-3xl font-black text-primary-500">
                                  {product.name_fr[0]}
                                </span>
                              </div>
                            </div>
                            {product.is_featured && (
                              <Badge variant="primary" className="absolute top-4 left-4">
                                ⭐ Populaire
                              </Badge>
                            )}
                          </div>

                          <CardContent className="p-5">
                            {/* Category tag */}
                            {category && (
                              <Badge variant="default" className="mb-2 text-xs">
                                {category.name_fr}
                              </Badge>
                            )}
                            
                            <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                              {product.name_fr}
                            </h3>
                            
                            {product.short_description_fr && (
                              <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                                {product.short_description_fr}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div>
                                {product.starting_price && (
                                  <p className="text-lg font-bold text-primary-600">
                                    À partir de {formatPrice(product.starting_price)}
                                  </p>
                                )}
                              </div>
                              <span className="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:underline">
                                Détails
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
