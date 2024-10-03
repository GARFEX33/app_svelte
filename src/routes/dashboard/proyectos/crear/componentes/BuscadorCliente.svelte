<script lang="ts">
    export let buscadorCliente: string = '';
    export let onInputBuscar: (event: Event) => void;
  </script>
  
  <div class="form-control">
    <label for="buscador" class="label text-sm">
      <span class="label-text">Buscar Conceptos</span>
    </label>
    <input
      type="text"
      id="buscador"
      bind:value={buscadorCliente}
      on:input={onInputBuscar}
      placeholder="Buscar"
      class="input input-bordered input-sm w-full"
    />
  </div>
  