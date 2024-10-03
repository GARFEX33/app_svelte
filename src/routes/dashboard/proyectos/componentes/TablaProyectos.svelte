<script lang="ts">
	import type { Proyecto } from "$lib/types/Proyecto";

	

  export let proyectosFiltrados: Proyecto[] = [];

  export let iniciarEdicion: (id: any) => void;
  export let handleEliminarProyecto: (id: number) => void;
  
</script>

<div class="overflow-x-auto mt-4">
  <table class="table table-xs w-full text-center mx-auto">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Cliente</th>
        <th>Fecha de Inicio</th>
        <th>Fecha de Fin</th>
        <th>Estado</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each proyectosFiltrados as proyecto (proyecto.id)}
        <tr>
          <td>
            {proyecto.nombre}
          </td>
          <td>
            {proyecto.cliente_id}
          </td>
          <td>
            {proyecto.fecha_inicio}
          </td>
          <td>
            {proyecto.fecha_fin}
          </td>
          <td>
            {proyecto.estado}
          </td>
          <td>
            {proyecto.descripcion}
          </td>
          <td>
            <button on:click={() => iniciarEdicion(proyecto)} class="btn btn-warning btn-xs">Editar</button>
            <button on:click={() => proyecto.id !== undefined && handleEliminarProyecto(proyecto.id)} class="btn btn-danger btn-xs">Eliminar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
