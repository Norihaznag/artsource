// Database Types for Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name_fr: string;
          name_ar: string | null;
          slug: string;
          description_fr: string | null;
          description_ar: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_fr: string;
          name_ar?: string | null;
          slug: string;
          description_fr?: string | null;
          description_ar?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_fr?: string;
          name_ar?: string | null;
          slug?: string;
          description_fr?: string | null;
          description_ar?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name_fr: string;
          name_ar: string | null;
          slug: string;
          description_fr: string | null;
          description_ar: string | null;
          short_description_fr: string | null;
          short_description_ar: string | null;
          pricing_text_fr: string | null;
          pricing_text_ar: string | null;
          starting_price: number | null;
          image_url: string | null;
          gallery_urls: string[] | null;
          features_fr: string[] | null;
          features_ar: string[] | null;
          is_featured: boolean;
          is_active: boolean;
          seo_title_fr: string | null;
          seo_title_ar: string | null;
          seo_description_fr: string | null;
          seo_description_ar: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name_fr: string;
          name_ar?: string | null;
          slug: string;
          description_fr?: string | null;
          description_ar?: string | null;
          short_description_fr?: string | null;
          short_description_ar?: string | null;
          pricing_text_fr?: string | null;
          pricing_text_ar?: string | null;
          starting_price?: number | null;
          image_url?: string | null;
          gallery_urls?: string[] | null;
          features_fr?: string[] | null;
          features_ar?: string[] | null;
          is_featured?: boolean;
          is_active?: boolean;
          seo_title_fr?: string | null;
          seo_title_ar?: string | null;
          seo_description_fr?: string | null;
          seo_description_ar?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name_fr?: string;
          name_ar?: string | null;
          slug?: string;
          description_fr?: string | null;
          description_ar?: string | null;
          short_description_fr?: string | null;
          short_description_ar?: string | null;
          pricing_text_fr?: string | null;
          pricing_text_ar?: string | null;
          starting_price?: number | null;
          image_url?: string | null;
          gallery_urls?: string[] | null;
          features_fr?: string[] | null;
          features_ar?: string[] | null;
          is_featured?: boolean;
          is_active?: boolean;
          seo_title_fr?: string | null;
          seo_title_ar?: string | null;
          seo_description_fr?: string | null;
          seo_description_ar?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          title_fr: string | null;
          title_ar: string | null;
          description_fr: string | null;
          description_ar: string | null;
          image_url: string;
          category_id: string | null;
          product_id: string | null;
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title_fr?: string | null;
          title_ar?: string | null;
          description_fr?: string | null;
          description_ar?: string | null;
          image_url: string;
          category_id?: string | null;
          product_id?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title_fr?: string | null;
          title_ar?: string | null;
          description_fr?: string | null;
          description_ar?: string | null;
          image_url?: string;
          category_id?: string | null;
          product_id?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          client_company: string | null;
          client_city: string | null;
          content_fr: string;
          content_ar: string | null;
          rating: number;
          avatar_url: string | null;
          is_featured: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_company?: string | null;
          client_city?: string | null;
          content_fr: string;
          content_ar?: string | null;
          rating?: number;
          avatar_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_company?: string | null;
          client_city?: string | null;
          content_fr?: string;
          content_ar?: string | null;
          rating?: number;
          avatar_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question_fr: string;
          question_ar: string | null;
          answer_fr: string;
          answer_ar: string | null;
          category: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question_fr: string;
          question_ar?: string | null;
          answer_fr: string;
          answer_ar?: string | null;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question_fr?: string;
          question_ar?: string | null;
          answer_fr?: string;
          answer_ar?: string | null;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          city: string | null;
          product_type: string | null;
          product_id: string | null;
          quantity: string | null;
          message: string | null;
          file_url: string | null;
          preferred_contact: string;
          source: string;
          status: string;
          notes: string | null;
          contacted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          city?: string | null;
          product_type?: string | null;
          product_id?: string | null;
          quantity?: string | null;
          message?: string | null;
          file_url?: string | null;
          preferred_contact?: string;
          source?: string;
          status?: string;
          notes?: string | null;
          contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string | null;
          city?: string | null;
          product_type?: string | null;
          product_id?: string | null;
          quantity?: string | null;
          message?: string | null;
          file_url?: string | null;
          preferred_contact?: string;
          source?: string;
          status?: string;
          notes?: string | null;
          contacted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          value_json: Json | null;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string | null;
          value_json?: Json | null;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string | null;
          value_json?: Json | null;
          description?: string | null;
          updated_at?: string;
        };
      };
      hero_content: {
        Row: {
          id: string;
          page: string;
          title_fr: string;
          title_ar: string | null;
          subtitle_fr: string | null;
          subtitle_ar: string | null;
          cta_primary_text_fr: string | null;
          cta_primary_text_ar: string | null;
          cta_primary_link: string | null;
          cta_secondary_text_fr: string | null;
          cta_secondary_text_ar: string | null;
          cta_secondary_link: string | null;
          background_image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page?: string;
          title_fr: string;
          title_ar?: string | null;
          subtitle_fr?: string | null;
          subtitle_ar?: string | null;
          cta_primary_text_fr?: string | null;
          cta_primary_text_ar?: string | null;
          cta_primary_link?: string | null;
          cta_secondary_text_fr?: string | null;
          cta_secondary_text_ar?: string | null;
          cta_secondary_link?: string | null;
          background_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page?: string;
          title_fr?: string;
          title_ar?: string | null;
          subtitle_fr?: string | null;
          subtitle_ar?: string | null;
          cta_primary_text_fr?: string | null;
          cta_primary_text_ar?: string | null;
          cta_primary_link?: string | null;
          cta_secondary_text_fr?: string | null;
          cta_secondary_text_ar?: string | null;
          cta_secondary_link?: string | null;
          background_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string | null;
          role: string;
          last_login: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name?: string | null;
          role?: string;
          last_login?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string | null;
          role?: string;
          last_login?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type GalleryItem = Database['public']['Tables']['gallery']['Row'];
export type GalleryInsert = Database['public']['Tables']['gallery']['Insert'];
export type GalleryUpdate = Database['public']['Tables']['gallery']['Update'];

export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];
export type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update'];

export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type FAQInsert = Database['public']['Tables']['faqs']['Insert'];
export type FAQUpdate = Database['public']['Tables']['faqs']['Update'];

export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];

export type Setting = Database['public']['Tables']['settings']['Row'];
export type SettingInsert = Database['public']['Tables']['settings']['Insert'];
export type SettingUpdate = Database['public']['Tables']['settings']['Update'];

export type HeroContent = Database['public']['Tables']['hero_content']['Row'];
export type HeroContentInsert = Database['public']['Tables']['hero_content']['Insert'];
export type HeroContentUpdate = Database['public']['Tables']['hero_content']['Update'];

export type AdminUser = Database['public']['Tables']['admin_users']['Row'];

// Extended types with relations
export type ProductWithCategory = Product & {
  category: Category | null;
};

export type GalleryItemWithRelations = GalleryItem & {
  category: Category | null;
  product: Product | null;
};

// Lead status type
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'closed' | 'cancelled';

// Contact preference type
export type ContactPreference = 'whatsapp' | 'call' | 'email';
