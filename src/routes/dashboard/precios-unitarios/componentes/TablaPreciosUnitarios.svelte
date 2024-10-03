<script lang="ts">
  import { goto } from '$app/navigation'; // Para manejar la redirección

  import type { PrecioUnitario } from '$lib/types/PrecioUnitario';

  // Props
  export let preciosUnitariosFiltrados: PrecioUnitario[] = []; // Lista filtrada de precios unitarios
  export let handleEliminarPrecioUnitario: (id: number) => void; // Función para eliminar un precio unitario

  // Función para redirigir a la página de edición con el ID del precio unitario
  function redirigirAEdicion(id: number) {
    goto(`/dashboard/precios-unitarios/${id}`); // Redirige a la página de edición
  }
</script>

<div class="overflow-x-auto">
  <table class="table table-xs w-full text-center mx-auto">
    <thead>
      <tr>
        <th>Descripción</th>
        <th>Unidad</th>
        <th>Costo Unitario Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each preciosUnitariosFiltrados as precio (precio.id)}
        <tr>
          <td>{precio.descripcion}</td>
          <td>{precio.unidad_id}</td>
          <td>{precio.costo_unitario_total}</td>
          <td>
            <button on:click={() => precio.id !== undefined && redirigirAEdicion(precio.id)} class="btn btn-warning btn-xs">Editar</button>
            <button on:click={() => precio.id !== undefined && handleEliminarPrecioUnitario(precio.id)} class="btn btn-danger btn-xs">Eliminar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
