// src/lib/stores/proyectoStore.ts
import { get, writable } from 'svelte/store';
import type { Proyecto } from '$lib/types/Proyecto';
import { createProyectosRepository } from '$lib/repositories/proyectos/ProyectosRepositoryFactory';

const proyectosRepository = createProyectosRepository();

export const proyectos = writable<Proyecto[]>([]);

export async function loadProyectos(): Promise<Proyecto[]> {
  try {
    const fetchedProyectos = await proyectosRepository.fetchProyectos();
    proyectos.set(fetchedProyectos);
    return fetchedProyectos;
  } catch (error) {
    console.error('Error loading proyectos:', error);
    return [];
  }
}

export async function addProyecto(proyecto: Proyecto): Promise<void> {
  try {
    const addedProyecto = await proyectosRepository.addProyecto(proyecto);
    if (addedProyecto) {
      proyectos.update(current => [...current, addedProyecto]);
    }
  } catch (error) {
    console.error('Error adding proyecto:', error);
  }
}

export async function updateProyecto(id: number, proyectoActualizado: Partial<Proyecto>): Promise<void> {
  try {
    console.log('updateProyecto', id);
    const updatedProyecto = await proyectosRepository.updateProyecto(id, proyectoActualizado);
    if (updatedProyecto) {
      proyectos.update(current =>
        current.map(proyecto => (proyecto.id === id ? updatedProyecto : proyecto))
      );
    }
  } catch (error) {
    console.error('Error updating proyecto:', error);
  }
}

export async function deleteProyecto(id: number): Promise<void> {
  try {
    await proyectosRepository.deleteProyecto(id);
    proyectos.update(current => current.filter(proyecto => proyecto.id !== id));
  } catch (error) {
    console.error('Error deleting proyecto:', error);
  }
}

// Función para cargar un solo precio unitario por su ID
export async function loadProyectoById(id: number): Promise<Proyecto | null> {
  try {
    const data = get(proyectos); // Obtener los precios unitarios cargados previamente
    const proy = data.find(p => p.id === id);
    if (proy) {
      return proy;
    } else {
      console.error(`No se encontró el precio unitario con id ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al cargar el precio unitario con id ${id}:`, error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}
