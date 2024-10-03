import { addConcepto, deleteConcepto, fetchConceptos, updateConcepto } from '$lib/services/ConceptoService';
import type { Concepto, ConceptoSupabase } from '$lib/types/Concepto';
import type { ConceptoRepository } from './ConceptoRepository';

export class SupabaseConceptoRepository implements ConceptoRepository {
  async fetchConceptos(): Promise<Concepto[]> {
    try {
      const conceptos = await fetchConceptos();
      return conceptos.map(concepto => ({
        id: concepto.id,
        nombre: concepto.nombre,
        tipo_id: concepto.tipo_id,
        unidad_id: concepto.unidad_id,
        costo: concepto.costo,
      }));
    } catch (error) {
      console.error('Error fetching conceptos:', error);
      throw new Error('Error fetching conceptos'); // Lanzamos el error para que el store lo maneje
    }
  }

  async addConcepto(nuevoConcepto: Concepto): Promise<Concepto | null> {
    const conceptoParaInsertar: Omit<ConceptoSupabase, 'created_at'> = {
      id: nuevoConcepto.id,
      nombre: nuevoConcepto.nombre,
      tipo_id: nuevoConcepto.tipo_id,
      unidad_id: nuevoConcepto.unidad_id,
      costo: nuevoConcepto.costo,
    };

    try {
      const conceptoAgregado = await addConcepto(conceptoParaInsertar);
      return conceptoAgregado
        ? {
            id: conceptoAgregado.id,
            nombre: conceptoAgregado.nombre,
            tipo_id: conceptoAgregado.tipo_id,
            unidad_id: conceptoAgregado.unidad_id,
            costo: conceptoAgregado.costo,
          }
        : null;
    } catch (error) {
      console.error('Error adding concepto:', error);
      throw new Error('Codigo duplicado'); // Lanzamos el error para que el store lo maneje
    }
  }

  async updateConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<Concepto | null> {
    const conceptoParaActualizar: Partial<ConceptoSupabase> = {
      nombre: conceptoActualizado.nombre,
      tipo_id: conceptoActualizado.tipo_id,
      unidad_id: conceptoActualizado.unidad_id,
      costo: conceptoActualizado.costo,
    };

    try {
      const conceptoActualizadoDb = await updateConcepto(id, conceptoParaActualizar);
      return conceptoActualizadoDb
        ? {
            id: conceptoActualizadoDb.id,
            nombre: conceptoActualizadoDb.nombre,
            tipo_id: conceptoActualizadoDb.tipo_id,
            unidad_id: conceptoActualizadoDb.unidad_id,
            costo: conceptoActualizadoDb.costo,
          }
        : null;
    } catch (error) {
      console.error('Error updating concepto:', error);
      throw new Error('Error updating concepto'); // Lanzamos el error para que el store lo maneje
    }
  }

  async deleteConcepto(id: string): Promise<void> {
    try {
      await deleteConcepto(id);
    } catch (error) {
      console.error('Error deleting concepto:', error);
      throw new Error('Error deleting concepto'); // Lanzamos el error para que el store lo maneje
    }
  }
}
