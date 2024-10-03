// src/lib/stores/conceptoStore.ts
import type { Concepto } from '$lib/types/Concepto';
import { createConceptoRepository } from '$lib/repositories/conceptos/ConceptoRepositoryFactory';
import { writable } from 'svelte/store';

// Crea la instancia del repositorio
const conceptoRepository = createConceptoRepository();

// Store para mantener la lista de conceptos
export const conceptos = writable<Concepto[]>([]);


export async function loadConceptos(): Promise<Concepto[]> {
  try {
    const data = await conceptoRepository.fetchConceptos();
    conceptos.set(data); // Actualiza el store
    return data; // Retorna los conceptos
  } catch (error) {
    console.error('Error al cargar conceptos:', error);
    throw error;
  }
}

export async function agregarConcepto(nuevoConcepto: Concepto): Promise<void> {
  try {
    const conceptoAgregado = await conceptoRepository.addConcepto(nuevoConcepto);
   
    if (conceptoAgregado) {
      conceptos.update(current => [...current, conceptoAgregado]);
    } else {
      console.error('Error: No se pudo agregar el concepto');
    }
  } catch (error) {
    console.error('Error al agregar concepto Store:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

export async function actualizarConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<void> {
  try {
    const concepto = await conceptoRepository.updateConcepto(id, conceptoActualizado);
    if (concepto) {
      conceptos.update(current =>
        current.map(c => (c.id === id ? concepto : c))
      );
    }
  } catch (error) {
    console.error('Error al actualizar concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

export async function eliminarConcepto(id: string): Promise<void> {
  try {
    await conceptoRepository.deleteConcepto(id);
    conceptos.update(current => current.filter(concepto => concepto.id !== id));
  } catch (error) {
    console.error('Error al eliminar concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}
