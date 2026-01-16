// Site configuration constants

export const siteConfig = {
  name: 'artsource',
  description: 'Impression professionnelle à Guelmim - Cartes de visite, flyers, stickers, bâches et plus. Qualité premium, prix compétitifs.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://artsource.ma',
  ogImage: '/og-image.jpg',
  locale: 'fr_MA',
  
  // Contact info
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+212 600 000 000',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000',
    email: process.env.NEXT_PUBLIC_EMAIL || 'contact@artsource.ma',
    address: 'Guelmim, Morocco',
    city: 'Guelmim',
    country: 'Morocco',
  },
  
  // Business hours
  hours: {
    weekdays: '9h00 - 19h00',
    saturday: '9h00 - 18h00',
    sunday: 'Fermé',
  },
  
  // Social links
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
  
  // Maps
  maps: {
    embedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || '',
    directionsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK || 'https://maps.google.com/?q=guelmim+morocco',
  },
  
  // Geo coordinates for schema
  geo: {
    latitude: 28.9870,
    longitude: -10.0741,
  },
} as const;

// Navigation links
export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/products', label: 'Produits' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
] as const;

// Moroccan cities for forms
export const moroccanCities = [
  'Guelmim',
  'Tan-Tan',
  'Sidi Ifni',
  'Assa-Zag',
  'Agadir',
  'Tiznit',
  'Taroudant',
  'Laâyoune',
  'Dakhla',
  'Autre',
] as const;

// Product types for quote form
export const productTypes = [
  'Cartes de visite',
  'Flyers / Dépliants',
  'Affiches / Posters',
  'Bâches / Banderoles',
  'Stickers / Autocollants',
  'Menus / Cartes',
  'Packaging',
  'Signalétique',
  'Autre',
] as const;

// Quantity options
export const quantityOptions = [
  '50',
  '100',
  '250',
  '500',
  '1000',
  '2000',
  '5000+',
  'À définir',
] as const;

