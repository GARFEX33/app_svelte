// src/lib/repositories/precios-unitarios-conceptos/SupabasePrecioUnitarioConceptoRepository.ts
import { addPrecioUnitarioConcepto, deletePrecioUnitarioConcepto, fetchPrecioUnitarioConceptos, fetchPrecioUnitarioConceptosByPrecioUnitarioId, updatePrecioUnitarioConcepto } from '$lib/services/PrecioUnitarioConceptoService';
import type { PrecioUnitarioConcepto, PrecioUnitarioConceptoSupabase } from '$lib/types/PrecioUnitarioConcepto';
import type { PrecioUnitarioConceptoRepository } from './PrecioUnitarioConceptoRepository';

export class SupabasePrecioUnitarioConceptoRepository implements PrecioUnitarioConceptoRepository {
  async fetchPrecioUnitarioConceptos(): Promise<PrecioUnitarioConcepto[]> {
    try {
      const conceptos = await fetchPrecioUnitarioConceptos();
      return conceptos.map(concepto => ({
        id: concepto.id,
        created_at: concepto.created_at,
        cantidad: concepto.cantidad,
        total: concepto.total,
        precio_unitario_id: concepto.precio_unitario_id,
        concepto_id: concepto.concepto_id,
        unidad_id: concepto.unidad_id,
      }));
    } catch (error) {
      console.error('Error fetching precio_unitario_conceptos:', error);
      throw new Error('Error fetching precio_unitario_conceptos');
    }
  }

  async addPrecioUnitarioConcepto(nuevoConcepto: Omit<PrecioUnitarioConcepto, 'id'>): Promise<PrecioUnitarioConcepto | null> {
    const conceptoParaInsertar: Omit<PrecioUnitarioConceptoSupabase, 'id' | 'created_at'> = {
      cantidad: nuevoConcepto.cantidad,
      total: nuevoConcepto.total,
      precio_unitario_id: nuevoConcepto.precio_unitario_id,
      concepto_id: nuevoConcepto.concepto_id,
      unidad_id: nuevoConcepto.unidad_id,
    };

    try {
      const conceptoAgregado = await addPrecioUnitarioConcepto(conceptoParaInsertar);
      return conceptoAgregado
        ? {
            id: conceptoAgregado.id,
            cantidad: conceptoAgregado.cantidad,
            total: conceptoAgregado.total,
            precio_unitario_id: conceptoAgregado.precio_unitario_id,
            concepto_id: conceptoAgregado.concepto_id,
            unidad_id: conceptoAgregado.unidad_id,
            created_at: conceptoAgregado.created_at,
          }
        : null;
    } catch (error) {
      console.error('Error adding precio_unitario_concepto:', error);
      throw new Error('Error adding precio_unitario_concepto');
    }
  }

  async updatePrecioUnitarioConcepto(id: number, conceptoActualizado: Partial<PrecioUnitarioConcepto>): Promise<PrecioUnitarioConcepto | null> {
    const conceptoParaActualizar: Partial<PrecioUnitarioConceptoSupabase> = {
      cantidad: conceptoActualizado.cantidad,
      total: conceptoActualizado.total,
      precio_unitario_id: conceptoActualizado.precio_unitario_id,
      concepto_id: conceptoActualizado.concepto_id,
      unidad_id: conceptoActualizado.unidad_id,
    };

    try {
      const conceptoActualizadoDb = await updatePrecioUnitarioConcepto(id, conceptoParaActualizar);
      return conceptoActualizadoDb
        ? {
            id: conceptoActualizadoDb.id,
            cantidad: conceptoActualizadoDb.cantidad,
            total: conceptoActualizadoDb.total,
            precio_unitario_id: conceptoActualizadoDb.precio_unitario_id,
            concepto_id: conceptoActualizadoDb.concepto_id,
            unidad_id: conceptoActualizadoDb.unidad_id,
            created_at: conceptoActualizadoDb.created_at,
          }
        : null;
    } catch (error) {
      console.error('Error updating precio_unitario_concepto:', error);
      throw new Error('Error updating precio_unitario_concepto');
    }
  }

  async deletePrecioUnitarioConcepto(id: number): Promise<void> {
    try {
      await deletePrecioUnitarioConcepto(id);
    } catch (error) {
      console.error('Error deleting precio_unitario_concepto:', error);
      throw new Error('Error deleting precio_unitario_concepto');
    }
  }
   
  // Fetch concepts filtered by `precio_unitario_id`
  async fetchPrecioUnitarioConceptosByPrecioUnitarioId(precioUnitarioId: number): Promise<PrecioUnitarioConcepto[]> {
    try {
      const conceptos = await fetchPrecioUnitarioConceptosByPrecioUnitarioId(precioUnitarioId);
      return conceptos.map(concepto => ({
        id: concepto.id,
        created_at: concepto.created_at,
        cantidad: concepto.cantidad,
        total: concepto.total,
        precio_unitario_id: concepto.precio_unitario_id,
        concepto_id: concepto.concepto_id,
        unidad_id: concepto.unidad_id,
      }));
    } catch (error) {
      console.error('Error fetching precio_unitario_conceptos by precio_unitario_id:', error);
      throw new Error('Error fetching precio_unitario_conceptos');
    }
}
}