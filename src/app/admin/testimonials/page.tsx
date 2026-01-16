import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Plus, Star, Edit, Trash2 } from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';
import { getInitials } from '@/lib/utils';
import type { Testimonial } from '@/types/database';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createAdminClient();
    
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order')
      .order('created_at', { ascending: false });
    
    return (data as Testimonial[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  await checkAuth();
  const testimonials = await getTestimonials();

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                Témoignages
              </h1>
              <p className="text-secondary-600">
                Gérez les avis de vos clients
              </p>
            </div>
            <Button>
              <Plus className="h-5 w-5" aria-hidden="true" />
              Nouveau Témoignage
            </Button>
          </div>

          {/* Testimonials Grid */}
          {testimonials.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-secondary-500 mb-4">Aucun témoignage</p>
                <Button>
                  <Plus className="h-5 w-5" aria-hidden="true" />
                  Ajouter un témoignage
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative group">
                  <CardContent className="p-6">
                    {/* Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        className="p-2 bg-secondary-100 rounded-lg text-secondary-600 hover:bg-secondary-200 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-2 mb-4">
                      {testimonial.is_active ? (
                        <Badge variant="success">Actif</Badge>
                      ) : (
                        <Badge variant="default">Inactif</Badge>
                      )}
                      {testimonial.is_featured && (
                        <Badge variant="primary">⭐ Vedette</Badge>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
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
                    <p className="text-secondary-700 mb-4 line-clamp-4">
                      &quot;{testimonial.content_fr}&quot;
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-secondary-100">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-bold text-sm">
                          {getInitials(testimonial.client_name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-900 text-sm">
                          {testimonial.client_name}
                        </p>
                        <p className="text-xs text-secondary-500">
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
          )}
        </div>
      </main>
    </div>
  );
}
