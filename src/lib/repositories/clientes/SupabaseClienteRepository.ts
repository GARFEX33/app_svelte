// src/lib/repositories/SupabaseClienteRepository.ts

import { addCliente, deleteCliente, fetchClientes, updateCliente } from "$lib/services/ClienteService";
import type { Cliente, ClienteSupabase } from "$lib/types/Cliente";
import type { ClienteRepository } from "./ClienteRepository";


export class SupabaseClienteRepository implements ClienteRepository {
  async fetchClientes(): Promise<Cliente[]> {
    return await fetchClientes(); // Reutiliza la función centralizada
  }

  async addCliente(nuevoCliente: Omit<Cliente, 'id'>): Promise<Cliente | null> {
    // Mapea el objeto Cliente al formato de ClienteSupabase
    const clienteParaInsertar: Omit<ClienteSupabase, 'id'> = {
      cliente: nuevoCliente.cliente,
      razon_social: nuevoCliente.razonsocial // Mapea la propiedad correctamente
    };

    const clienteAgregado = await addCliente(clienteParaInsertar);
    console.log("Cliente agregado repo",clienteAgregado);
    return clienteAgregado ? {
      id: clienteAgregado.id,
      cliente: clienteAgregado.cliente,
      razonsocial: clienteAgregado.razon_social,
    } : null;
  }

  async updateCliente(id: number, clienteActualizado: Partial<Cliente>): Promise<Cliente | null> {
    // Mapea las propiedades antes de hacer la actualización
    const clienteParaActualizar: Partial<ClienteSupabase> = {
      cliente: clienteActualizado.cliente,
      razon_social: clienteActualizado.razonsocial
    };

    const clienteActualizadoDb = await updateCliente(id, clienteParaActualizar);

    return clienteActualizadoDb ? {
      id: clienteActualizadoDb.id,
      cliente: clienteActualizadoDb.cliente,
      razonsocial: clienteActualizadoDb.razon_social,
    } : null;
  }

  async deleteCliente(id: number): Promise<void> {
    await deleteCliente(id); // Reutiliza la función centralizada
  }
}
