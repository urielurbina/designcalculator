import { supabase } from '../lib/supabase';

export interface FreelancerData {
  name: string;
  website?: string;
  email: string;
  phone?: string;
  logo_url?: string;
}

// Mock data for development
const mockFreelancerData: FreelancerData = {
  name: 'John Doe',
  website: 'https://johndoe.com',
  email: 'john@example.com',
  phone: '+1234567890',
  logo_url: 'https://via.placeholder.com/150'
};

export async function getFreelancerProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return mockFreelancerData; // Return mock data if no user

    const { data, error } = await supabase
      .from('freelancers')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return mockFreelancerData; // Return mock data on error
    }

    return data || mockFreelancerData;
  } catch (error) {
    console.error('Error in getFreelancerProfile:', error);
    return mockFreelancerData;
  }
}

export async function updateFreelancerProfile(profileData: FreelancerData) {
  try {
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
  } catch (error) {
    console.error('Error in updateFreelancerProfile:', error);
    return mockFreelancerData;
  }
}