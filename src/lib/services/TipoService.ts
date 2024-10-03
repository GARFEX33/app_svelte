// src/lib/services/TipoService.ts
import { supabase } from '$lib/supabaseClient';
import type { TipoSupabase } from '$lib/types/Tipo';


export async function fetchTipos(): Promise<TipoSupabase[]> {
  const { data, error } = await supabase.from('tipos').select('*');
  if (error) {
    console.error('Error fetching tipos:', error);
    throw new Error('Error fetching tipos');
  }
  return data ?? [];
}

export async function addTipo(tipo: Omit<TipoSupabase, 'id'>): Promise<TipoSupabase | null> {
  const { data, error } = await supabase
    .from('tipos')
    .insert(tipo)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding tipo:', error);
    return null;
  }
  return data;
}

export async function updateTipo(id: number, tipo: Partial<TipoSupabase>): Promise<TipoSupabase | null> {
  const { data, error } = await supabase
    .from('tipos')
    .update(tipo)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating tipo:', error);
    return null;
  }
  return data;
}

export async function deleteTipo(id: number): Promise<void> {
  const { error } = await supabase
    .from('tipos')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting tipo:', error);
    throw new Error('Error deleting tipo');
  }
}