// Lead statuses
export const leadStatuses = [
  { value: 'new', label: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacté', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'quoted', label: 'Devis envoyé', color: 'bg-purple-100 text-purple-800' },
  { value: 'closed', label: 'Conclu', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Annulé', color: 'bg-gray-100 text-gray-800' },
] as const;

// Static Hero Content (SSG)
export const heroContent = {
  title: 'Impression Professionnelle à Guelmim',
  subtitle: 'Cartes de visite, flyers, stickers, bâches… devis rapide sur WhatsApp. Qualité premium, prix compétitifs.',
  ctaPrimaryText: 'Demander un Devis',
  ctaPrimaryLink: '/devis',
  ctaSecondaryText: 'WhatsApp Maintenant',
} as const;

// Static Categories (SSG fallback)
export const defaultCategories = [
  {
    id: '1',
    slug: 'cartes-de-visite',
    name_fr: 'Cartes de Visite',
    description_fr: 'Cartes de visite professionnelles, finitions premium',
    icon: 'CreditCard',
    image_url: '/images/categories/cartes-visite.jpg',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    slug: 'flyers-depliants',
    name_fr: 'Flyers & Dépliants',
    description_fr: 'Flyers publicitaires, dépliants 2 ou 3 volets',
    icon: 'FileText',
    image_url: '/images/categories/flyers.jpg',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    slug: 'affiches-posters',
    name_fr: 'Affiches & Posters',
    description_fr: 'Affiches grand format, posters événementiels',
    icon: 'Image',
    image_url: '/images/categories/affiches.jpg',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    slug: 'baches-banderoles',
    name_fr: 'Bâches & Banderoles',
    description_fr: 'Bâches publicitaires, banderoles événementielles',
    icon: 'Flag',
    image_url: '/images/categories/baches.jpg',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    slug: 'stickers-autocollants',
    name_fr: 'Stickers & Autocollants',
    description_fr: 'Autocollants personnalisés, stickers découpés',
    icon: 'Sticker',
    image_url: '/images/categories/stickers.jpg',
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    slug: 'signaletique',
    name_fr: 'Signalétique',
    description_fr: 'Panneaux, enseignes, plaques professionnelles',
    icon: 'Signpost',
    image_url: '/images/categories/signaletique.jpg',
    display_order: 6,
    is_active: true,
  },
] as const;

// Static Testimonials (SSG fallback)
export const defaultTestimonials = [
  {
    id: '1',
    client_name: 'Mohammed El Amrani',
    client_company: 'Restaurant Atlas',
    client_city: 'Guelmim',
    rating: 5,
    content_fr: 'Excellent service! Les cartes de visite et menus sont d\'une qualité exceptionnelle. Livraison rapide et équipe très professionnelle.',
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: '2',
    client_name: 'Fatima Zohra',
    client_company: 'Boutique Sahara',
    client_city: 'Tan-Tan',
    rating: 5,
    content_fr: 'Je recommande vivement ARTSOURCE pour tous vos besoins d\'impression. Qualité irréprochable et prix très compétitifs.',
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: '3',
    client_name: 'Ahmed Bennani',
    client_company: 'Agence Immobilière Sud',
    client_city: 'Guelmim',
    rating: 5,
    content_fr: 'Service rapide et de qualité. Les bâches publicitaires sont parfaites. Merci à toute l\'équipe!',
    is_featured: true,
    is_active: true,
    display_order: 3,
  },
] as const;

// Static FAQs (SSG fallback)
export const defaultFAQs = [
  {
    id: '1',
    question_fr: 'Quels sont vos délais de livraison?',
    answer_fr: 'Nos délais standard sont de 2-3 jours ouvrables pour les commandes classiques. Service express disponible en 24h pour les urgences.',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    question_fr: 'Proposez-vous la livraison à domicile?',
    answer_fr: 'Oui, nous livrons à Guelmim et dans toute la région Guelmim-Oued Noun. Livraison gratuite à partir de 500 DH.',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    question_fr: 'Puis-je avoir un devis personnalisé?',
    answer_fr: 'Absolument! Contactez-nous via WhatsApp ou remplissez le formulaire de devis. Réponse garantie sous 2 heures.',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    question_fr: 'Quels formats de fichiers acceptez-vous?',
    answer_fr: 'Nous acceptons PDF, AI, PSD, PNG, JPG. Pour un résultat optimal, envoyez vos fichiers en haute résolution (300 DPI minimum).',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    question_fr: 'Proposez-vous des services de création graphique?',
    answer_fr: 'Oui! Notre équipe peut créer vos designs sur mesure: logos, cartes de visite, flyers, etc. Demandez un devis.',
    display_order: 5,
    is_active: true,
  },
] as const;

// Static Products (SSG fallback)
export const defaultProducts = [
  {
    id: '1',
    slug: 'cartes-de-visite-standard',
    name_fr: 'Cartes de Visite Standard',
    description_fr: 'Cartes de visite professionnelles 85x55mm, impression recto-verso sur papier 350g couché mat ou brillant.',
    short_description_fr: 'Impression professionnelle sur papier 350g',
    category_id: '1',
    price_starting: 150,
    image_url: '/images/products/cartes-visite.jpg',
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: '2',
    slug: 'flyers-a5',
    name_fr: 'Flyers A5',
    description_fr: 'Flyers publicitaires format A5 (148x210mm), impression recto ou recto-verso sur papier 135g brillant.',
    short_description_fr: 'Format A5, papier 135g brillant',
    category_id: '2',
    price_starting: 200,
    image_url: '/images/products/flyers.jpg',
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: '3',
    slug: 'bache-pvc',
    name_fr: 'Bâche PVC',
    description_fr: 'Bâche publicitaire en PVC 500g, impression grand format, œillets inclus. Résistante aux intempéries.',
    short_description_fr: 'PVC 500g, résistante aux intempéries',
    category_id: '4',
    price_starting: 80,
    image_url: '/images/products/bache.jpg',
    is_featured: true,
    is_active: true,
    display_order: 3,
  },
  {
    id: '4',
    slug: 'stickers-decoupe',
    name_fr: 'Stickers Découpés',
    description_fr: 'Autocollants personnalisés découpés à la forme, vinyle haute qualité, résistant UV et eau.',
    short_description_fr: 'Vinyle haute qualité, découpé à la forme',
    category_id: '5',
    price_starting: 100,
    image_url: '/images/products/stickers.jpg',
    is_featured: true,
    is_active: true,
    display_order: 4,
  },
  {
    id: '5',
    slug: 'affiche-a3',
    name_fr: 'Affiche A3',
    description_fr: 'Affiches format A3 (297x420mm), impression haute qualité sur papier 170g couché brillant.',
    short_description_fr: 'Format A3, papier 170g brillant',
    category_id: '3',
    price_starting: 25,
    image_url: '/images/products/affiche.jpg',
    is_featured: true,
    is_active: true,
    display_order: 5,
  },
  {
    id: '6',
    slug: 'roll-up',
    name_fr: 'Roll-Up Banner',
    description_fr: 'Roll-up publicitaire 85x200cm, impression haute définition, structure aluminium incluse.',
    short_description_fr: '85x200cm, structure aluminium incluse',
    category_id: '6',
    price_starting: 350,
    image_url: '/images/products/rollup.jpg',
    is_featured: true,
    is_active: true,
    display_order: 6,
  },
] as const;

