// src/lib/services/ClienteService.ts
import { supabase } from '$lib/supabaseClient';
import type { Cliente, ClienteSupabase } from '$lib/types';
import type { PostgrestError } from '@supabase/supabase-js';

export async function fetchClientes(): Promise<Cliente[]> {
  const { data, error }: { data: ClienteSupabase[] | null; error: PostgrestError | null } = await supabase
    .from('clientes')
    .select('*');

  if (error) {
    throw new Error('Error al cargar clientes: ' + error.message);
  }

  return (data || []).map((item: ClienteSupabase) => ({
    id: item.id,
    cliente: item.cliente,
    razonsocial: item.razon_social,
  }));
}

export async function addCliente(nuevoCliente: Omit<ClienteSupabase, 'id'>): Promise<ClienteSupabase | null> {
  const response = await supabase
    .from('clientes')
    .insert([{
      cliente: nuevoCliente.cliente,
      razon_social: nuevoCliente.razon_social,
    }])
    .select('*')
    .single();

  console.log("Respuesta completa:", response);  // Imprime la respuesta completa

  const { data, error, status } = response;

  // Verifica si el status es 201 (inserción exitosa)
  if (status !== 201) {
    throw new Error(`Error al agregar cliente. Estado de la respuesta: ${status}`);
  }

  if (error) {
    throw new Error('Error al agregar cliente: ' + error.message);
  }

  // Si el status es 201 pero no se devuelve data, devuelve un mensaje claro
  if (!data) {
    console.warn('Cliente agregado, pero no se devolvieron datos.');
    return null;
  }

  return data;
}


export async function updateCliente(id: number, clienteActualizado: Partial<ClienteSupabase>): Promise<ClienteSupabase | null> {
  const { data, error }: { data: ClienteSupabase | null; error: PostgrestError | null } = await supabase
    .from('clientes')
    .update({
      cliente: clienteActualizado.cliente,
      razon_social: clienteActualizado.razon_social,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error('Error al actualizar cliente en la base de datos: ' + error.message);
  }

  return data;
}

export async function deleteCliente(id: number): Promise<void> {
  const { error }: { error: PostgrestError | null } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Error al eliminar cliente: ' + error.message);
  }
}
