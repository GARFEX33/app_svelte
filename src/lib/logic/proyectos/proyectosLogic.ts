import { writable, derived } from 'svelte/store';
import { proyectos, loadProyectos, deleteProyecto } from '$lib/stores/proyectoStore';
import { goto } from '$app/navigation';
import type { Concepto } from '$lib/types/Concepto';

// Store para el filtro de búsqueda
export const filtro = writable<string>(''); 

// Store derivada para los proyectos filtrados
export const proyectosFiltrados = derived(
  [proyectos, filtro],
  ([$proyectos, $filtro]) => {
    // Si no hay filtro, retornamos todos los proyectos
    if (!$filtro.trim()) {
      return $proyectos;
    }

    // Aplicar el filtro en base al nombre del proyecto
    const filtroActual = $filtro.toLowerCase();
    return $proyectos.filter(proyecto =>
      proyecto.nombre.toLowerCase().includes(filtroActual)
    );
  }
);

// Función para cargar los proyectos y aplicar el filtro
export async function cargarProyectos(): Promise<void> {
  try {
    await loadProyectos();  // Cargar los proyectos desde el repositorio
    // El store derivado se encargará de aplicar el filtro automáticamente
  } catch (error) {
    console.error('Error al cargar los proyectos:', error);
  }
}

// Función para eliminar un proyecto
export async function eliminarProyecto(id: number): Promise<void> {
  try {
    await deleteProyecto(id);
    // El store derivado se actualizará automáticamente cuando `proyectos` cambie
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
  }
}

export function iniciarEdicion(concepto: Concepto): void {
  goto(`/dashboard/proyectos/${concepto.id}`);
}