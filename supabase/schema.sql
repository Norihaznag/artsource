-- ============================================
-- ARTSOURCE DATABASE SCHEMA FOR SUPABASE
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_fr VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_fr TEXT,
  description_ar TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name_fr VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_fr TEXT,
  description_ar TEXT,
  short_description_fr VARCHAR(500),
  short_description_ar VARCHAR(500),
  pricing_text_fr VARCHAR(255),
  pricing_text_ar VARCHAR(255),
  starting_price DECIMAL(10, 2),
  image_url TEXT,
  gallery_urls TEXT[],
  features_fr TEXT[],
  features_ar TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  seo_title_fr VARCHAR(255),
  seo_title_ar VARCHAR(255),
  seo_description_fr TEXT,
  seo_description_ar TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255),
  title_ar VARCHAR(255),
  description_fr TEXT,
  description_ar TEXT,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_city VARCHAR(255),
  content_fr TEXT NOT NULL,
  content_ar TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_fr TEXT NOT NULL,
  question_ar TEXT,
  answer_fr TEXT NOT NULL,
  answer_ar TEXT,
  category VARCHAR(100),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(255),
  product_type VARCHAR(255),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity VARCHAR(100),
  message TEXT,
  file_url TEXT,
  preferred_contact VARCHAR(50) DEFAULT 'whatsapp',
  source VARCHAR(100) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SETTINGS TABLE
-- ============================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB,
  description VARCHAR(500),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- HERO CONTENT TABLE
-- ============================================
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page VARCHAR(100) NOT NULL DEFAULT 'home',
  title_fr VARCHAR(255) NOT NULL,
  title_ar VARCHAR(255),
  subtitle_fr TEXT,
  subtitle_ar TEXT,
  cta_primary_text_fr VARCHAR(100),
  cta_primary_text_ar VARCHAR(100),
  cta_primary_link VARCHAR(255),
  cta_secondary_text_fr VARCHAR(100),
  cta_secondary_text_ar VARCHAR(100),
  cta_secondary_link VARCHAR(255),
  background_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE (for simple auth)
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_gallery_category ON gallery(category_id);
CREATE INDEX idx_gallery_product ON gallery(product_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
CREATE INDEX idx_faqs_active ON faqs(is_active);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON hero_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active hero" ON hero_content FOR SELECT USING (is_active = true);

-- Public insert for leads
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Service role full access (for admin operations)
CREATE POLICY "Service role full access categories" ON categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access products" ON products FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access gallery" ON gallery FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access faqs" ON faqs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access settings" ON settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access hero" ON hero_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access admin" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default categories
INSERT INTO categories (name_fr, name_ar, slug, description_fr, display_order) VALUES
('Cartes de visite', 'بطاقات العمل', 'cartes-de-visite', 'Cartes de visite professionnelles de haute qualité', 1),
('Flyers & Dépliants', 'منشورات', 'flyers-depliants', 'Flyers et dépliants pour vos événements et promotions', 2),
('Affiches & Posters', 'ملصقات', 'affiches-posters', 'Affiches grand format pour une visibilité maximale', 3),
('Bâches & Banderoles', 'لافتات', 'baches-banderoles', 'Bâches publicitaires et banderoles pour extérieur', 4),
('Stickers & Autocollants', 'ملصقات لاصقة', 'stickers-autocollants', 'Stickers personnalisés pour tous usages', 5),
('Menus & Cartes', 'قوائم الطعام', 'menus-cartes', 'Menus de restaurant et cartes de prix', 6),
('Packaging', 'التغليف', 'packaging', 'Emballages et packaging personnalisés', 7),
('Signalétique', 'اللافتات', 'signaletique', 'Panneaux et signalétique professionnelle', 8);

-- Insert sample products
INSERT INTO products (category_id, name_fr, name_ar, slug, description_fr, short_description_fr, pricing_text_fr, starting_price, is_featured, features_fr) VALUES
((SELECT id FROM categories WHERE slug = 'cartes-de-visite'), 'Cartes de visite Standard', 'بطاقات عمل قياسية', 'cartes-visite-standard', 'Cartes de visite professionnelles imprimées sur papier couché 350g. Finition brillante ou mate disponible.', 'Impression haute qualité sur papier 350g', 'À partir de 150 MAD', 150, true, ARRAY['Papier couché 350g', 'Impression recto ou recto-verso', 'Finition brillante ou mate', 'Livraison rapide']),
((SELECT id FROM categories WHERE slug = 'cartes-de-visite'), 'Cartes de visite Premium', 'بطاقات عمل فاخرة', 'cartes-visite-premium', 'Cartes de visite haut de gamme avec finitions spéciales: vernis sélectif, dorure, gaufrage.', 'Finitions luxe: vernis, dorure, gaufrage', 'À partir de 300 MAD', 300, true, ARRAY['Papier premium 400g', 'Vernis sélectif UV', 'Dorure à chaud', 'Coins arrondis disponibles']),
((SELECT id FROM categories WHERE slug = 'flyers-depliants'), 'Flyers A5', 'منشورات A5', 'flyers-a5', 'Flyers format A5 idéaux pour vos promotions et événements.', 'Format A5 - Idéal promotions', 'À partir de 200 MAD / 100 ex', 200, true, ARRAY['Format A5 (148x210mm)', 'Papier couché 135g ou 170g', 'Impression quadri recto-verso', 'Quantités flexibles']),
((SELECT id FROM categories WHERE slug = 'flyers-depliants'), 'Dépliants 3 volets', 'كتيبات 3 طيات', 'depliants-3-volets', 'Dépliants professionnels 3 volets pour présenter vos services en détail.', 'Présentation complète en 3 volets', 'À partir de 350 MAD / 100 ex', 350, false, ARRAY['Format A4 plié en 3', 'Papier couché 170g', 'Impression recto-verso', 'Pliage inclus']),
((SELECT id FROM categories WHERE slug = 'baches-banderoles'), 'Bâche PVC Grand Format', 'لافتة PVC كبيرة', 'bache-pvc-grand-format', 'Bâches publicitaires en PVC résistant pour affichage extérieur longue durée.', 'PVC résistant - Usage extérieur', 'À partir de 80 MAD/m²', 80, true, ARRAY['PVC 450g/m²', 'Impression haute résolution', 'Œillets métalliques inclus', 'Résistant UV et intempéries']),
((SELECT id FROM categories WHERE slug = 'stickers-autocollants'), 'Stickers Vinyle', 'ملصقات فينيل', 'stickers-vinyle', 'Stickers en vinyle adhésif de qualité professionnelle, découpés sur mesure.', 'Vinyle adhésif haute qualité', 'À partir de 50 MAD', 50, true, ARRAY['Vinyle adhésif permanent', 'Découpe sur mesure', 'Résistant eau et UV', 'Usage intérieur/extérieur']),
((SELECT id FROM categories WHERE slug = 'menus-cartes'), 'Menu Restaurant A3', 'قائمة مطعم A3', 'menu-restaurant-a3', 'Menus de restaurant format A3, plastifiés pour une durabilité maximale.', 'Format A3 - Plastification incluse', 'À partir de 25 MAD/unité', 25, false, ARRAY['Format A3', 'Papier couché 250g', 'Plastification mate ou brillante', 'Design personnalisé disponible']),
((SELECT id FROM categories WHERE slug = 'affiches-posters'), 'Affiche A2', 'ملصق A2', 'affiche-a2', 'Affiches grand format A2 pour une visibilité maximale de vos événements.', 'Grand format A2 - Impact visuel', 'À partir de 15 MAD/unité', 15, false, ARRAY['Format A2 (420x594mm)', 'Papier couché 170g', 'Impression haute définition', 'Quantités flexibles']);

-- Insert default hero content
INSERT INTO hero_content (page, title_fr, title_ar, subtitle_fr, subtitle_ar, cta_primary_text_fr, cta_primary_link, cta_secondary_text_fr, cta_secondary_link) VALUES
('home', 'Impression Professionnelle à Guelmim', 'طباعة احترافية في كلميم', 'Cartes de visite, flyers, stickers, bâches… devis rapide sur WhatsApp. Qualité premium, prix compétitifs.', 'بطاقات عمل، منشورات، ملصقات، لافتات... عرض أسعار سريع عبر واتساب. جودة ممتازة، أسعار تنافسية.', 'Demander un Devis', '/quote', 'WhatsApp Maintenant', 'https://wa.me/212600000000');

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_company, client_city, content_fr, rating, is_featured) VALUES
('Ahmed Benali', 'Café Sahara', 'Guelmim', 'Service excellent et rapide! Les cartes de visite sont magnifiques. Je recommande artsource à tous mes collègues.', 5, true),
('Fatima Zahra', 'Boutique Mode', 'Guelmim', 'Très professionnels. Les flyers pour notre ouverture étaient parfaits. Livraison dans les délais.', 5, true),
('Mohamed Ouhssain', 'Restaurant Atlas', 'Tan-Tan', 'Menus de qualité supérieure. Le plastifié tient très bien. Merci artsource!', 5, true),
('Khalid Amrani', 'Agence Immobilière Sud', 'Guelmim', 'Les bâches publicitaires sont exactement ce dont nous avions besoin. Très visible et résistant.', 4, false);

