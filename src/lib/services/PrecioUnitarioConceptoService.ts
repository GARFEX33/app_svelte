// src/lib/services/PrecioUnitarioConceptoService.ts
import { supabase } from '$lib/supabaseClient';
import type { PrecioUnitarioConceptoSupabase } from '$lib/types/PrecioUnitarioConcepto';

// Fetch all `precio_unitario_conceptos` from the database
export async function fetchPrecioUnitarioConceptos(): Promise<PrecioUnitarioConceptoSupabase[]> {
  const { data, error } = await supabase
    .from('precio_unitario_conceptos')
    .select('*');
  
  if (error) {
    console.error('Error fetching precio_unitario_conceptos:', error);
    throw new Error('Error fetching precio_unitario_conceptos');
  }
  return data ?? [];
}

// Add a new `precio_unitario_concepto` to the database
export async function addPrecioUnitarioConcepto(
  precioUnitarioConcepto: Omit<PrecioUnitarioConceptoSupabase, 'id' | 'created_at'>
): Promise<PrecioUnitarioConceptoSupabase | null> {
  const { data, error } = await supabase
    .from('precio_unitario_conceptos')
    .insert(precioUnitarioConcepto)
    .select()
    .single();

  if (error) {
    console.error('Error service (addPrecioUnitarioConcepto):', error);
    throw new Error(error.message);
  }

  return data;
}

// Update an existing `precio_unitario_concepto` in the database
export async function updatePrecioUnitarioConcepto(
  id: number,
  precioUnitarioConceptoActualizado: Partial<PrecioUnitarioConceptoSupabase>
): Promise<PrecioUnitarioConceptoSupabase | null> {
  const { data, error } = await supabase
    .from('precio_unitario_conceptos')
    .update(precioUnitarioConceptoActualizado)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error service (updatePrecioUnitarioConcepto):', error);
    throw new Error(error.message);
  }

  return data;
}

export async function deletePrecioUnitarioConcepto(id: number): Promise<void> {
  const { error } = await supabase
    .from('precio_unitario_conceptos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting precio_unitario_concepto:', error);
    throw new Error('Error deleting precio_unitario_concepto');
  }
}
// Fetch `precio_unitario_conceptos` filtered by `precio_unitario_id`
export async function fetchPrecioUnitarioConceptosByPrecioUnitarioId(
  precioUnitarioId: number
): Promise<PrecioUnitarioConceptoSupabase[]> {
  const { data, error } = await supabase
    .from('precio_unitario_conceptos')
    .select('*')
    .eq('precio_unitario_id', precioUnitarioId);  // Filtrar por `precio_unitario_id`
  
  if (error) {
    console.error('Error fetching precio_unitario_conceptos by precio_unitario_id:', error);
    throw new Error('Error fetching precio_unitario_conceptos');
  }

  return data ?? [];
}