# ARTSOURCE - Site Web d'Imprimerie Professionnelle

Un site web moderne et performant pour ARTSOURCE, une imprimerie professionnelle basée à Guelmim, Maroc. Construit avec Next.js 14, TypeScript, TailwindCSS et Supabase.

## 🚀 Caractéristiques

- **Performance Optimale**: Score Lighthouse 100 visé
- **Génération de Leads**: Formulaires de devis, boutons WhatsApp et appels partout
- **Admin CMS**: Tableau de bord complet pour gérer produits, leads, galerie, témoignages et paramètres
- **SEO Optimisé**: Schema.org LocalBusiness, sitemap dynamique, meta tags optimisés
- **Responsive Design**: Interface mobile-first adaptée à tous les écrans
- **Localisation Maroc**: Prix en MAD, numéros de téléphone marocains, français comme langue principale

## 🛠️ Stack Technique

- **Framework**: Next.js 14+ (App Router)
- **Langage**: TypeScript 5.x
- **Styles**: TailwindCSS 3.x
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth (admin)
- **Stockage**: Supabase Storage (images)
- **Icônes**: Lucide React
- **Validation**: Zod
- **Police**: Inter (Google Fonts via next/font)

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (public)/           # Pages publiques
│   │   ├── page.tsx        # Page d'accueil
│   │   ├── produits/       # Catalogue produits
│   │   ├── galerie/        # Galerie photos
│   │   ├── a-propos/       # À propos
│   │   ├── contact/        # Contact
│   │   ├── devis/          # Formulaire de devis
│   │   └── ...
│   ├── admin/              # Dashboard admin
│   │   ├── page.tsx        # Tableau de bord
│   │   ├── products/       # Gestion produits
│   │   ├── leads/          # Gestion leads
│   │   ├── gallery/        # Gestion galerie
│   │   ├── testimonials/   # Gestion témoignages
│   │   └── settings/       # Paramètres
│   ├── api/                # Routes API
│   │   ├── leads/          # Soumission leads
│   │   └── admin/          # Auth admin
│   ├── sitemap.ts          # Sitemap dynamique
│   ├── robots.ts           # Robots.txt
│   └── manifest.ts         # PWA manifest
├── components/
│   ├── ui/                 # Composants UI réutilisables
│   ├── layout/             # Header, Footer, etc.
│   ├── sections/           # Sections de page
│   ├── forms/              # Formulaires
│   └── admin/              # Composants admin
├── lib/
│   ├── supabase/           # Clients Supabase
│   ├── utils.ts            # Fonctions utilitaires
│   └── config.ts           # Configuration site
├── types/
│   └── database.ts         # Types TypeScript
└── supabase/
    └── schema.sql          # Schéma base de données
```

## 🚀 Installation

### Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Compte Supabase (gratuit)

### 1. Cloner le projet

```bash
git clone https://github.com/your-username/artsource.git
cd artsource
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration Supabase

1. Créez un nouveau projet sur [Supabase](https://supabase.com)
2. Dans l'éditeur SQL de Supabase, exécutez le contenu de `supabase/schema.sql`
3. Copiez `.env.example` vers `.env.local`:

```bash
cp .env.example .env.local
```

4. Remplissez les variables d'environnement:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: Trouvez ces clés dans Supabase > Settings > API

### 4. Configuration Supabase Storage

1. Dans Supabase, allez à Storage
2. Créez les buckets suivants:
   - `products` (public)
   - `gallery` (public)
   - `testimonials` (public)
   - `hero` (public)

### 5. Lancer le développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🔐 Accès Admin

L'admin est accessible à `/admin`. Pour la démo, utilisez:

- **Email**: admin@artsource.ma
- **Mot de passe**: admin123

> **Important**: En production, configurez l'authentification Supabase complète avec hash des mots de passe.

## 📦 Build & Déploiement

### Build de production

```bash
npm run build
```

### Déploiement sur Vercel

1. Connectez votre repo GitHub à Vercel
2. Configurez les variables d'environnement:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (votre domaine Vercel ou personnalisé)
3. Déployez!

### Déploiement manuel

```bash
npm run build
npm run start
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Jaune ARTSOURCE
    500: '#FBBF24',
    // ...
  },
  secondary: {
    // Noirs et gris
    900: '#111827',
    // ...
  },
}
```

### Configuration Site

Modifiez `src/lib/config.ts` pour:

- Informations de contact
- Horaires d'ouverture
- Liens de navigation
- Villes marocaines
- Types de produits

## 📊 Base de Données

### Tables principales

| Table | Description |
|-------|-------------|
| `categories` | Catégories de produits |
| `products` | Produits d'impression |
| `gallery` | Images galerie |
| `testimonials` | Avis clients |
| `faqs` | Questions fréquentes |
| `leads` | Demandes de devis |
| `settings` | Paramètres site |
| `hero_content` | Contenu section hero |
| `admin_users` | Administrateurs |

### Row Level Security (RLS)

Toutes les tables ont des politiques RLS:
- **SELECT public**: categories, products, gallery, testimonials, faqs, hero_content
- **INSERT public**: leads (pour soumission formulaires)
- **Admin only**: Toutes les opérations via service_role

## 🔧 Scripts Disponibles

```bash
npm run dev          # Démarrer en développement
npm run build        # Build de production
npm run start        # Démarrer le serveur de production
npm run lint         # Linter ESLint
npm run type-check   # Vérification TypeScript
```

## 📱 PWA

Le site est prêt pour PWA. Ajoutez les icônes dans `public/icons/`:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## 🌐 SEO

- Schema.org LocalBusiness sur la page d'accueil
- Sitemap dynamique (`/sitemap.xml`)
- Robots.txt optimisé (`/robots.txt`)
- Meta tags complets sur chaque page
- Open Graph et Twitter Cards

## 📞 Intégration WhatsApp

Les boutons WhatsApp génèrent des messages pré-remplis:

```typescript
generateWhatsAppLink(phone, message)
generateWhatsAppMessage({ name, product, quantity, message })
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

ARTSOURCE - Guelmim, Maroc

- **WhatsApp**: +212 6XX XXX XXX
- **Email**: contact@artsource.ma
- **Site**: https://artsource.ma

---

Développé avec ❤️ pour ARTSOURCE
