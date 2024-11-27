import { supabase } from '../lib/supabase';

export interface FreelancerData {
  name: string;
  website?: string;
  email: string;
  phone?: string;
  logo_url?: string;
}

export async function getFreelancerProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('freelancers')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateFreelancerProfile(profileData: FreelancerData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('freelancers')
    .upsert({
      id: user.id,
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}