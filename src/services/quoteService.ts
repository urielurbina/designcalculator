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

export async function updateQuote(quoteId: string, quoteData: QuoteData): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    console.log('Updating quote with data:', {
      quoteId,
      userId: user.id,
      quoteData
    });

    // Verificar que la cotización pertenezca al usuario
    const { data: existingQuote, error: checkError } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .eq('freelancer_id', user.id)
      .single();

    if (checkError) {
      console.error('Error checking quote ownership:', checkError);
      throw new Error('Error al verificar permisos de la cotización');
    }

    if (!existingQuote) {
      throw new Error('No tienes permiso para editar esta cotización');
    }

    // Preparar datos para actualizar - remover el objeto client
    const updateData = {
      client_id: quoteData.client_id, // Solo usar client_id, no el objeto client completo
      services: quoteData.services,
      total_amount: quoteData.total_amount,
      currency: quoteData.currency,
      status: quoteData.status,
      terms: quoteData.terms,
      volume_discount: quoteData.volume_discount,
      client_type: quoteData.client_type,
      maintenance: quoteData.maintenance,
      updated_at: new Date().toISOString(),
      freelancer_id: user.id
    };

    console.log('Update data prepared:', updateData);

    const { error: updateError } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', quoteId)
      .eq('freelancer_id', user.id);

    if (updateError) {
      console.error('Error updating quote in database:', updateError);
      throw new Error(`Error al actualizar la cotización: ${updateError.message}`);
    }

    console.log('Quote updated successfully');
  } catch (error) {
    console.error('Error in updateQuote:', error);
    if (error instanceof Error) {
      throw new Error(`Error al actualizar la cotización: ${error.message}`);
    } else {
      throw new Error('Error desconocido al actualizar la cotización');
    }
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

export const getQuoteById = async (quoteId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    // Primero obtenemos los datos del freelancer
    const { data: freelancerData, error: freelancerError } = await supabase
      .from('freelancers')
      .select('*')
      .eq('id', user.id)
      .single();

    if (freelancerError) {
      console.error('Error obteniendo datos del freelancer:', freelancerError);
      throw freelancerError;
    }

    // Luego obtenemos los datos de la cotización
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .select(`
        *,
        client:clients (
          id,
          name,
          company,
          email,
          phone
        )
      `)
      .eq('id', quoteId)
      .eq('freelancer_id', user.id)
      .single();

    if (quoteError) {
      console.error('Error en la consulta de la cotización:', quoteError);
      throw quoteError;
    }

    if (!quoteData) {
      console.error('No se encontraron datos para la cotización:', quoteId);
      throw new Error('No se encontró la cotización');
    }

    // Los servicios ya vienen en el campo services como JSON
    const completeData = {
      ...quoteData,
      freelancer: freelancerData,
      // Asegurarnos de que services sea un array
      services: Array.isArray(quoteData.services) ? quoteData.services : []
    };

    // Verificar que los datos necesarios estén presentes
    console.log('Datos completos de la cotización:', {
      quote: completeData,
      client: completeData.client,
      freelancer: completeData.freelancer,
      services: completeData.services
    });

    return completeData;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};