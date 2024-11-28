import { supabase } from '../lib/supabase';

export interface PDFDesignConfig {
  primaryColor: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
  backgroundColor: string;
  fontFamily: string;
  secondaryFontFamily: string;
  fontSize: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
  };
  logoPosition: 'left' | 'right' | 'center';
  showHeader: boolean;
  showFooter: boolean;
  headerText: string;
  footerText: string;
  spacing: {
    section: number;
    element: number;
    page: number;
  };
  borders: {
    width: number;
    color: string;
    style: 'solid' | 'dashed' | 'dotted';
  };
  serviceCard: {
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
    borderColor: string;
    padding: number;
  };
  priceBreakdown: {
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
    borderColor: string;
    padding: number;
  };
  shadows: {
    enabled: boolean;
    color: string;
    blur: number;
    opacity: number;
  };
}

export async function savePDFDesign(userId: string, design: PDFDesignConfig) {
  console.log('Guardando diseño para usuario:', userId);
  
  const { data, error } = await supabase
    .from('pdf_designs')
    .upsert(
      {
        user_id: userId,
        design_config: design,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'user_id',  // Especifica la columna para el conflicto
        ignoreDuplicates: false  // Actualiza si existe
      }
    );

  if (error) {
    console.error('Error al guardar diseño:', error);
    throw error;
  }

  console.log('Diseño guardado correctamente:', data);
  return data;
}

export async function loadPDFDesign(userId: string) {
  console.log('Cargando diseño para:', userId);
  
  try {
    const { data, error } = await supabase
      .from('pdf_designs')
      .select('design_config')
      .eq('user_id', userId)
      .single();

    console.log('Respuesta de Supabase:', { data, error });

    // Si hay error pero no es de "no data", lanzamos el error
    if (error && error.code !== 'PGRST116') {
      console.error('Error al cargar diseño:', error);
      throw error;
    }

    // Si hay datos, los retornamos
    if (data?.design_config) {
      console.log('Diseño encontrado:', data.design_config);
      return data.design_config as PDFDesignConfig;
    }

    // Si no hay datos, retornamos null
    console.log('No se encontró diseño guardado');
    return null;
  } catch (error) {
    console.error('Error inesperado al cargar diseño:', error);
    throw error;
  }
} 