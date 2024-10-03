// src/lib/services/UnidadService.ts
import { supabase } from '$lib/supabaseClient';
import type { UnidadSupabase } from '$lib/types/Unidad';

export async function fetchUnidades(): Promise<UnidadSupabase[]> {
  const { data, error } = await supabase.from('unidades').select('*');
  if (error) {
    console.error('Error fetching unidades:', error);
    throw new Error('Error fetching unidades');
  }
  return data ?? [];
}

export async function addUnidad(unidad: Omit<UnidadSupabase, 'id'>): Promise<UnidadSupabase | null> {
  const { data, error } = await supabase
    .from('unidades')
    .insert(unidad)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding unidad:', error);
    return null;
  }
  return data;
}

export async function updateUnidad(id: number, unidad: Partial<UnidadSupabase>): Promise<UnidadSupabase | null> {
  const { data, error } = await supabase
    .from('unidades')
    .update(unidad)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating unidad:', error);
    return null;
  }
  return data;
}

export async function deleteUnidad(id: number): Promise<void> {
  const { error } = await supabase
    .from('unidades')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting unidad:', error);
    throw new Error('Error deleting unidad');
  }
}
