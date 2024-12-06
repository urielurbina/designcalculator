import { baseRates, serviceOptions } from './pricing';
import { BaseRates, ServiceOptions, CategoryInfo } from '../types';
import { supabase } from '../lib/supabase';

export interface CustomPricing {
  user_id: string;
  base_rates: BaseRates;
  service_options: ServiceOptions;
  categories: CategoryInfo[];
  updated_at: string;
}

// Agregar la función de ordenamiento
const sortAlphabetically = <T extends { label: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.label.localeCompare(b.label));
};

export async function getUserCustomPricing(userId: string): Promise<CustomPricing | null> {
  console.log('Fetching custom pricing for user:', userId);
  
  const { data, error } = await supabase
    .from('custom_pricing')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching custom pricing:', error);
    return null;
  }

  if (!data) {
    const defaultPricing = initializeCustomPricing(userId);
    try {
      const { error: insertError } = await supabase
        .from('custom_pricing')
        .insert(defaultPricing);

      if (insertError) throw insertError;
      
      return defaultPricing;
    } catch (err) {
      console.error('Error initializing custom pricing:', err);
      return null;
    }
  }

  // Ordenar las categorías y los servicios dentro de cada categoría
  const processedData: CustomPricing = {
    user_id: data.user_id,
    base_rates: data.base_rates || { ...baseRates },
    service_options: Object.fromEntries(
      Object.entries(data.service_options || serviceOptions).map(([key, services]) => [
        key,
        sortAlphabetically(services)
      ])
    ),
    categories: sortAlphabetically(
      data.categories || Object.keys(data.base_rates || baseRates).map(categoryId => ({
        id: categoryId,
        label: (data.service_options || serviceOptions)[categoryId]?.[0]?.label.split(' ')[0] || categoryId
      }))
    ),
    updated_at: data.updated_at || new Date().toISOString()
  };

  console.log('Processed data:', processedData);
  return processedData;
}

export async function saveUserCustomPricing(
  userId: string, 
  customRates: BaseRates, 
  customServices: ServiceOptions,
  categories: CategoryInfo[]
): Promise<void> {
  console.log('Saving custom pricing for user:', userId, {
    customRates,
    customServices,
    categories
  });

  const { error: upsertError } = await supabase
    .from('custom_pricing')
    .upsert({
      user_id: userId,
      base_rates: customRates,
      service_options: customServices,
      categories: categories,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });

  if (upsertError) {
    console.error('Error saving custom pricing:', upsertError);
    throw new Error(`Failed to save custom pricing: ${upsertError.message}`);
  }

  console.log('Successfully saved custom pricing');
}

export function initializeCustomPricing(userId: string): CustomPricing {
  // Crear las categorías iniciales
  const initialCategories = Object.keys(baseRates).map(categoryId => ({
    id: categoryId,
    label: serviceOptions[categoryId]?.[0]?.label.split(' ')[0] || categoryId
  }));

  return {
    user_id: userId,
    base_rates: { ...baseRates },
    service_options: { ...serviceOptions },
    categories: initialCategories,
    updated_at: new Date().toISOString()
  };
} 