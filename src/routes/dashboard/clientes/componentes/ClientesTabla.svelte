<script lang="ts">
  import type { Cliente } from "$lib/types/Cliente";

  export let clientesFiltrados: Cliente[] = [];
  export let iniciarEdicion: (cliente: Cliente) => void;
  export let handleEliminarCliente: (id: number) => void;

  function actualizarCliente(cliente: Cliente) {
    iniciarEdicion(cliente);
  }
</script>

<div class="overflow-x-auto mt-4">
  <table class="table table-xs w-full text-center mx-auto">
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Razón Social</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each clientesFiltrados as cliente (cliente.id)}
        <tr>
          <td>{cliente.cliente}</td>
          <td>{cliente.razonsocial}</td>
          <td>
            <button on:click={() => actualizarCliente(cliente)} class="btn btn-warning btn-xs">Editar</button>
            <button on:click={() => handleEliminarCliente(cliente.id)} class="btn btn-danger btn-xs">Eliminar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
