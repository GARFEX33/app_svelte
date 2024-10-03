// src/lib/stores/unidadStore.ts
import { writable } from 'svelte/store';
import type { Unidad } from '$lib/types/Unidad';
import { createUnidadRepository } from '$lib/repositories/unidades/UnidadRepositoryFactory';

// Crear la instancia del repositorio
const unidadRepository = createUnidadRepository();

// Store para mantener la lista de unidades
export const unidades = writable<Unidad[]>([]);

// Función para cargar unidades desde el repositorio
export async function loadUnidades(): Promise<Unidad[]> { // Asegúrate de que devuelva Unidad[]
  try {
    const data = await unidadRepository.fetchUnidades();
    unidades.set(data);
    return data;  // Devuelve las unidades correctamente
  } catch (error) {
    console.error('Error al cargar unidades:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}
// Función para agregar una nueva unidad
export async function agregarUnidad(nuevaUnidad: Omit<Unidad, 'id'>): Promise<void> {
  try {
    const unidadAgregada = await unidadRepository.addUnidad(nuevaUnidad);
    if (unidadAgregada) {
      unidades.update(current => [...current, unidadAgregada]);
    } else {
      console.error('Error: No se pudo agregar la unidad');
    }
  } catch (error) {
    console.error('Error al agregar unidad en Store:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para actualizar una unidad existente
export async function actualizarUnidad(id: number, unidadActualizada: Partial<Unidad>): Promise<void> {
  try {
    const unidad = await unidadRepository.updateUnidad(id, unidadActualizada);
    if (unidad) {
      unidades.update(current =>
        current.map(u => (u.id === id ? unidad : u))  // Comparación entre `number` y `number`
      );
    }
  } catch (error) {
    console.error('Error al actualizar unidad:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para eliminar una unidad
export async function eliminarUnidad(id: number): Promise<void> {
  try {
    await unidadRepository.deleteUnidad(id);
    unidades.update(current => current.filter(unidad => unidad.id !== id));  // Comparación entre `number` y `number`
  } catch (error) {
    console.error('Error al eliminar unidad:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}
