import { supabase } from '../lib/supabase';
import { SelectedService, VolumeDiscountType, ClientDiscountType, MaintenanceType } from '../types';

export interface Quote {
  id: string;
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
  client: {
    name: string;
    company?: string;
    email: string;
    phone?: string;
  };
  created_at: string;
}

export type QuoteData = Omit<Quote, 'id' | 'created_at'>;

// Mock data for development
const mockQuote: Quote = {
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
  },
  created_at: new Date().toISOString()
};

export async function getQuotes(): Promise<Quote[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [mockQuote];

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
      return [mockQuote];
    }

    return data.map(quote => ({
      ...quote,
      id: quote.id || '',
      created_at: quote.created_at || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error in getQuotes:', error);
    return [mockQuote];
  }
}

export async function getQuote(id: string): Promise<Quote> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return mockQuote;

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
      return mockQuote;
    }

    return {
      ...data,
      id: data.id || '',
      created_at: data.created_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in getQuote:', error);
    return mockQuote;
  }
}

export async function createQuote(quoteData: QuoteData): Promise<Quote> {
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

    return {
      ...data,
      id: data.id || '',
      created_at: data.created_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in createQuote:', error);
    return {
      ...mockQuote,
      ...quoteData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
  }
}

export async function updateQuote(id: string, quoteData: Partial<QuoteData>): Promise<Quote> {
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

    return {
      ...data,
      id: data.id || '',
      created_at: data.created_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in updateQuote:', error);
    return {
      ...mockQuote,
      ...quoteData,
      id,
      created_at: new Date().toISOString()
    };
  }
}

export async function deleteQuote(id: string): Promise<boolean> {
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
    return true;
  }
}

export async function generateQuoteNumber(): Promise<string> {
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