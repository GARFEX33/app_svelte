import { writable, derived, get } from 'svelte/store';
import { clientes, loadClientes, agregarCliente, actualizarCliente, eliminarCliente } from '$lib/stores/clienteStore';
import type { Cliente } from '$lib/types/Cliente';

export const nuevoNombre = writable('');
export const nuevaRazonSocial = writable('');
export const editandoCliente = writable<Cliente | null>(null);
export const mostrarModal = writable(false);
export const filtro = writable('');
export const mensajeError = writable('');

// Valida si el formulario tiene los campos necesarios
export const formularioValido = derived(
  [nuevoNombre, nuevaRazonSocial],
  ([$nuevoNombre, $nuevaRazonSocial]) => $nuevoNombre.trim() !== '' && $nuevaRazonSocial.trim() !== ''
);

// Derivar la lista filtrada de clientes
export const clientesFiltrados = derived([clientes, filtro], ([$clientes, $filtro]) =>
  $clientes.filter(cliente =>
    cliente.cliente.toLowerCase().includes($filtro.toLowerCase()) ||
    cliente.razonsocial.toLowerCase().includes($filtro.toLowerCase())
  )
);

export async function cargarClientes() {
  await loadClientes();
}

export function iniciarEdicion(cliente: Cliente) {
  // Asignar valores del cliente a los stores para edición
  editandoCliente.set(cliente);
  nuevoNombre.set(cliente.cliente);
  nuevaRazonSocial.set(cliente.razonsocial);
  abrirModal();
}

export async function handleAgregarCliente() {
  const clienteNuevo: Cliente = {
    id: 0,
    cliente: get(nuevoNombre).trim(),
    razonsocial: get(nuevaRazonSocial).trim()
  };

  if (!clienteNuevo.cliente || !clienteNuevo.razonsocial) {
    mensajeError.set('Todos los campos son obligatorios.');
    return;
  }

  try {
    await agregarCliente(clienteNuevo);
    cerrarModal();
  } catch (error) {
    mensajeError.set('Error al agregar cliente.');
    console.error('Error al agregar:', error);
  }
}

export async function handleActualizarCliente() {
  const clienteActual = get(editandoCliente);

  if (!clienteActual) {
    mensajeError.set('No hay cliente seleccionado para editar.');
    return;
  }

  try {
    await actualizarCliente(clienteActual.id, {
      cliente: get(nuevoNombre).trim(),
      razonsocial: get(nuevaRazonSocial).trim()
    });
    cerrarModal();
  } catch (error) {
    mensajeError.set('Error al actualizar cliente.');
    console.error('Error al actualizar:', error);
  }
}

export async function handleEliminarCliente(id: number) {
  try {
    await eliminarCliente(id);
  } catch (error) {
    mensajeError.set('Error al eliminar cliente.');
    console.error('Error al eliminar:', error);
  }
}

export function abrirModal() {
  nuevoNombre.set('');
  nuevaRazonSocial.set('');
  mensajeError.set('');
  mostrarModal.set(true);
}

export function cerrarModal() {
  nuevoNombre.set('');
  nuevaRazonSocial.set('');
  editandoCliente.set(null);
  mensajeError.set('');
  mostrarModal.set(false);
}