-- Insert FAQs
INSERT INTO faqs (question_fr, answer_fr, category, display_order) VALUES
('Quels sont vos délais de livraison?', 'Nos délais standard sont de 2-3 jours ouvrables pour la plupart des produits. Les commandes urgentes peuvent être traitées en 24h avec un supplément.', 'general', 1),
('Quels formats de fichiers acceptez-vous?', 'Nous acceptons les formats PDF, AI, PSD, PNG et JPG haute résolution (300 DPI minimum). Pour les meilleurs résultats, envoyez vos fichiers en PDF avec traits de coupe.', 'technique', 2),
('Proposez-vous la livraison?', 'Oui! Nous livrons à Guelmim et dans toute la région. La livraison est gratuite à Guelmim pour les commandes supérieures à 500 MAD.', 'livraison', 3),
('Puis-je voir un échantillon avant la commande complète?', 'Absolument! Nous pouvons réaliser un échantillon pour les grandes commandes. Contactez-nous pour discuter des détails.', 'general', 4),
('Quels modes de paiement acceptez-vous?', 'Nous acceptons le paiement en espèces, par virement bancaire, et par chèque pour les entreprises.', 'paiement', 5);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('business_name', 'artsource', 'Nom de l''entreprise'),
('business_phone', '+212 600 000 000', 'Numéro de téléphone'),
('business_whatsapp', '212600000000', 'Numéro WhatsApp (sans +)'),
('business_email', 'contact@artsource.ma', 'Email de contact'),
('business_address', 'Guelmim, Morocco', 'Adresse complète'),
('business_hours', 'Lun-Sam: 9h-19h', 'Heures d''ouverture'),
('social_facebook', '', 'Lien Facebook'),
('social_instagram', '', 'Lien Instagram');
