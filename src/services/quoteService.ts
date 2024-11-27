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

export async function getQuotes() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients(name, company, email, phone)
      `)
      .eq('freelancer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in getQuotes:', error);
    return [];
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
    throw error;
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
    throw error;
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
    throw error;
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