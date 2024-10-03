import { writable, derived, get } from 'svelte/store';
import { conceptos, loadConceptos, agregarConcepto, actualizarConcepto, eliminarConcepto } from '$lib/stores/conceptoStore';
import { fetchTipos } from '$lib/services/TipoService';
import { fetchUnidades } from '$lib/services/UnidadService';
import type { Concepto } from '$lib/types/Concepto';
import type { TipoSupabase } from '$lib/types/Tipo';
import type { UnidadSupabase } from '$lib/types/Unidad';

// Stores para los campos del formulario
export const nuevoCodigo = writable('');
export const nuevoNombre = writable('');
export const nuevoTipoId = writable<number | null>(null);
export const nuevaUnidadId = writable<number | null>(null);
export const nuevoCosto = writable<number | null>(null);
export const editandoConcepto = writable<Concepto | null>(null);
export const mostrarModal = writable(false);
export const filtro = writable('');
export const mensajeError = writable('');



// Stores para tipos y unidades
export const tipos = writable<TipoSupabase[]>([]);
export const unidades = writable<UnidadSupabase[]>([]);

// Validación del formulario
export const formularioValido = derived(
  [nuevoCodigo, nuevoNombre, nuevoTipoId, nuevaUnidadId, nuevoCosto],
  ([$nuevoCodigo, $nuevoNombre, $nuevoTipoId, $nuevaUnidadId, $nuevoCosto]) => {
    const esCodigoValido = $nuevoCodigo.trim() !== '';
    const esNombreValido = $nuevoNombre.trim() !== '';
    const esTipoValido = $nuevoTipoId !== null && $nuevoTipoId > 0;
    const esUnidadValida = $nuevaUnidadId !== null && $nuevaUnidadId > 0;
    const esCostoValido = $nuevoCosto !== null && $nuevoCosto > 0;
    return esCodigoValido && esNombreValido && esTipoValido && esUnidadValida && esCostoValido;
  }
);

// Lista filtrada de conceptos
export const conceptosFiltrados = derived([conceptos, filtro], ([$conceptos, $filtro]) =>
  $conceptos.filter(concepto =>
    concepto.nombre.toLowerCase().includes($filtro.toLowerCase())
  )
);

// Cargar datos iniciales (conceptos, tipos y unidades)
export async function cargarDatosIniciales() {
  await loadConceptos();
  tipos.set(await fetchTipos());
  unidades.set(await fetchUnidades());
}

// Iniciar la edición de un concepto
export function iniciarEdicion(concepto: Concepto) {
  abrirModal();
  editandoConcepto.set(concepto);
  nuevoCodigo.set(concepto.id.toLocaleUpperCase());
  nuevoNombre.set(concepto.nombre.toLocaleUpperCase());
  nuevoTipoId.set(concepto.tipo_id);
  nuevaUnidadId.set(concepto.unidad_id);
  nuevoCosto.set(concepto.costo);
  
}

// Agregar un nuevo concepto
export async function handleAgregarConcepto() {
  const conceptoNuevo: Concepto = {
    id: get(nuevoCodigo).toLocaleUpperCase().trim(),
    nombre: get(nuevoNombre).toLocaleUpperCase().trim(),
    tipo_id: get(nuevoTipoId) ?? 0,
    unidad_id: get(nuevaUnidadId) ?? 0,
    costo: get(nuevoCosto) ?? 0
  };

  if (!get(formularioValido)) {
    mensajeError.set('Todos los campos son obligatorios.');
    return;
  }

  try {
    await agregarConcepto(conceptoNuevo);
    cerrarModal();
  } catch (error) {
    mensajeError.set('Error al agregar concepto.');
    console.error('Error al agregar:', error);
  }
}

// Actualizar un concepto existente
export async function handleActualizarConcepto() {
  const conceptoActual = get(editandoConcepto);

  if (!conceptoActual) {
    mensajeError.set('No hay concepto seleccionado para editar.');
    return;
  }

  try {
    await actualizarConcepto(conceptoActual.id, {
      tipo_id: get(nuevoTipoId) ?? undefined,
      nombre: get(nuevoNombre).toLocaleUpperCase().trim(),
      unidad_id: get(nuevaUnidadId) ?? undefined,
      costo: get(nuevoCosto) ?? undefined,
    });
    cerrarModal();
  } catch (error) {
    mensajeError.set('Error al actualizar concepto.');
    console.error('Error al actualizar:', error);
  }
}

// Eliminar un concepto
export async function handleEliminarConcepto(id: string) {
  try {
    await eliminarConcepto(id);
  } catch (error) {
    mensajeError.set('Error al eliminar concepto.');
    console.error('Error al eliminar:', error);
  }
}

// Abrir el modal de agregar/editar concepto
export function abrirModal() {
  nuevoCodigo.set('');
  nuevoNombre.set('');
  nuevoTipoId.set(null);
  nuevaUnidadId.set(null);
  nuevoCosto.set(null);
  mensajeError.set('');
  mostrarModal.set(true);
}

// Cerrar el modal
export async function cerrarModal() {
  nuevoCodigo.set('');
  nuevoNombre.set('');
  nuevoTipoId.set(null);
  nuevaUnidadId.set(null);
  nuevoCosto.set(null);
  editandoConcepto.set(null);
  mensajeError.set('');
  mostrarModal.set(false);  

}
