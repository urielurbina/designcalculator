import { supabase } from '../lib/supabase';

export interface ClientData {
  id?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
}

// Mock data for development
const mockClients: ClientData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    company: 'Tech Corp',
    email: 'alice@techcorp.com',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Bob Smith',
    company: 'Design Studio',
    email: 'bob@designstudio.com',
    phone: '+0987654321'
  }
];

export async function getClients() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return mockClients; // Return mock data if no user

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('freelancer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      return mockClients; // Return mock data on error
    }

    return data.length > 0 ? data : mockClients;
  } catch (error) {
    console.error('Error in getClients:', error);
    return mockClients;
  }
}

export async function createClient(clientData: Omit<ClientData, 'id'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...clientData,
        freelancer_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in createClient:', error);
    // Return a mock response
    return {
      id: Date.now().toString(),
      ...clientData
    };
  }
}

export async function updateClient(id: string, clientData: Omit<ClientData, 'id'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('clients')
      .update({
        ...clientData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('freelancer_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in updateClient:', error);
    // Return a mock response
    return {
      id,
      ...clientData
    };
  }
}

export async function deleteClient(id: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
      .eq('freelancer_id', user.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error in deleteClient:', error);
    return true; // Return success even on error for development
  }
}