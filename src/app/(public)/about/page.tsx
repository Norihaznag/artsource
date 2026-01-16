import type { Metadata } from 'next';
import { Award, Clock, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { CTASection } from '@/components/sections';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'À Propos',
  description: 'Découvrez artsource, votre imprimerie professionnelle à Guelmim. Notre histoire, notre équipe et notre engagement qualité.',
  openGraph: {
    title: `À Propos | ${siteConfig.name}`,
    description: 'Votre imprimerie professionnelle à Guelmim - Qualité, rapidité, prix compétitifs.',
  },
};

const values = [
  {
    icon: Award,
    title: 'Qualité Premium',
    description: 'Nous utilisons les meilleurs équipements et matériaux pour garantir des impressions de haute qualité.',
  },
  {
    icon: Clock,
    title: 'Délais Rapides',
    description: 'Nous comprenons l\'urgence de vos projets. Livraison express disponible pour les commandes pressées.',
  },
  {
    icon: Users,
    title: 'Service Client',
    description: 'Une équipe à votre écoute pour vous conseiller et vous accompagner dans tous vos projets.',
  },
  {
    icon: Target,
    title: 'Prix Compétitifs',
    description: 'Des tarifs transparents et adaptés à tous les budgets, sans compromis sur la qualité.',
  },
];

const stats = [
  { value: '500+', label: 'Clients satisfaits' },
  { value: '10000+', label: 'Projets réalisés' },
  { value: '5+', label: 'Années d\'expérience' },
  { value: '24h', label: 'Délai express' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Votre Partenaire Impression à{' '}
              <span className="text-primary-400">Guelmim</span>
            </h1>
            <p className="text-lg text-secondary-300 leading-relaxed">
              Depuis notre création, {siteConfig.name} s&apos;est imposé comme la référence 
              de l&apos;impression professionnelle dans la région de Guelmim-Oued Noun. 
              Notre mission : donner vie à vos idées avec qualité et rapidité.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-secondary-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  {siteConfig.name} est née d&apos;une passion pour l&apos;impression et d&apos;une 
                  volonté de proposer des services de qualité professionnelle aux entreprises 
                  et particuliers de Guelmim et sa région.
                </p>
                <p>
                  Face à un marché où les options locales étaient limitées, nous avons décidé 
                  d&apos;investir dans les équipements les plus modernes pour offrir une 
                  alternative de qualité, sans avoir à se déplacer vers les grandes villes.
                </p>
                <p>
                  Aujourd&apos;hui, nous sommes fiers d&apos;accompagner des centaines de clients 
                  dans leurs projets d&apos;impression : des petites entreprises locales aux 
                  institutions, en passant par les événements et les particuliers.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 aspect-square rounded-2xl flex items-center justify-center">
              <div className="w-32 h-32 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-6xl font-black text-secondary-900">A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien dans notre mission de vous offrir 
              le meilleur service d&apos;impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Pourquoi Choisir {siteConfig.name}?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary-900 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">
                    Équipements Modernes
                  </h3>
                  <p className="text-secondary-600">
                    Nous investissons régulièrement dans les dernières technologies 
                    d&apos;impression pour vous garantir les meilleurs résultats.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary-900 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">
                    Expertise Locale
                  </h3>
                  <p className="text-secondary-600">
                    Nous connaissons les besoins spécifiques des entreprises de la région 
                    et adaptons nos services en conséquence.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary-900 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">
                    Service Personnalisé
                  </h3>
                  <p className="text-secondary-600">
                    Chaque projet est unique. Nous prenons le temps de comprendre vos besoins 
                    pour vous proposer les meilleures solutions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary-900 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">
                    Disponibilité
                  </h3>
                  <p className="text-secondary-600">
                    Notre équipe est disponible pour répondre à vos questions et vous 
                    accompagner à chaque étape de votre projet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
