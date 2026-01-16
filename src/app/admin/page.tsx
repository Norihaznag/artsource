import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { 
  Users, 
  Package, 
  Image, 
  TrendingUp, 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, Badge } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';
import { formatDateShort } from '@/lib/utils';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

async function getDashboardStats() {
  const supabase = await createAdminClient();

  const [leadsResult, productsResult, galleryResult] = await Promise.all([
    supabase.from('leads').select('id, status, created_at', { count: 'exact' }),
    supabase.from('products').select('id', { count: 'exact' }),
    supabase.from('gallery').select('id', { count: 'exact' }),
  ]);

  const newLeads = leadsResult.data?.filter(l => l.status === 'new').length || 0;
  const recentLeads = leadsResult.data
    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5) || [];

  return {
    totalLeads: leadsResult.count || 0,
    newLeads,
    totalProducts: productsResult.count || 0,
    totalGallery: galleryResult.count || 0,
    recentLeads,
  };
}

async function getRecentLeads() {
  const supabase = await createAdminClient();
  
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return data || [];
}

export default async function AdminDashboardPage() {
  await checkAuth();
  
  const stats = await getDashboardStats();
  const recentLeads = await getRecentLeads();

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/leads',
    },
    {
      title: 'Nouveaux Leads',
      value: stats.newLeads,
      icon: AlertCircle,
      color: 'bg-yellow-100 text-yellow-600',
      href: '/admin/leads?status=new',
    },
    {
      title: 'Produits',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-green-100 text-green-600',
      href: '/admin/products',
    },
    {
      title: 'Images Galerie',
      value: stats.totalGallery,
      icon: Image,
      color: 'bg-purple-100 text-purple-600',
      href: '/admin/gallery',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="warning">Nouveau</Badge>;
      case 'contacted':
        return <Badge variant="primary">Contacté</Badge>;
      case 'closed':
        return <Badge variant="success">Conclu</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
              Dashboard
            </h1>
            <p className="text-secondary-600">
              Bienvenue sur le panneau d&apos;administration d&apos;artsource
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link key={index} href={stat.href}>
                  <Card hover className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                      </div>
                      <p className="text-3xl font-bold text-secondary-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-secondary-500">{stat.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Recent Leads */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-secondary-900">
                  Dernières Demandes
                </h2>
                <Link
                  href="/admin/leads"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  Voir tout
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {recentLeads.length === 0 ? (
                <div className="text-center py-8 text-secondary-500">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-30" aria-hidden="true" />
                  <p>Aucune demande pour le moment</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Nom</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Téléphone</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Produit</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-secondary-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-secondary-100 hover:bg-secondary-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-secondary-900">{lead.full_name}</p>
                            <p className="text-sm text-secondary-500">{lead.city}</p>
                          </td>
                          <td className="py-3 px-4 text-secondary-700">{lead.phone}</td>
                          <td className="py-3 px-4 text-secondary-700">{lead.product_type || '-'}</td>
                          <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                          <td className="py-3 px-4 text-sm text-secondary-500">
                            {formatDateShort(lead.created_at)}
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
