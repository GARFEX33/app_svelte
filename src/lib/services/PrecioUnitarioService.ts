// src/lib/services/PrecioUnitarioService.ts
import { supabase } from '$lib/supabaseClient';
import type { PrecioUnitarioSupabase } from '$lib/types/PrecioUnitario';

// Fetch all `precio_unitarios` from the database
export async function fetchPreciosUnitarios(): Promise<PrecioUnitarioSupabase[]> {
  const { data, error } = await supabase.from('precio_unitarios').select('*');
  if (error) {
    console.error('Error fetching precios unitarios:', error);
    throw new Error('Error fetching precios unitarios');
  }
  return data ?? [];
}

export async function addPrecioUnitario(precioUnitario: Omit<PrecioUnitarioSupabase, 'id' | 'created_at'>): Promise<PrecioUnitarioSupabase | null> {
  const { data, error } = await supabase
    .from('precio_unitarios')
    .insert(precioUnitario)
    .select()
    .single();

  if (error) {
    console.error('Error service (addPrecioUnitario):', error);
    throw new Error(error.message);
  }
  return data;
}

export async function updatePrecioUnitario(id: number, precioUnitario: Partial<PrecioUnitarioSupabase>): Promise<PrecioUnitarioSupabase | null> {
  const { data, error } = await supabase.from('precio_unitarios').update(precioUnitario).eq('id', id).select().single();
  if (error) {
    console.error('Error service (updatePrecioUnitario):', error);
    throw new Error(error.message);
  }
  return data;
}

export async function deletePrecioUnitario(id: number): Promise<void> {
  const { error } = await supabase.from('precio_unitarios').delete().eq('id', id);
  if (error) {
    console.error('Error deleting precio unitario:', error);
    throw new Error('Error deleting precio unitario');
  }
}
