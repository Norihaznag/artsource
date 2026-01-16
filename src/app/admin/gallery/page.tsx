import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Upload, Trash2 } from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, Button } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';
import type { GalleryItem } from '@/types/database';

type GalleryWithCategory = GalleryItem & {
  category?: { name_fr: string } | null;
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

async function getGallery(): Promise<GalleryWithCategory[]> {
  try {
    const supabase = await createAdminClient();
    
    const { data } = await supabase
      .from('gallery')
      .select('*, category:categories(name_fr)')
      .order('display_order')
      .order('created_at', { ascending: false });
    
    return (data as GalleryWithCategory[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminGalleryPage() {
  await checkAuth();
  const gallery = await getGallery();

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                Galerie
              </h1>
              <p className="text-secondary-600">
                Gérez les images de vos réalisations
              </p>
            </div>
            <Button>
              <Upload className="h-5 w-5" aria-hidden="true" />
              Ajouter des images
            </Button>
          </div>

          {/* Upload Zone */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" aria-hidden="true" />
                <p className="text-secondary-700 font-medium mb-1">
                  Glissez-déposez vos images ici
                </p>
                <p className="text-sm text-secondary-500">
                  ou cliquez pour parcourir (PNG, JPG, WebP)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          {gallery.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-secondary-500 mb-4">Aucune image dans la galerie</p>
                <Button>
                  <Upload className="h-5 w-5" aria-hidden="true" />
                  Ajouter votre première image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {gallery.map((item) => (
                <Card key={item.id} className="group overflow-hidden">
                  <div className="aspect-square bg-secondary-100 relative">
                    {/* Image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-secondary-300">
                        {item.title_fr?.[0] || 'G'}
                      </span>
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {item.title_fr && (
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-secondary-900 truncate">
                        {item.title_fr}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
