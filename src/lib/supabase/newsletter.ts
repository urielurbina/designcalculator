import { supabase } from './client';

export async function subscribeEmail(data: { email: string; name: string }) {
  try {
    console.log('Checking email:', data.email);
    
    // Verificamos si el email existe
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', data.email)
      .maybeSingle();

    if (checkError) {
      console.error('Check error:', checkError);
      throw new Error('Error de conexión');
    }

    // Si encontramos el email
    if (existing) {
      console.log('Email already exists:', existing);
      return { success: true, existing: true };
    }

    console.log('Email not found, proceeding with insert');
    
    // Si no existe, procedemos con la inserción
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([
        { 
          email: data.email,
          name: data.name,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ]);

    if (insertError) {
      // Si el error es de duplicado, significa que el email ya existe
      if (insertError.code === '23505') {
        console.log('Email already exists (caught in insert)');
        return { success: true, existing: true };
      }
      console.error('Insert error:', insertError);
      throw new Error('Error al guardar la suscripción');
    }

    return { success: true, existing: false };
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
}

export async function unsubscribeEmail(email: string) {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ status: 'unactive' })
      .eq('email', email);

    if (error) throw error;
    return true;
  } catch (error) {
    throw new Error('Error al procesar la baja');
  }
}