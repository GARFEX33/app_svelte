<script lang="ts">
  import { onMount } from 'svelte';
  import { clientes, loadClientes, agregarCliente, actualizarCliente, eliminarCliente } from '$lib/stores/clienteStore';
  import type { Cliente } from '$lib/types';

  let nuevoCliente: string = '';
  let nuevaRazonSocial: string = '';
  let editandoCliente: Cliente | null = null;
  let mostrarModal = false;
  let filtro = '';

  // Declarar como reactivo para que se actualice al cambiar `filtro` o `clientes`
  $: clientesFiltrados = $clientes.filter(cliente =>
    cliente.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.razonsocial.toLowerCase().includes(filtro.toLowerCase())
  );

  onMount(() => {
    loadClientes();
  });

  function iniciarEdicion(cliente: Cliente) {
    editandoCliente = { ...cliente };
    nuevoCliente = cliente.cliente;
    nuevaRazonSocial = cliente.razonsocial;
  }

  async function handleActualizarCliente() {
    if (editandoCliente) {
      await actualizarCliente(editandoCliente.id, {
        cliente: nuevoCliente,
        razonsocial: nuevaRazonSocial,
      });
      editandoCliente = null;
    }

  }

  async function handleEliminarCliente(id: number) {
    await eliminarCliente(id);
  }

  async function handleAgregarCliente() {
    console.log('Agregando cliente', nuevoCliente, nuevaRazonSocial);
    await agregarCliente({ cliente: nuevoCliente, razonsocial: nuevaRazonSocial });
    nuevoCliente = '';
    nuevaRazonSocial = '';
    mostrarModal = false; // Cierra el modal después de agregar
  }

  function abrirModal() {
  // Limpiar los valores antes de abrir el modal
  nuevoCliente = '';
  nuevaRazonSocial = '';
  mostrarModal = true;
}

  function cerrarModal() {
  nuevoCliente = '';  // Limpiar el campo de "Cliente"
  nuevaRazonSocial = '';  // Limpiar el campo de "Razón Social"
  mostrarModal = false;  // Cierra el modal
}

</script>


<!-- Botón para abrir el modal -->
<div class="mb-4 flex justify-between items-center">
  <button on:click={abrirModal} class="btn btn-primary">Agregar Cliente</button>

  <!-- Buscador -->
  <input
    type="text"
    placeholder="Buscar Cliente o Razón Social"
    bind:value={filtro}
    class="input input-bordered w-1/3"
  />
</div>

<!-- Modal para agregar cliente -->
{#if mostrarModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
      <div class="mb-4">
        <label for="nuevoCliente" class="block text-sm font-medium text-gray-700">Cliente</label>
        <input id="nuevoCliente" type="text" bind:value={nuevoCliente} class="input input-bordered w-full" />
      </div>
      <div class="mb-4">
        <label for="nuevaRazonSocial" class="block text-sm font-medium text-gray-700">Razón Social</label>
        <input id="nuevaRazonSocial" type="text" bind:value={nuevaRazonSocial} class="input input-bordered w-full" />
      </div>
      <div class="flex justify-end">
        <button on:click={handleAgregarCliente} class="btn btn-primary mr-2">Agregar</button>
        <button on:click={cerrarModal} class="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  </div>
{/if}

<!-- Tabla de clientes -->
<div class="overflow-x-auto mt-4">
  <table class="table-auto w-full bg-white shadow-md rounded my-6">
    <thead>
      <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th class="py-3 px-6 text-left">Cliente</th>
        <th class="py-3 px-6 text-left">Razón Social</th>
        <th class="py-3 px-6 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody class="text-gray-600 text-sm font-light">
      {#each clientesFiltrados as cliente (cliente.id)}
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left whitespace-nowrap">
            {#if editandoCliente && editandoCliente.id === cliente.id}
              <input type="text" bind:value={nuevoCliente} class="input input-bordered w-full" />
            {:else}
              {cliente.cliente}
            {/if}
          </td>
          <td class="py-3 px-6 text-left">
            {#if editandoCliente && editandoCliente.id === cliente.id}
              <input type="text" bind:value={nuevaRazonSocial} class="input input-bordered w-full" />
            {:else}
              {cliente.razonsocial}
            {/if}
          </td>
          <td class="py-3 px-6 text-center">
            {#if editandoCliente && editandoCliente.id === cliente.id}
              <button on:click={handleActualizarCliente} class="btn btn-primary btn-sm">Guardar</button>
              <button on:click={() => editandoCliente = null} class="btn btn-secondary btn-sm">Cancelar</button>
            {:else}
              <button on:click={() => iniciarEdicion(cliente)} class="btn btn-warning btn-sm">Editar</button>
              <button on:click={() => handleEliminarCliente(cliente.id)} class="btn btn-danger btn-sm">Eliminar</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
