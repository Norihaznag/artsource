import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { getInitials } from '@/lib/utils';
import type { Testimonial } from '@/types/database';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            La satisfaction de nos clients est notre priorité. Découvrez leurs témoignages.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary-200 mb-4" aria-hidden="true" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4" aria-label={`Note: ${testimonial.rating} sur 5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-primary-500 fill-current'
                          : 'text-secondary-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-secondary-700 mb-6 leading-relaxed">
                  &quot;{testimonial.content_fr}&quot;
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-primary-700 font-bold">
                      {getInitials(testimonial.client_name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">
                      {testimonial.client_name}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {[testimonial.client_company, testimonial.client_city]
                        .filter(Boolean)
                        .join(' • ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
