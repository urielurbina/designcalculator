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
  
  try {
    if (!userId?.trim()) {
      throw new Error('ID de usuario no válido');
    }

    const dataToSave = {
      user_id: userId,
      design_config: design,
      updated_at: new Date().toISOString()
    };

    console.log('Datos a guardar:', dataToSave);

    const { data, error } = await supabase
      .from('pdf_designs')
      .upsert(dataToSave, {
        onConflict: 'user_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error de Supabase al guardar diseño:', error);
      throw new Error(error.message || 'Error al guardar el diseño en la base de datos');
    }

    console.log('Diseño guardado/actualizado correctamente:', data);
    return data;
  } catch (error) {
    console.error('Error en savePDFDesign:', error);
    throw error;
  }
}

export async function loadPDFDesign(userId: string) {
  if (!userId?.trim()) {
    console.error('ID de usuario no válido');
    throw new Error('ID de usuario no válido');
  }

  console.log('Cargando diseño para usuario:', userId);
  
  try {
    const { data, error } = await supabase
      .from('pdf_designs')
      .select('*')
      .eq('user_id', userId)
      .single();

    console.log('Respuesta completa de Supabase:', { data, error });

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('No se encontró diseño guardado para el usuario');
        return null;
      }
      console.error('Error al cargar diseño:', error);
      throw new Error(`Error al cargar el diseño: ${error.message}`);
    }

    if (!data?.design_config) {
      console.log('No hay configuración de diseño guardada');
      return null;
    }

    return data.design_config as PDFDesignConfig;
  } catch (error) {
    console.error('Error inesperado al cargar diseño:', error);
    throw error;
  }
} 