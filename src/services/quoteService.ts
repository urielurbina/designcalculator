import { supabase } from '../lib/supabase';
import { SelectedService, VolumeDiscountType, ClientDiscountType, MaintenanceType } from '../types';

export interface Quote {
  id: string;
  freelancer_id?: string;
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

export async function generateQuoteNumber(): Promise<string> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const year = new Date().getFullYear();
    const { count, error: countError } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })
      .eq('freelancer_id', user.id)
      .gte('created_at', `${year}-01-01`)
      .lte('created_at', `${year}-12-31`);

    if (countError) throw countError;

    const sequentialNumber = String(((count || 0) + 1)).padStart(4, '0');
    return `QT-${year}-${sequentialNumber}`;
  } catch (error) {
    console.error('Error generating quote number:', error);
    const timestamp = Date.now().toString().slice(-4);
    return `QT-${new Date().getFullYear()}-${timestamp}`;
  }
}

export async function createQuote(quoteData: Omit<QuoteData, 'freelancer_id'>): Promise<Quote> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    // Validate required fields
    if (!quoteData.client_id) throw new Error('Client ID is required');
    if (!quoteData.services || quoteData.services.length === 0) throw new Error('At least one service is required');
    if (!quoteData.total_amount) throw new Error('Total amount is required');

    // Prepare the quote data with all required fields
    const quoteToInsert = {
      freelancer_id: user.id,
      client_id: quoteData.client_id,
      quote_number: quoteData.quote_number,
      total_amount: quoteData.total_amount,
      currency: quoteData.currency,
      status: quoteData.status || 'draft',
      services: quoteData.services,
      terms: quoteData.terms || [],
      volume_discount: quoteData.volume_discount || 'none',
      client_type: quoteData.client_type || 'normal',
      maintenance: quoteData.maintenance || 'none',
      notes: quoteData.notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert the quote and get the client data in a single query
    const { data, error } = await supabase
      .from('quotes')
      .insert([quoteToInsert])
      .select(`
        *,
        client:clients (
          name,
          company,
          email,
          phone
        )
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to create quote');
    }

    if (!data) {
      throw new Error('No data returned from insert');
    }

    // Return the complete quote with client data
    return {
      ...data,
      client: data.client || quoteData.client // Fallback to provided client data if needed
    };
  } catch (error) {
    console.error('Error in createQuote:', error);
    throw error;
  }
}

export async function getQuotes(): Promise<Quote[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients (
          name,
          company,
          email,
          phone
        )
      `)
      .eq('freelancer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error in getQuotes:', error);
    return [];
  }
}

export async function getQuote(id: string): Promise<QuoteData | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients (
          name,
          company,
          email,
          phone
        )
      `)
      .eq('id', id)
      .eq('freelancer_id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getQuote:', error);
    return null;
  }
}

export async function updateQuote(id: string, quoteData: Partial<QuoteData>): Promise<Quote | null> {
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
      .select(`
        *,
        client:clients (
          name,
          company,
          email,
          phone
        )
      `)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in updateQuote:', error);
    return null;
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
    return false;
  }
}