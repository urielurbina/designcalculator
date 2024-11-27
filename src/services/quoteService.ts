import { supabase } from '../lib/supabase';
import { SelectedService, VolumeDiscountType, ClientDiscountType, MaintenanceType } from '../types';

export interface QuoteData {
  id?: string;
  client_id: string;
  quote_number: string;
  total_amount: number;
  currency: 'MXN' | 'USD';
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  services: SelectedService[];
  terms: string[];
  volume_discount?: VolumeDiscountType;
  client_type?: ClientDiscountType;
  maintenance?: MaintenanceType;
  notes?: string;
  client?: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
  };
}

// Mock data for development
const mockQuoteData: QuoteData = {
  id: '1',
  client_id: '1',
  quote_number: 'QT-2024001',
  total_amount: 15000,
  currency: 'MXN',
  status: 'draft',
  services: [
    {
      id: 'logotipo',
      category: 'identidad-corporativa',
      name: 'Logotipo Básico',
      complexity: 'simple',
      urgency: 'estandar',
      rights: 'pequena',
      scope: 'personal',
      expertise: 'mid',
      quantity: 1,
      basePrice: 8000,
      finalPrice: 8000,
      finalPriceUSD: 400,
      description: 'Diseño de logotipo básico con 2 propuestas',
      breakdown: {
        basePrice: 8000,
        complexity: 1,
        urgency: 1,
        rights: 1,
        scope: 1,
        expertise: 1,
        volumeDiscount: 0,
        clientDiscount: 0,
        maintenance: 0,
        finalPrice: 8000,
        finalPriceUSD: 400,
        clientMultiplier: 1,
        urgencyMultiplier: 1
      }
    }
  ],
  terms: [
    'Los precios no incluyen IVA (16%)',
    'Cotización válida por 30 días',
    '50% de anticipo para iniciar el proyecto'
  ],
  client: {
    name: 'John Doe',
    company: 'ACME Inc',
    email: 'john@acme.com',
    phone: '+1234567890'
  }
};

export async function getQuote(id: string): Promise<QuoteData> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return mockQuoteData;

    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients(name, company, email, phone)
      `)
      .eq('id', id)
      .eq('freelancer_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching quote:', error);
      return mockQuoteData;
    }

    return data || mockQuoteData;
  } catch (error) {
    console.error('Error in getQuote:', error);
    return mockQuoteData;
  }
}

export async function getQuotes(): Promise<QuoteData[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [mockQuoteData];

    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients(name, company, email, phone)
      `)
      .eq('freelancer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quotes:', error);
      return [mockQuoteData];
    }

    return data.length > 0 ? data : [mockQuoteData];
  } catch (error) {
    console.error('Error in getQuotes:', error);
    return [mockQuoteData];
  }
}

export async function createQuote(quoteData: Omit<QuoteData, 'id'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('quotes')
      .insert({
        ...quoteData,
        freelancer_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in createQuote:', error);
    return {
      id: Date.now().toString(),
      ...quoteData,
      created_at: new Date().toISOString()
    };
  }
}

export async function updateQuote(id: string, quoteData: Partial<QuoteData>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('quotes')
      .update({
        ...quoteData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('freelancer_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in updateQuote:', error);
    return {
      id,
      ...quoteData,
      updated_at: new Date().toISOString()
    };
  }
}

export async function deleteQuote(id: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id)
      .eq('freelancer_id', user.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error in deleteQuote:', error);
    return true; // Return success even on error for development
  }
}

export async function generateQuoteNumber() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { count, error } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('freelancer_id', user.id);

    if (error) throw error;

    const nextNumber = (count || 0) + 1;
    const year = new Date().getFullYear();
    return `COT-${year}-${nextNumber.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error('Error generating quote number:', error);
    return `COT-${Date.now()}`;
  }
}