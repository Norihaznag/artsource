import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/database';

type ProductWithCategory = Product & {
  category?: { name_fr: string } | null;
};

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

async function getProducts(): Promise<ProductWithCategory[]> {
  try {
    const supabase = await createAdminClient();
    
    const { data } = await supabase
      .from('products')
      .select('*, category:categories(name_fr)')
      .order('display_order')
      .order('created_at', { ascending: false });
    
    return (data as ProductWithCategory[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  await checkAuth();
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                Produits
              </h1>
              <p className="text-secondary-600">
                Gérez vos produits d&apos;impression
              </p>
            </div>
            <Button>
              <Plus className="h-5 w-5" aria-hidden="true" />
              Nouveau Produit
            </Button>
          </div>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary-500 mb-4">Aucun produit</p>
                  <Button>
                    <Plus className="h-5 w-5" aria-hidden="true" />
                    Créer un produit
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary-200 bg-secondary-50">
                        <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">Produit</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">Catégorie</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">Prix</th>
                        <th className="text-left py-4 px-6 text-sm font-medium text-secondary-500">Status</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-secondary-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-secondary-400">
                                  {product.name_fr[0]}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-secondary-900">{product.name_fr}</p>
                                <p className="text-sm text-secondary-500">{product.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {product.category ? (
                              <Badge variant="default">
                                {(product.category as { name_fr: string }).name_fr}
                              </Badge>
                            ) : (
                              <span className="text-secondary-400">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {product.starting_price ? (
                              <span className="font-medium text-secondary-900">
                                {formatPrice(product.starting_price)}
                              </span>
                            ) : (
                              <span className="text-secondary-400">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {product.is_active ? (
                              <Badge variant="success">Actif</Badge>
                            ) : (
                              <Badge variant="default">Inactif</Badge>
                            )}
                            {product.is_featured && (
                              <Badge variant="primary" className="ml-2">⭐</Badge>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/products/${product.slug}`}
                                target="_blank"
                                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                                title="Voir"
                              >
                                <Eye className="h-5 w-5" aria-hidden="true" />
                              </Link>
                              <button
                                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit className="h-5 w-5" aria-hidden="true" />
                              </button>
                              <button
                                className="p-2 text-secondary-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
