import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/database';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Populaires</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Produits les Plus Demandés
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Découvrez nos produits phares, appréciés par nos clients pour leur qualité et leur rapport qualité-prix
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card hover className="h-full group">
                {/* Product Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary-100 to-secondary-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-black text-primary-500">{product.name_fr[0]}</span>
                    </div>
                  </div>
                  {product.is_featured && (
                    <Badge variant="primary" className="absolute top-4 left-4">
                      ⭐ Populaire
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
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
                          {formatPrice(product.starting_price)}
                        </p>
                      )}
                      {product.pricing_text_fr && (
                        <p className="text-xs text-secondary-500">{product.pricing_text_fr}</p>
                      )}
                    </div>
                    <span className="text-primary-600 font-medium text-sm group-hover:underline flex items-center gap-1">
                      Voir détails
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg">
              Voir tous nos produits
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
