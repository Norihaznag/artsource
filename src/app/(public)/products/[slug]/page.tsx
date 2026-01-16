import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { QuoteForm } from '@/components/forms';
import { formatPrice, generateWhatsAppLink, generateWhatsAppMessage } from '@/lib/utils';
import { siteConfig, defaultProducts, defaultCategories } from '@/lib/config';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Static product lookup (SSG)
function getProduct(slug: string) {
  const product = defaultProducts.find((p) => p.slug === slug);
  if (!product) return null;

  const category = defaultCategories.find((c) => c.id === product.category_id);
  const relatedProducts = defaultProducts.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 3);

  return { 
    product: { ...product, category }, 
    relatedProducts 
  };
}

// Generate static params for all products (SSG)
export function generateStaticParams() {
  return defaultProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getProduct(slug);
  
  if (!data) return { title: 'Produit non trouvé' };

  const { product } = data;
  const title = `${product.name_fr} à Guelmim`;
  const description = product.short_description_fr || product.description_fr;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description || '',
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const data = getProduct(slug);

  if (!data) {
    notFound();
  }

  const { product, relatedProducts } = data;
  const category = product.category;

  const whatsappUrl = generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    generateWhatsAppMessage({
      product: product.name_fr,
    })
  );

  // Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name_fr,
    description: product.description_fr,
    image: product.image_url || `${siteConfig.url}/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      price: product.starting_price || 0,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb */}
      <section className="bg-secondary-50 py-4">
        <div className="container mx-auto px-4">
          <nav aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-secondary-500 hover:text-secondary-700">
                  Accueil
                </Link>
              </li>
              <li className="text-secondary-400">/</li>
              <li>
                <Link href="/products" className="text-secondary-500 hover:text-secondary-700">
                  Produits
                </Link>
              </li>
              {category && (
                <>
                  <li className="text-secondary-400">/</li>
                  <li>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      {category.name_fr}
                    </Link>
                  </li>
                </>
              )}
              <li className="text-secondary-400">/</li>
              <li className="text-secondary-900 font-medium">{product.name_fr}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux produits
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="w-40 h-40 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="text-7xl font-black text-primary-500">
                    {product.name_fr[0]}
                  </span>
                </div>
                {product.is_featured && (
                  <Badge variant="primary" className="absolute top-6 left-6 text-base py-2 px-4">
                    ⭐ Produit populaire
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              {category && (
                <Badge variant="default" className="mb-4">
                  {category.name_fr}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                {product.name_fr}
              </h1>

              {product.short_description_fr && (
                <p className="text-lg text-secondary-600 mb-6">
                  {product.short_description_fr}
                </p>
              )}

              {/* Price */}
              <div className="bg-primary-50 rounded-xl p-6 mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  {product.starting_price && (
                    <span className="text-3xl font-bold text-primary-600">
                      À partir de {formatPrice(product.starting_price)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-secondary-600">
                  Prix indicatif. Contactez-nous pour un devis personnalisé.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/devis" className="flex-1">
                  <Button size="lg" className="w-full">
                    Demander un devis
                  </Button>
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description_fr && (
            <div className="mt-16 max-w-4xl">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">Description</h2>
              <div className="prose prose-lg max-w-none text-secondary-700">
                <p>{product.description_fr}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
                Demandez un devis pour ce produit
              </h2>
              <p className="text-secondary-600">
                Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé.
              </p>
            </div>
            <Card>
              <CardContent className="p-6 md:p-8">
                <QuoteForm productName={product.name_fr} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-secondary-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`}>
                  <Card hover className="h-full group">
                    <div className="aspect-[4/3] bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-black text-primary-500">
                          {relatedProduct.name_fr[0]}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {relatedProduct.name_fr}
                      </h3>
                      {relatedProduct.starting_price && (
                        <p className="text-primary-600 font-semibold mt-2">
                          À partir de {formatPrice(relatedProduct.starting_price)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
