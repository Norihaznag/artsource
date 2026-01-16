import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { 
  Save, 
  Building2, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  MessageSquare,
  Image as ImageIcon 
} from 'lucide-react';
import { AdminSidebar } from '@/components/admin';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/components/ui';
import { createAdminClient } from '@/lib/supabase/server';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

async function getSettings() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('settings').select('*');
  
  // Convert array to object for easier access
  const settings: Record<string, string> = {};
  data?.forEach(s => {
    settings[s.key] = s.value;
  });
  
  return settings;
}

async function getHeroContent() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('hero_content')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  return data;
}

export default async function AdminSettingsPage() {
  await checkAuth();
  const settings = await getSettings();
  const heroContent = await getHeroContent();

  return (
    <div className="min-h-screen bg-secondary-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-1">
                Paramètres
              </h1>
              <p className="text-secondary-600">
                Configurez les informations de votre entreprise
              </p>
            </div>
            <Button>
              <Save className="h-5 w-5" aria-hidden="true" />
              Enregistrer
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Informations de l&apos;Entreprise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Nom de l'entreprise"
                  defaultValue={settings.business_name || 'ARTSOURCE'}
                  placeholder="Nom de l'entreprise"
                />
                <Textarea
                  label="Description"
                  defaultValue={settings.business_description || ''}
                  placeholder="Description courte de votre entreprise"
                  rows={3}
                />
                <Input
                  label="Slogan"
                  defaultValue={settings.business_tagline || ''}
                  placeholder="Votre slogan"
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Coordonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Téléphone principal"
                  defaultValue={settings.phone_primary || ''}
                  placeholder="+212 6XX XXX XXX"
                />
                <Input
                  label="WhatsApp"
                  defaultValue={settings.phone_whatsapp || ''}
                  placeholder="+212 6XX XXX XXX"
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue={settings.email || ''}
                  placeholder="contact@artsource.ma"
                />
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Adresse"
                  defaultValue={settings.address_street || ''}
                  placeholder="Rue / Numéro"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ville"
                    defaultValue={settings.address_city || 'Guelmim'}
                    placeholder="Ville"
                  />
                  <Input
                    label="Code postal"
                    defaultValue={settings.address_postal || ''}
                    placeholder="81000"
                  />
                </div>
                <Input
                  label="Lien Google Maps"
                  defaultValue={settings.google_maps_link || ''}
                  placeholder="https://maps.google.com/..."
                />
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Horaires d&apos;Ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Lundi - Vendredi"
                    defaultValue={settings.hours_weekday || '09:00 - 18:00'}
                    placeholder="09:00 - 18:00"
                  />
                  <Input
                    label="Samedi"
                    defaultValue={settings.hours_saturday || '09:00 - 13:00'}
                    placeholder="09:00 - 13:00"
                  />
                </div>
                <Input
                  label="Dimanche"
                  defaultValue={settings.hours_sunday || 'Fermé'}
                  placeholder="Fermé"
                />
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Réseaux Sociaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Facebook"
                  defaultValue={settings.social_facebook || ''}
                  placeholder="https://facebook.com/artsource"
                />
                <Input
                  label="Instagram"
                  defaultValue={settings.social_instagram || ''}
                  placeholder="https://instagram.com/artsource"
                />
                <Input
                  label="LinkedIn"
                  defaultValue={settings.social_linkedin || ''}
                  placeholder="https://linkedin.com/company/artsource"
                />
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Section Hero (Page d&apos;accueil)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Input
                      label="Titre principal"
                      defaultValue={heroContent?.title_fr || ''}
                      placeholder="Votre partenaire impression..."
                    />
                    <Input
                      label="Sous-titre"
                      defaultValue={heroContent?.subtitle_fr || ''}
                      placeholder="Des produits de qualité..."
                    />
                    <Textarea
                      label="Description"
                      defaultValue={heroContent?.description_fr || ''}
                      placeholder="Description détaillée..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="Texte bouton principal"
                      defaultValue={heroContent?.cta_primary_text_fr || 'Demander un Devis'}
                      placeholder="Demander un Devis"
                    />
                    <Input
                      label="Lien bouton principal"
                      defaultValue={heroContent?.cta_primary_link || '/devis'}
                      placeholder="/devis"
                    />
                    <Input
                      label="Texte bouton secondaire"
                      defaultValue={heroContent?.cta_secondary_text_fr || 'Voir Nos Produits'}
                      placeholder="Voir Nos Produits"
                    />
                    <Input
                      label="Lien bouton secondaire"
                      defaultValue={heroContent?.cta_secondary_link || '/produits'}
                      placeholder="/produits"
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {heroContent?.background_image && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-secondary-700 mb-2">
                      Image d&apos;arrière-plan actuelle
                    </p>
                    <div className="relative aspect-video max-w-md rounded-lg overflow-hidden bg-secondary-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heroContent.background_image}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Default Messages */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary-500" aria-hidden="true" />
                  Messages par Défaut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Textarea
                    label="Message WhatsApp par défaut"
                    defaultValue={settings.default_whatsapp_message || "Bonjour ARTSOURCE! J'aimerais avoir plus d'informations sur vos services d'impression."}
                    placeholder="Message automatique WhatsApp..."
                    rows={4}
                  />
                  <Textarea
                    label="Message de confirmation devis"
                    defaultValue={settings.quote_confirmation_message || "Merci pour votre demande de devis! Notre équipe vous contactera dans les plus brefs délais."}
                    placeholder="Message après soumission du formulaire..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button (Mobile) */}
          <div className="mt-6 flex justify-end lg:hidden">
            <Button size="lg" className="w-full sm:w-auto">
              <Save className="h-5 w-5" aria-hidden="true" />
              Enregistrer les Modifications
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
