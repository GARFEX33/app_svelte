// src/lib/repositories/ClienteRepository.ts
import type { Cliente } from '$lib/types';

export interface ClienteRepository {
  fetchClientes(): Promise<Cliente[]>;
  addCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente | null>;
  updateCliente(id: number, clienteActualizado: Partial<Cliente>): Promise<Cliente | null>;
  deleteCliente(id: number): Promise<void>;
}
