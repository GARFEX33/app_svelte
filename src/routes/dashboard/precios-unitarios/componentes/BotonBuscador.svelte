<script lang="ts">
    export let abrirModal: () => void;
    export let filtro: string;
  </script>
  
  <div class="mb-4 flex justify-between items-center">
    <button on:click={abrirModal} class="btn btn-primary">Agregar Concepto</button>
  
    <!-- Buscador -->
    <input
      type="text"
      placeholder="Buscar Concepto"
      bind:value={filtro}
      class="input input-bordered w-2/3"
    />
  </div>
  