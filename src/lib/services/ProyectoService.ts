// src/lib/services/ProyectoService.ts
import { supabase } from '$lib/supabaseClient';
import type { Proyecto } from '$lib/types/Proyecto';

export async function fetchProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabase.from('proyectos').select('*');
  if (error) {
    console.error('Error fetching proyectos:', error);
    throw new Error(error.message);
  }
  return data ?? [];
}

export async function addProyecto(proyecto: Proyecto): Promise<Proyecto | null> {
  const { data, error } = await supabase.from('proyectos').insert(proyecto).select().single();
  if (error) {
    console.error('Error adding proyecto:', error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateProyecto(id: number, proyecto: Partial<Proyecto>): Promise<Proyecto | null> {
  const { data, error } = await supabase.from('proyectos').update(proyecto).eq('id', id).select().single();
  if (error) {
    console.error('Error updating proyecto:', error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteProyecto(id: number): Promise<void> {
  const { error } = await supabase.from('proyectos').delete().eq('id', id);
  if (error) {
    console.error('Error deleting proyecto:', error);
    throw new Error('Error deleting proyecto');
  }
}

export async function getProyectoById(id: number): Promise<Proyecto | null> {
  const { data, error } = await supabase.from('proyectos').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching proyecto by ID:', error);
    throw new Error(error.message);
  }
  return data;
}
