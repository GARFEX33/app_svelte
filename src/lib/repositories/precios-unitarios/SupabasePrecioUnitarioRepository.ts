// src/lib/repositories/precios-unitarios/SupabasePrecioUnitarioRepository.ts
import { addPrecioUnitario, deletePrecioUnitario, fetchPreciosUnitarios, updatePrecioUnitario } from '$lib/services/PrecioUnitarioService';
import type { PrecioUnitario, PrecioUnitarioSupabase } from '$lib/types/PrecioUnitario';
import type { PrecioUnitarioRepository } from './PrecioUnitarioRepository';

export class SupabasePrecioUnitarioRepository implements PrecioUnitarioRepository {
  async fetchPreciosUnitarios(): Promise<PrecioUnitario[]> {
    try {
      const preciosUnitarios = await fetchPreciosUnitarios();
      return preciosUnitarios.map(precio => ({
        id: precio.id,
        descripcion: precio.descripcion,
        unidad_id: precio.unidad_id,
        costo_unitario_total: precio.costo_unitario_total,
        created_at: precio.created_at,
      }));
    } catch (error) {
      console.error('Error fetching precios unitarios:', error);
      throw new Error('Error fetching precios unitarios');
    }
  }

  async addPrecioUnitario(nuevoPrecioUnitario: Omit<PrecioUnitario, 'id'>): Promise<PrecioUnitario | null> {
    const precioParaInsertar: Omit<PrecioUnitarioSupabase, 'id' | 'created_at'> = {
      descripcion: nuevoPrecioUnitario.descripcion,
      unidad_id: nuevoPrecioUnitario.unidad_id,
      costo_unitario_total: nuevoPrecioUnitario.costo_unitario_total,
    };

    try {
      const precioAgregado = await addPrecioUnitario(precioParaInsertar);
      return precioAgregado
        ? {
            id: precioAgregado.id, 
            descripcion: precioAgregado.descripcion,
            unidad_id: precioAgregado.unidad_id,
            costo_unitario_total: precioAgregado.costo_unitario_total,
            created_at: precioAgregado.created_at,
          }
        : null;
    } catch (error) {
      console.error('Error adding precio unitario:', error);
      throw new Error('Error adding precio unitario');
    }
  }

  async updatePrecioUnitario(id: number, precioActualizado: Partial<PrecioUnitario>): Promise<PrecioUnitario | null> {
    const precioParaActualizar: Partial<PrecioUnitarioSupabase> = {
      descripcion: precioActualizado.descripcion,
      unidad_id: precioActualizado.unidad_id,
      costo_unitario_total: precioActualizado.costo_unitario_total,
    };

    try {
      const precioActualizadoDb = await updatePrecioUnitario(id, precioParaActualizar);
      return precioActualizadoDb
        ? {
            id: precioActualizadoDb.id,
            descripcion: precioActualizadoDb.descripcion,
            unidad_id: precioActualizadoDb.unidad_id,
            costo_unitario_total: precioActualizadoDb.costo_unitario_total,
            created_at: precioActualizadoDb.created_at,
          }
        : null;
    } catch (error) {
      console.error('Error updating precio unitario:', error);
      throw new Error('Error updating precio unitario');
    }
  }

  async deletePrecioUnitario(id: number): Promise<void> {
    try {
      await deletePrecioUnitario(id);
    } catch (error) {
      console.error('Error deleting precio unitario:', error);
      throw new Error('Error deleting precio unitario');
    }
  }
}
