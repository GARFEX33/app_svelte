// src/lib/stores/clienteStore.ts
import { writable } from 'svelte/store';
import type { Cliente } from '$lib/types';
import { createClienteRepository } from '$lib/repositories/clientes/ClienteRepositoryFactory';

// Crea la instancia del repositorio
const clienteRepository = createClienteRepository();

// Store para mantener la lista de clientes
export const clientes = writable<Cliente[]>([]);

export async function loadClientes(): Promise<Cliente[]> {
  try {
    const data = await clienteRepository.fetchClientes();
    clientes.set(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al cargar clientes:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    return [];
  }
}

export async function agregarCliente(nuevoCliente: Omit<Cliente, 'id'>): Promise<void> {
  try {
    // Llama al repositorio para agregar el cliente
    const clienteAgregado = await clienteRepository.addCliente(nuevoCliente);
    
    // Verifica si el cliente fue agregado correctamente
    if (clienteAgregado) {
      // Actualiza el store con el nuevo cliente
      clientes.update(current => [...current, clienteAgregado]);
      console.log('Cliente agregado y store actualizado:', clienteAgregado);
    } else {
      console.error('Error: No se pudo agregar el cliente');
    }
  } catch (error) {
    console.error('Error al agregar cliente:', error);
  }
}

export async function actualizarCliente(id: number, clienteActualizado: Partial<Cliente>): Promise<void> {
  try {
    const cliente = await clienteRepository.updateCliente(id, clienteActualizado);
    if (cliente) {
      clientes.update(current =>
        current.map(c => (c.id === id ? cliente : c))
      );
    }
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
  }
}

export async function eliminarCliente(id: number): Promise<void> {
  try {
    await clienteRepository.deleteCliente(id);
    clientes.update(current => current.filter(cliente => cliente.id !== id));
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
  }
}
