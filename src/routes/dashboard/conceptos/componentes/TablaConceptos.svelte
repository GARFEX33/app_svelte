<script lang="ts">
    export let conceptosFiltrados: any[] = [];
  
    export let iniciarEdicion: (concepto: any) => void;
    export let handleEliminarConcepto: (id: string) => void;
  </script>
  
  <div class="overflow-x-auto mt-4">
    <table class="table table-xs w-full text-center mx-auto">
      <thead>
        <tr>
          <th >Código</th>
          <th >Nombre</th>
          <th>Tipo</th>
          <th>Unidad</th>
          <th>Costo</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody >
        {#each conceptosFiltrados as concepto (concepto.id)}
          <tr >
            <td>

                {concepto.id}
        
            </td>
            <td>

                {concepto.nombre}
       
            </td>
            <td >

                {concepto.tipo_id}

            </td>
            <td >

                {concepto.unidad_id}
 
            </td>
            <td >

                {concepto.costo}

            </td>
            <td >

                <button on:click={() => iniciarEdicion(concepto)} class="btn btn-warning btn-xs">Editar</button>
                <button on:click={() => handleEliminarConcepto(concepto.id)} class="btn btn-danger btn-xs">Eliminar</button>
 
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  