<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; 
  import { loadUnidades } from '$lib/stores/unidadStore';
  import { loadConceptos } from '$lib/stores/conceptoStore';
  import { actualizarPrecioUnitario, loadPrecioUnitario } from '$lib/stores/precioUnitarioStore';
  import { 
    loadPrecioUnitarioConceptos, 
    actualizarPrecioUnitarioConcepto, 
    eliminarPrecioUnitarioConcepto, 
    agregarPrecioUnitarioConcepto 
  } from '$lib/stores/precioUnitarioConceptoStore'; 
  import type { PrecioUnitario } from '$lib/types/PrecioUnitario';
  import type { Concepto } from '$lib/types/Concepto';
  import type { PrecioUnitarioConcepto } from '$lib/types/PrecioUnitarioConcepto';
  import type { Unidad } from '$lib/types/Unidad';
  import BuscadorConceptos from '../crear/componentes/BuscadorConceptos.svelte';
  import ConceptosSeleccionados from '../crear/componentes/ConceptosSeleccionados.svelte';
  import CostoUnitarioTotal from '../crear/componentes/CostoUnitarioTotal.svelte';
  import { goto } from '$app/navigation';

  let id: number;
  let precioUnitario: PrecioUnitario | null = null;
  let mensajeError: string = '';
  let unidades: Unidad[] = [];
  let conceptos: Concepto[] = [];
  let conceptosFiltrados: Concepto[] = [];
  let listaConceptos: { concepto: Concepto, cantidad: number, precioUnitarioConceptoId?: number }[] = [];
  let buscadorConcepto: string = '';
  let costoUnitarioTotal: number = 0;

  $: id = Number($page.params.id);

  onMount(async () => {
    try {
      unidades = await loadUnidades();
      conceptos = await loadConceptos();
      precioUnitario = await loadPrecioUnitario(id);
    
      if (precioUnitario) {
        // Cargar los conceptos relacionados desde la base de datos
        const conceptosRelacionados = await loadPrecioUnitarioConceptos(id);

        // Mapear los conceptos relacionados a listaConceptos con el id de precio_unitario_concepto
        listaConceptos = conceptosRelacionados.map((relacion: PrecioUnitarioConcepto) => ({
          concepto: conceptos.find(c => c.id === relacion.concepto_id)!,
          cantidad: relacion.cantidad,
          precioUnitarioConceptoId: relacion.id  // Guardamos el ID de precio_unitario_concepto para eliminar/actualizar
        }));

        recalcularCostoTotal();
      }
    } catch (error) {
      console.error('Error al cargar los datos del precio unitario:', error);
      mensajeError = 'Error al cargar los datos del precio unitario.';
    }
  });

  async function handleActualizar() {
    if (!precioUnitario) return;

    try {
      precioUnitario.unidad_id = Number(precioUnitario.unidad_id);
      precioUnitario.costo_unitario_total = parseFloat(costoUnitarioTotal.toString());

      await actualizarPrecioUnitario(id, precioUnitario); 
      
      for (const { concepto, cantidad, precioUnitarioConceptoId } of listaConceptos) {
        const nuevoPrecioUnitarioConcepto: PrecioUnitarioConcepto = {
          id: precioUnitarioConceptoId,  // Usar el ID si estamos editando un concepto existente
          cantidad,
          total: calcularTotal(cantidad, concepto.costo),
          precio_unitario_id: precioUnitario.id!,
          concepto_id: concepto.id,
          unidad_id: concepto.unidad_id
        };

        if (precioUnitarioConceptoId) {
          await actualizarPrecioUnitarioConcepto(precioUnitarioConceptoId, nuevoPrecioUnitarioConcepto);
        } else {
          // Si no hay ID, entonces es un nuevo concepto
          await agregarPrecioUnitarioConcepto(nuevoPrecioUnitarioConcepto);
        }
      }

      // Después de actualizar o agregar, redirigir a la lista
      goto(`/dashboard/precios-unitarios`);

    } catch (error) {
      console.error('Error al actualizar el precio unitario:', error);
      mensajeError = 'Error al actualizar el precio unitario.';
    }
  }

  async function eliminarConcepto(conceptoId: string, precioUnitarioConceptoId?: number) {
    if (precioUnitarioConceptoId) {
      try {
        // Eliminar el concepto del store y la base de datos
        console.log(`Eliminando concepto con ID: ${precioUnitarioConceptoId}`);
        await eliminarPrecioUnitarioConcepto(precioUnitarioConceptoId);
        
        // Actualizar la lista de conceptos en la interfaz
        listaConceptos = listaConceptos.filter(c => c.precioUnitarioConceptoId !== precioUnitarioConceptoId);
        recalcularCostoTotal();
        
        console.log(`Concepto ${conceptoId} eliminado correctamente`);
      } catch (error) {
        console.error('Error al eliminar concepto del precio unitario:', error);
      }
    } else {
      // Si el concepto no está en la base de datos (no tiene ID asociado en precio_unitario_conceptos)
      listaConceptos = listaConceptos.filter(c => c.concepto.id !== conceptoId);
      recalcularCostoTotal();
    }
  }

  function buscarConceptos() {
    if (buscadorConcepto.length > 0) {
      conceptosFiltrados = conceptos
        .filter(concepto =>
          concepto.nombre.toLowerCase().includes(buscadorConcepto.toLowerCase())
        )
        .slice(0, 5);
    } else {
      conceptosFiltrados = [];
    }
  }

  function agregarConcepto(concepto: Concepto) {
    if (!listaConceptos.some(c => c.concepto.id === concepto.id)) {
      listaConceptos = [...listaConceptos, { concepto, cantidad: 1 }];
    }
    recalcularCostoTotal();
  }

  function calcularTotal(cantidad: number, costo: number) {
    return cantidad * costo;
  }

  function recalcularCostoTotal() {
    costoUnitarioTotal = listaConceptos.reduce((total, item) => total + calcularTotal(item.cantidad, item.concepto.costo), 0);
  }
