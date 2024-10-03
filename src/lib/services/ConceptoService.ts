// src/lib/services/ConceptoService.ts
import { supabase } from '$lib/supabaseClient';
import type { ConceptoSupabase } from '$lib/types/Concepto';

export async function fetchConceptos(): Promise<ConceptoSupabase[]> {
  const { data, error } = await supabase.from('conceptos').select('*');
  if (error) {
    console.error('Error fetching conceptos:', error);
    throw new Error('Error fetching conceptos');
  }
  return data ?? [];
}

export async function addConcepto(concepto: Omit<ConceptoSupabase, 'created_at'>): Promise<ConceptoSupabase | null> {
  const { data, error } = await supabase.from('conceptos').insert(concepto).select().single();
  if (error) {
    console.error('Error service:', error);
    throw new Error(error.message); // Lanza una excepción para que el error sea manejado
  }
  return data;
}


export async function updateConcepto(id: string, concepto: Partial<ConceptoSupabase>): Promise<ConceptoSupabase | null> {
  const { data, error } = await supabase.from('conceptos').update(concepto).eq('id', id).select().single();
  if (error) {
    throw new Error(error.message); // Lanza una excepción para que el error sea manejado

  }
  return data;
}

export async function deleteConcepto(id: string): Promise<void> {
  const { error } = await supabase.from('conceptos').delete().eq('id', id);
  if (error) {
    console.error('Error deleting concepto:', error);
    throw new Error('Error deleting concepto');
  }
}
