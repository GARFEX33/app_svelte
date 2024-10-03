import { writable, derived, get } from 'svelte/store'; // 'get' es necesario para obtener el valor directamente de una store
import type { PrecioUnitario } from '$lib/types/PrecioUnitario';
import { createPrecioUnitarioRepository } from '$lib/repositories/precios-unitarios/PrecioUnitarioRepositoryFactory';
import { precioUnitarioConceptos, eliminarPrecioUnitarioConcepto, loadPrecioUnitarioConceptos } from '$lib/stores/precioUnitarioConceptoStore';
import type { PrecioUnitarioConcepto } from '$lib/types/PrecioUnitarioConcepto';

// Crear la instancia del repositorio
const precioUnitarioRepository = createPrecioUnitarioRepository();

// Store para mantener la lista de precios unitarios
export const preciosUnitarios = writable<PrecioUnitario[]>([]);

// Store para el filtro de búsqueda
export const filtro = writable<string>('');

// Store derivado para los precios unitarios filtrados
export const preciosUnitariosFiltrados = derived(
  [preciosUnitarios, filtro],
  ([$preciosUnitarios, $filtro]) => {
    if (!$filtro || $filtro.trim() === '') {
      return $preciosUnitarios; // Si el filtro está vacío, se muestran todos los precios unitarios
    }

    // Filtramos en base a la descripción del precio unitario
    return $preciosUnitarios.filter(precio =>
      precio.descripcion.toLowerCase().includes($filtro.toLowerCase())
    );
  }
);

// Función para cargar todos los precios unitarios desde el repositorio
export async function loadPreciosUnitarios(): Promise<void> {
  try {
    const data = await precioUnitarioRepository.fetchPreciosUnitarios();
    preciosUnitarios.set(data);
  } catch (error) {
    console.error('Error al cargar precios unitarios:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para cargar un solo precio unitario por su ID
export async function loadPrecioUnitario(id: number): Promise<PrecioUnitario | null> {
  try {
    const data = get(preciosUnitarios); // Obtener los precios unitarios cargados previamente
    const precioUnitario = data.find(p => p.id === id);
    if (precioUnitario) {
      return precioUnitario;
    } else {
      console.error(`No se encontró el precio unitario con id ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al cargar el precio unitario con id ${id}:`, error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para agregar un nuevo precio unitario
export async function agregarPrecioUnitario(nuevoPrecioUnitario: PrecioUnitario): Promise<PrecioUnitario | null> {
  try {
    const precioAgregado = await precioUnitarioRepository.addPrecioUnitario(nuevoPrecioUnitario);
    if (precioAgregado) {
      preciosUnitarios.update(current => [...current, precioAgregado]);
      return precioAgregado; // Retornamos el precio agregado
    } else {
      console.error('Error: No se pudo agregar el precio unitario');
      return null; // Retornamos null si no se pudo agregar
    }
  } catch (error) {
    console.error('Error al agregar precio unitario en Store:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para actualizar un precio unitario existente
export async function actualizarPrecioUnitario(id: number, precioActualizado: Partial<PrecioUnitario>): Promise<void> {
  try {
    const precio = await precioUnitarioRepository.updatePrecioUnitario(id, precioActualizado);
    if (precio) {
      preciosUnitarios.update(current =>
        current.map(p => (p.id === id ? precio : p))  // Comparación entre `number` y `number`
      );
    }
  } catch (error) {
    console.error('Error al actualizar precio unitario:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

// Función para eliminar un precio unitario junto con sus conceptos relacionados
export async function eliminarPrecioUnitario(id: number): Promise<void> {
  try {
    // Cargar los conceptos relacionados a este precio unitario
    await loadPrecioUnitarioConceptos(id);

    // Obtener los conceptos relacionados directamente
    const conceptosRelacionados: PrecioUnitarioConcepto[] = get(precioUnitarioConceptos).filter(c => c.precio_unitario_id === id);

    // Eliminar todos los conceptos relacionados antes de eliminar el precio unitario
    for (const concepto of conceptosRelacionados) {
      await eliminarPrecioUnitarioConcepto(concepto.id ?? 0); // Asegurarse de que el ID esté definido
    }

    // Después de eliminar los conceptos, eliminamos el precio unitario
    await precioUnitarioRepository.deletePrecioUnitario(id);

    // Actualizar el store después de la eliminación
    preciosUnitarios.update(current => current.filter(precio => precio.id !== id));

  } catch (error) {
    console.error('Error al eliminar precio unitario o conceptos relacionados:', error);
    throw error;
  }
}
