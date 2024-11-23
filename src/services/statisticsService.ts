import { supabase } from '../lib/supabase';

export async function incrementPDFCount() {
  try {
    // First, get all records to find the existing one
    const { data: stats, error: selectError } = await supabase
      .from('estadistica')
      .select('*');

    if (selectError) throw selectError;

    if (!stats || stats.length === 0) {
      // If no records exist, create first one
      const { error: insertError } = await supabase
        .from('estadistica')
        .insert([{ pdfs_generados: 1 }]);
      
      if (insertError) throw insertError;
    } else {
      // Update the first record (we should only have one)
      const currentRecord = stats[0];
      const { error: updateError } = await supabase
        .from('estadistica')
        .update({ 
          pdfs_generados: (currentRecord.pdfs_generados || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentRecord.id);
      
      if (updateError) throw updateError;
    }
  } catch (error) {
    console.error('Error updating PDF count:', error);
    throw error;
  }
}