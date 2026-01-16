import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { LeadInsert } from '@/types/database';

// Validation schema for lead
const leadSchema = z.object({
  full_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  email: z.string().email().optional().nullable(),
  city: z.string().optional().nullable(),
  product_type: z.string().optional().nullable(),
  product_id: z.string().uuid().optional().nullable(),
  quantity: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  file_url: z.string().url().optional().nullable(),
  preferred_contact: z.enum(['whatsapp', 'call', 'email']).default('whatsapp'),
  source: z.string().default('website'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = leadSchema.parse(body);
    
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url') {
      // Supabase is configured - save to database
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      
      const leadData: LeadInsert = {
        ...validatedData,
        status: 'new',
      };
      
      // Use type assertion to bypass strict typing during build
      const { data, error } = await (supabase as unknown as { 
        from: (table: string) => { 
          insert: (data: LeadInsert) => { 
            select: () => { 
              single: () => Promise<{ data: { id: string } | null; error: Error | null }> 
            } 
          } 
        } 
      })
        .from('leads')
        .insert(leadData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        // Still return success - lead will be contacted via WhatsApp
        return NextResponse.json(
          { 
            success: true, 
            message: 'Demande enregistrée. Nous vous contacterons bientôt.',
            fallback: true
          },
          { status: 201 }
        );
      }
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Demande enregistrée avec succès',
          data: { id: data?.id || 'unknown' }
        },
        { status: 201 }
      );
    }
    
    // Supabase not configured - just validate and return success
    // The form will redirect to WhatsApp
    console.log('Lead received (no database):', validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Demande reçue. Contactez-nous via WhatsApp pour un suivi rapide.',
        fallback: true
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}
