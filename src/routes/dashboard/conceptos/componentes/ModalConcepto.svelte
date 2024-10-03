<script lang="ts">

  export let nuevoCodigo: string = ''; 
  export let nuevoNombre: string = '';
  export let nuevoTipoId: number | null = null;
  export let nuevaUnidadId: number | null = null;
  export let nuevoCosto: number | null = null;
  export let tipos: { id: number, tipo: string }[] = [];
  export let unidades: { id: number, unidad: string }[] = [];
  export let editandoConcepto: boolean = false;
  export let formularioValido: boolean = false; 
  export let mensajeError: string = '';

  export let handleGuardar: () => void;
  export let handleCancelar: () => void;

</script>


<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
  <div class="bg-white p-6 rounded shadow-lg z-50">
    <h2 class="text-xl font-bold mb-4">{editandoConcepto ? 'Editar Concepto' : 'Agregar Nuevo Concepto'}</h2>
  
    <!-- Mostrar mensaje de error si existe -->
    {#if mensajeError}
      <div role="alert" class="text-sm text-red-600 mb-2 flex items-center">
        <span>{mensajeError}</span>
      </div>
    {/if}

    <!-- Campo para ingresar el Código -->
    <div class="mb-4">
      <label for="nuevoCodigo" class="block text-sm font-medium text-gray-700">Código</label>
      <input 
        id="nuevoCodigo" 
        type="text" 
        bind:value={nuevoCodigo}
        class="input input-bordered w-full" 
        disabled={editandoConcepto} 
      />
    </div>

    <!-- Campo para ingresar el Nombre -->
    <div class="mb-4">
      <label for="nuevoNombre" class="block text-sm font-medium text-gray-700">Nombre</label>
      <input 
        id="nuevoNombre" 
        type="text" 
        bind:value={nuevoNombre}
  
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Dropdown de tipos con nombres -->
    <div class="mb-4">
      <label for="nuevoTipoId" class="block text-sm font-medium text-gray-700">Tipo</label>
      <select id="nuevoTipoId" bind:value={nuevoTipoId}  class="select select-bordered w-full">
        <option value="" disabled selected>Selecciona un tipo</option>
        {#each tipos as tipo}
          <option value={tipo.id}>{tipo.tipo}</option>
        {/each}
      </select>
    </div>

    <!-- Dropdown de unidades con nombres -->
    <div class="mb-4">
      <label for="nuevaUnidadId" class="block text-sm font-medium text-gray-700">Unidad</label>
      <select id="nuevaUnidadId" bind:value={nuevaUnidadId}  class="select select-bordered w-full">
        <option value="" disabled selected>Selecciona una unidad</option>
        {#each unidades as unidad}
          <option value={unidad.id}>{unidad.unidad}</option>
        {/each}
      </select>
    </div>

    <!-- Campo para ingresar el Costo -->
    <div class="mb-4">
      <label for="nuevoCosto" class="block text-sm font-medium text-gray-700">Costo</label>
      <input 
        id="nuevoCosto" 
        type="number" 
        bind:value={nuevoCosto}
       
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Botones -->
    <div class="flex justify-end">
      <button 
        on:click={handleGuardar} 
        class="btn btn-primary mr-2" 
        disabled={!formularioValido}>
        {editandoConcepto ? 'Guardar' : 'Agregar'}
      </button>
      <button on:click={handleCancelar} class="btn btn-secondary">Cancelar</button>
    </div>
  </div>
</div>
