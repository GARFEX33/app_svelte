<script lang="ts">
  export let nombre: string = ''; 
  export let cliente: string = '';
  export let fecha_inicio: string | null = null;
  export let fecha_fin: string | null = null;
  export let estado: string = '';
  export let descripcion: string = '';
  export let editandoProyecto: boolean = false;
  export let formularioValido: boolean = false; 
  export let mensajeError: string = '';

  export let handleGuardar: () => void;
  export let handleCancelar: () => void;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
  <div class="bg-white p-6 rounded shadow-lg z-50">
    <h2 class="text-xl font-bold mb-4">{editandoProyecto ? 'Editar Proyecto' : 'Agregar Nuevo Proyecto'}</h2>
  
    <!-- Mostrar mensaje de error si existe -->
    {#if mensajeError}
      <div role="alert" class="text-sm text-red-600 mb-2 flex items-center">
        <span>{mensajeError}</span>
      </div>
    {/if}

    <!-- Campo para ingresar el Nombre del proyecto -->
    <div class="mb-4">
      <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
      <input 
        id="nombre" 
        type="text" 
        bind:value={nombre}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Campo para ingresar el Cliente -->
    <div class="mb-4">
      <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
      <input 
        id="cliente" 
        type="text" 
        bind:value={cliente}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Campo para seleccionar la Fecha de Inicio -->
    <div class="mb-4">
      <label for="fecha_inicio" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
      <input 
        id="fecha_inicio" 
        type="date" 
        bind:value={fecha_inicio}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Campo para seleccionar la Fecha de Fin -->
    <div class="mb-4">
      <label for="fecha_fin" class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
      <input 
        id="fecha_fin" 
        type="date" 
        bind:value={fecha_fin}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Campo para ingresar el Estado del proyecto -->
    <div class="mb-4">
      <label for="estado" class="block text-sm font-medium text-gray-700">Estado</label>
      <input 
        id="estado" 
        type="text" 
        bind:value={estado}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Campo para ingresar la Descripción -->
    <div class="mb-4">
      <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
      <input 
        id="descripcion" 
        type="text"
        bind:value={descripcion}
        class="input input-bordered w-full" 
      />
    </div>

    <!-- Botones -->
    <div class="flex justify-end">
      <button 
        on:click={handleGuardar} 
        class="btn btn-primary mr-2" 
        disabled={!formularioValido}>
        {editandoProyecto ? 'Guardar' : 'Agregar'}
      </button>
      <button on:click={handleCancelar} class="btn btn-secondary">Cancelar</button>
    </div>
  </div>
</div>
