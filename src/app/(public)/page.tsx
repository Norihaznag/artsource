import { Suspense } from 'react';
import {
  HeroSection,
  CategoriesSection,
  FeaturedProducts,
  TestimonialsSection,
  QuoteSection,
  FAQSection,
  CTASection,
} from '@/components/sections';
import { 
  siteConfig, 
  heroContent,
  defaultCategories,
  defaultProducts,
  defaultTestimonials,
  defaultFAQs,
} from '@/lib/config';

// Generate LocalBusiness Schema
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.contact.city,
      addressCountry: 'MA',
      addressRegion: 'Guelmim-Oued Noun',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    image: `${siteConfig.url}/og-image.jpg`,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Static page - uses config data (SSG)
export default function HomePage() {
  // Use static data from config for SSG
  const categories = defaultCategories;
  const products = defaultProducts;
  const testimonials = defaultTestimonials;
  const faqs = defaultFAQs;

  return (
    <>
      <LocalBusinessSchema />
      
      {/* Hero Section */}
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        ctaPrimaryText={heroContent.ctaPrimaryText}
        ctaPrimaryLink={heroContent.ctaPrimaryLink}
        ctaSecondaryText={heroContent.ctaSecondaryText}
      />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <FeaturedProducts products={products} />

      {/* Quote Form Section */}
      <QuoteSection />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* Final CTA */}
      <CTASection />
    </>
  );
}
