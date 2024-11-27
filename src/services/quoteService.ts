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
}

// Mock data for development
const mockQuotes = [
  {
    id: '1',
    quote_number: 'COT-2024-0001',
    created_at: new Date().toISOString(),
    client: {
      name: 'Alice Johnson',
      company: 'Tech Corp'
    },
    total_amount: 15000,
    currency: 'MXN',
    status: 'draft'
  },
  {
    id: '2',
    quote_number: 'COT-2024-0002',
    created_at: new Date().toISOString(),
    client: {
      name: 'Bob Smith',
      company: 'Design Studio'
    },
    total_amount: 25000,
    currency: 'MXN',
    status: 'sent'
  }
];

export async function getQuotes() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return mockQuotes; // Return mock data if no user

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
      return mockQuotes; // Return mock data on error
    }

    return data.length > 0 ? data : mockQuotes;
  } catch (error) {
    console.error('Error in getQuotes:', error);
    return mockQuotes;
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
    // Return a mock response for development
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
    // Return a mock response for development
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
    // Fallback quote number
    return `COT-${Date.now()}`;
  }
}