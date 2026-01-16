import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, Calendar, Search, Filter } from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, Button, Badge, Input, Select } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';
import { formatDateShort, generateWhatsAppLink } from '@/lib/utils';
import { leadStatuses, siteConfig } from '@/lib/config';
import type { Lead } from '@/types/database';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

interface LeadsPageProps {
  searchParams: Promise<{ status?: string; search?: string }>;
}

async function getLeads(status?: string, search?: string): Promise<Lead[]> {
  try {
    const supabase = await createAdminClient();
    
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`);
    }
    
    const { data } = await query;
    
    return (data as Lead[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  await checkAuth();
  const params = await searchParams;
  const leads = await getLeads(params.status, params.search);

  const getStatusBadge = (status: string) => {
    const statusConfig = leadStatuses.find(s => s.value === status);
    if (!statusConfig) return <Badge variant="default">{status}</Badge>;
    
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
              Leads & Demandes
            </h1>
            <p className="text-secondary-600">
              Gérez les demandes de devis et leads
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" aria-hidden="true" />
                    <input
                      type="text"
                      name="search"
                      defaultValue={params.search}
                      placeholder="Rechercher par nom, téléphone, ville..."
                      className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <select
                  name="status"
                  defaultValue={params.status || 'all'}
                  className="px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tous les statuts</option>
                  {leadStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <Button type="submit">
                  <Filter className="h-5 w-5" aria-hidden="true" />
                  Filtrer
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Leads List */}
          <Card>
            <CardContent className="p-0">
              {leads.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary-500">Aucun lead trouvé</p>
                </div>
              ) : (
                <div className="divide-y divide-secondary-100">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-6 hover:bg-secondary-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Lead Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-secondary-900">
                              {lead.full_name}
                            </h3>
                            {getStatusBadge(lead.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-secondary-600">
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" aria-hidden="true" />
                              {lead.phone}
                            </span>
                            {lead.city && (
                              <span>📍 {lead.city}</span>
                            )}
                            {lead.product_type && (
                              <span>📦 {lead.product_type}</span>
                            )}
                            {lead.quantity && (
                              <span>× {lead.quantity}</span>
                            )}
                          </div>
                          {lead.message && (
                            <p className="mt-2 text-sm text-secondary-500 line-clamp-2">
                              {lead.message}
                            </p>
                          )}
                          <p className="mt-2 text-xs text-secondary-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {formatDateShort(lead.created_at)}
                            {lead.preferred_contact && (
                              <span className="ml-2">
                                • Préfère: {lead.preferred_contact === 'whatsapp' ? 'WhatsApp' : lead.preferred_contact === 'call' ? 'Appel' : 'Email'}
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <a
                            href={generateWhatsAppLink(lead.phone, `Bonjour ${lead.full_name}, suite à votre demande de devis...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                            title="Appeler"
                          >
                            <Phone className="h-5 w-5" aria-hidden="true" />
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-3 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                              title="Email"
                            >
                              <Mail className="h-5 w-5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
