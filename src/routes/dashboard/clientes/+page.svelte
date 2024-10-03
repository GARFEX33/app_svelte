<script lang="ts">
  import { onMount } from 'svelte';
  import TablaClientes from './componentes/ClientesTabla.svelte';
  import {
    nuevoNombre,
    nuevaRazonSocial,
    mostrarModal,
    filtro,
    clientesFiltrados,
    formularioValido,
    mensajeError,
    cargarClientes,
    iniciarEdicion,
    handleAgregarCliente,
    handleActualizarCliente,
    handleEliminarCliente,
    abrirModal,
    cerrarModal,
    editandoCliente
  } from '$lib/logic/clientes/clientesLogic';

  // Cargar los clientes al montar el componente
  onMount(cargarClientes);
</script>

<!-- Botón para abrir el modal -->
<div class="mb-4 flex justify-between items-center">
  <button on:click={abrirModal} class="btn btn-primary">Agregar Cliente</button>

  <!-- Buscador -->
  <input
    type="text"
    placeholder="Buscar Cliente o Razón Social"
    bind:value={$filtro}
    class="input input-bordered w-1/3"
  />
</div>

<!-- Modal para agregar o editar cliente -->
{#if $mostrarModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow-lg z-50">
      <h2 class="text-xl font-bold mb-4">{$editandoCliente ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>

      <!-- Mostrar mensaje de error si existe -->
      {#if $mensajeError}
        <div role="alert" class="text-sm text-red-600 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0 stroke-current mr-1"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{$mensajeError}</span>
        </div>
      {/if}

      <div class="mb-4">
        <label for="nuevoNombre" class="block text-sm font-normal text-gray-700">Nombre del Cliente</label>
        <input id="nuevoNombre" type="text" bind:value={$nuevoNombre} class="input input-bordered w-full" />
      </div>

      <div class="mb-4">
        <label for="nuevaRazonSocial" class="block text-sm font-medium text-gray-700">Razón Social</label>
        <input id="nuevaRazonSocial" type="text" bind:value={$nuevaRazonSocial} class="input input-bordered w-full" />
      </div>

      <div class="flex justify-end">
        {#if $editandoCliente}
          <button on:click={handleActualizarCliente} class="btn btn-primary mr-2" disabled={!$formularioValido}>Guardar</button>
        {:else}
          <button on:click={handleAgregarCliente} class="btn btn-primary mr-2" disabled={!$formularioValido}>Agregar</button>
        {/if}
        <button on:click={cerrarModal} class="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  </div>
{/if}

<!-- Tabla de clientes -->
<TablaClientes 
  clientesFiltrados={$clientesFiltrados}
  iniciarEdicion={iniciarEdicion}
  handleEliminarCliente={handleEliminarCliente}
/>
