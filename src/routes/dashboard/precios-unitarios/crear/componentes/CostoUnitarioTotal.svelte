<!-- src/lib/components/CostoUnitarioTotal.svelte -->
<script lang="ts">
    export let costoUnitarioTotal: number;
  </script>
  
  <div class="form-control mt-4 flex justify-center items-center">

    <label class="label text-sm flex flex-col items-center">
      <span class="label-text font-bold text-center">Costo Unitario Total: </span>
      <span class="text-lg font-bold">{costoUnitarioTotal}</span>
    </label>
  </div>
  