</script>

<!-- Estilos usando DaisyUI -->
<div class="container mx-auto p-4">
  <h2 class="text-lg font-bold mb-4">Editar Precio Unitario</h2>

  {#if mensajeError}
    <div class="alert alert-error text-sm">{mensajeError}</div>
  {/if}

  {#if precioUnitario}
    <form on:submit|preventDefault={handleActualizar} class="space-y-2">
      
      <div class="grid grid-cols-5 gap-4">
        <div class="form-control col-span-4">
          <label for="descripcion" class="label text-sm">
            <span class="label-text">Descripción</span>
          </label>
          {#if precioUnitario}
            <input
              type="text"
              id="descripcion"  
              bind:value={precioUnitario.descripcion}
              placeholder="Descripción"
              class="input input-bordered input-sm w-full"
              required
            />
          {/if}
        </div>

        <div class="form-control col-span-1">
          <label for="unidadSelect" class="label text-sm">
            <span class="label-text">Unidad</span>
          </label>
          {#if precioUnitario}
            <select id="unidadSelect" bind:value={precioUnitario.unidad_id} class="select select-bordered select-sm w-full" required>
              <option value="" disabled selected>Unidad</option>
              {#each unidades as unidad}
                <option value={unidad.id}>{unidad.unidad}</option>
              {/each}
            </select>
          {/if}
        </div>
      </div>

      <BuscadorConceptos bind:buscadorConcepto={buscadorConcepto} onInputBuscarConceptos={buscarConceptos} />

      {#if conceptosFiltrados.length > 0}
        <div>
          <ul class="list-disc pl-5">
            {#each conceptosFiltrados as concepto}
              <li class="flex justify-between items-center text-sm hover:bg-gray-200 cursor-pointer" on:click={() => agregarConcepto(concepto)}>
                <span>{concepto.nombre}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <ConceptosSeleccionados 
        {listaConceptos} 
        {recalcularCostoTotal} 
        {eliminarConcepto} 
        {calcularTotal} 
      />

      <CostoUnitarioTotal {costoUnitarioTotal} />

      <button type="submit" class="btn btn-primary w-full btn-sm">Actualizar Precio Unitario</button>
    </form>
  {:else}
    <p class="text-sm">Cargando datos...</p>
  {/if}
</div>
