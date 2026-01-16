import Link from 'next/link';
import { ArrowRight, Printer, FileText, Image, Sticker, BookOpen, Package } from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import type { Category } from '@/types/database';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'cartes-de-visite': FileText,
  'flyers-depliants': Printer,
  'affiches-posters': Image,
  'baches-banderoles': Image,
  'stickers-autocollants': Sticker,
  'menus-cartes': BookOpen,
  'packaging': Package,
  'signaletique': FileText,
};

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Nos Services d&apos;Impression
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Une gamme complète de produits imprimés pour répondre à tous vos besoins professionnels
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || Printer;
            return (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card hover className="h-full group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors">
                      <Icon className="h-7 w-7 text-primary-600 group-hover:text-secondary-900 transition-colors" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name_fr}
                    </h3>
                    {category.description_fr && (
                      <p className="text-sm text-secondary-500 line-clamp-2">
                        {category.description_fr}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Voir tous nos produits
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
