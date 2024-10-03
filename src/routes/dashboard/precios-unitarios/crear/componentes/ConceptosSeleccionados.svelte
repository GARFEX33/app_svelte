<script lang="ts">
  export let listaConceptos: { concepto: any, cantidad: number, precioUnitarioConceptoId?: number }[] = [];
  export let recalcularCostoTotal: () => void;
  export let eliminarConcepto: (conceptoId: string, precioUnitarioConceptoId?: number) => void;
  export let calcularTotal: (cantidad: number, costo: number) => number;
</script>

<div class="overflow-x-auto">
  <h3 class="text-sm font-bold mb-2">Conceptos Seleccionados</h3>
  {#if listaConceptos.length > 0}
    <table class="table table-zebra w-full text-sm">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Costo</th>
          <th>Total</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {#each listaConceptos as { concepto, cantidad, precioUnitarioConceptoId }, index}
          <tr>
            <td>{concepto.nombre}</td>
            <td>
              <input 
                type="number" 
                bind:value={cantidad} 
                class="input input-bordered input-xs w-full" 
                min="1" 
                on:input={() => {
                  listaConceptos[index].cantidad = cantidad;
                  recalcularCostoTotal(); // Recalcula cada vez que cambia la cantidad
                }}
              />
            </td>
            <td>{concepto.unidad_id}</td>
            <td>{concepto.costo}</td>
            <td>{calcularTotal(cantidad, concepto.costo)}</td>
            <td>
              <!-- Llamar a eliminarConcepto con conceptoId y precioUnitarioConceptoId si existe -->
              <button type="button" class="btn btn-error btn-xs" on:click={() => eliminarConcepto(concepto.id, precioUnitarioConceptoId)}>
                Eliminar
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="text-sm">No hay conceptos seleccionados.</p>
  {/if}
</div>
