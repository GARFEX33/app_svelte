<script lang="ts">
    export let buscadorConcepto: string = '';
    export let onInputBuscarConceptos: (event: Event) => void;
  </script>
  
  <div class="form-control">
    <label for="buscador" class="label text-sm">
      <span class="label-text">Buscar Conceptos</span>
    </label>
    <input
      type="text"
      id="buscador"
      bind:value={buscadorConcepto}
      on:input={onInputBuscarConceptos}
      placeholder="Buscar"
      class="input input-bordered input-sm w-full"
    />
  </div>
  