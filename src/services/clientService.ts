import { supabase } from '../lib/supabase';

export interface ClientData {
  id?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
}

export async function getClients() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('freelancer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createClient(clientData: Omit<ClientData, 'id'>) {
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
}

export async function updateClient(id: string, clientData: Omit<ClientData, 'id'>) {
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
}

export async function deleteClient(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('freelancer_id', user.id);

  if (error) throw error;
  return true;
}