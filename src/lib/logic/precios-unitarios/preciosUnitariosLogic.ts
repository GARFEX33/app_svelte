import { writable, derived } from 'svelte/store';
import { preciosUnitarios, loadPreciosUnitarios, eliminarPrecioUnitario } from '$lib/stores/precioUnitarioStore';

// Store para el filtro de búsqueda
export const filtro = writable<string>(''); 

// Store derivada para los precios unitarios filtrados
export const preciosUnitariosFiltrados = derived(
  [preciosUnitarios, filtro],
  ([$preciosUnitarios, $filtro]) => {
    // Si no hay filtro, retornamos todos los precios
    if (!$filtro.trim()) {
      return $preciosUnitarios;
    }

    // Aplicar el filtro en base a la descripción del precio unitario
    const filtroActual = $filtro.toLowerCase();
    return $preciosUnitarios.filter(precio =>
      precio.descripcion.toLowerCase().includes(filtroActual)
    );
  }
);

// Función para cargar los precios unitarios y aplicar el filtro
export async function cargarPreciosUnitarios(): Promise<void> {
  try {
    await loadPreciosUnitarios();  // Cargar los precios unitarios desde el repositorio
    // No es necesario aplicar manualmente el filtro, ya que el `derived` lo hace automáticamente
  } catch (error) {
    console.error('Error al cargar los precios unitarios:', error);
  }
}

// Función para eliminar un precio unitario
export async function eliminarPrecio(id: number): Promise<void> {
  try {
    await eliminarPrecioUnitario(id);
    // El store derivado se actualizará automáticamente cuando `preciosUnitarios` cambie
  } catch (error) {
    console.error('Error al eliminar el precio unitario:', error);
  }
}
