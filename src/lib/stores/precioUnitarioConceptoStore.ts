// src/lib/stores/precioUnitarioConceptoStore.ts
import { writable } from 'svelte/store';
import { createPrecioUnitarioConceptoRepository } from '$lib/repositories/precios-unitarios-conceptos/PrecioUnitarioConceptoRepositoryFactory';
import type { PrecioUnitarioConcepto } from '$lib/types/PrecioUnitarioConcepto';

// Crear la instancia del repositorio
const precioUnitarioConceptoRepository = createPrecioUnitarioConceptoRepository();

// Store para mantener la lista de conceptos asociados a precios unitarios
export const precioUnitarioConceptos = writable<PrecioUnitarioConcepto[]>([]);

// src/lib/stores/precioUnitarioConceptoStore.ts
export async function loadPrecioUnitarioConceptos(precioUnitarioId: number): Promise<PrecioUnitarioConcepto[]> {
  try {
    const data = await precioUnitarioConceptoRepository.fetchPrecioUnitarioConceptosByPrecioUnitarioId(precioUnitarioId);
    precioUnitarioConceptos.set(data);
    return data; // Asegúrate de retornar los datos
  } catch (error) {
    console.error('Error al cargar precio_unitario_conceptos:', error);
    throw error;
  }
}


// Función para agregar un nuevo precio_unitario_concepto
export async function agregarPrecioUnitarioConcepto(nuevoPrecioUnitarioConcepto: PrecioUnitarioConcepto): Promise<void> {
  try {
    const conceptoAgregado = await precioUnitarioConceptoRepository.addPrecioUnitarioConcepto(nuevoPrecioUnitarioConcepto);
    if (conceptoAgregado) {
      precioUnitarioConceptos.update(current => [...current, conceptoAgregado]);
    } else {
      console.error('Error: No se pudo agregar el precio_unitario_concepto');
    }
  } catch (error) {
    console.error('Error al agregar precio unitario concepto en Store:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para actualizar un precio_unitario_concepto existente
export async function actualizarPrecioUnitarioConcepto(id: number, conceptoActualizado: Partial<PrecioUnitarioConcepto>): Promise<void> {
  try {
    const concepto = await precioUnitarioConceptoRepository.updatePrecioUnitarioConcepto(id, conceptoActualizado);
    if (concepto) {
      precioUnitarioConceptos.update(current =>
        current.map(c => (c.id === id ? concepto : c))
      );
    }
  } catch (error) {
    console.error('Error al actualizar precio unitario concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para eliminar un precio_unitario_concepto
export async function eliminarPrecioUnitarioConcepto(id: number): Promise<void> {
  try {
    await precioUnitarioConceptoRepository.deletePrecioUnitarioConcepto(id);
    // Actualizar el store después de eliminar el concepto
    precioUnitarioConceptos.update(current => current.filter(concepto => concepto.id !== id));
  } catch (error) {
    console.error('Error al eliminar precio unitario concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}
