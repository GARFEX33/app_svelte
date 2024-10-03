<script lang="ts">
  import { onMount } from 'svelte';
  import { agregarPrecioUnitario } from '$lib/stores/precioUnitarioStore';
  import { agregarPrecioUnitarioConcepto } from '$lib/stores/precioUnitarioConceptoStore'; // Importamos el store para agregar los conceptos relacionados
  import { loadUnidades } from '$lib/stores/unidadStore';
  import { loadConceptos } from '$lib/stores/conceptoStore';
  import { goto } from '$app/navigation';
  import type { Unidad } from '$lib/types/Unidad';
  import type { PrecioUnitario } from '$lib/types/PrecioUnitario';
  import type { Concepto } from '$lib/types/Concepto';
  import type { PrecioUnitarioConcepto } from '$lib/types/PrecioUnitarioConcepto'; // Importamos el tipo para los conceptos relacionados
	import CostoUnitarioTotal from './componentes/CostoUnitarioTotal.svelte';
	import ConceptosSeleccionados from './componentes/ConceptosSeleccionados.svelte';
	import BuscadorConceptos from './componentes/BuscadorConceptos.svelte';

  let descripcion: string = '';
  let unidadSeleccionada: number | null = null;
  let mensajeError: string = '';
  let unidades: Unidad[] = [];
  let conceptos: Concepto[] = [];
  let conceptosFiltrados: Concepto[] = [];
  let listaConceptos: { concepto: Concepto, cantidad: number }[] = [];
  let buscadorConcepto: string = '';
  let costoUnitarioTotal: number = 0;  // Almacena el costo unitario total

  onMount(async () => {
    unidades = await loadUnidades();
    conceptos = await loadConceptos(); 
  });


// Función para manejar la creación del nuevo precio unitario
async function handleSubmit() {
  descripcion = descripcion.toUpperCase();

  if (!descripcion || !unidadSeleccionada || listaConceptos.length === 0) {
    mensajeError = 'Por favor complete todos los campos correctamente y agregue al menos un concepto.';
    return;
  }

  // Crear el nuevo precio unitario
  const nuevoPrecioUnitario: PrecioUnitario = {
    id: Math.floor(Math.random() * 100000), // Generar un ID temporal
    descripcion,
    unidad_id: unidadSeleccionada,
    costo_unitario_total: costoUnitarioTotal, // Usar el valor actualizado del costo total
    conceptos: listaConceptos.map(c => c.concepto), // Agregar solo los conceptos
  };

  try {
    // Agregar el nuevo precio unitario
    const precioUnitarioCreado = await agregarPrecioUnitario(nuevoPrecioUnitario);

    // Si se crea correctamente, agregamos los conceptos relacionados en `precio_unitario_conceptos`
    if (precioUnitarioCreado) { // Ahora podemos verificar si fue creado correctamente
      for (const { concepto, cantidad } of listaConceptos) {
        const nuevoPrecioUnitarioConcepto: PrecioUnitarioConcepto = {
			cantidad,
			total: calcularTotal(cantidad, concepto.costo), // Calcula el total
			precio_unitario_id: precioUnitarioCreado.id!, // ID del precio unitario recién creado
			concepto_id: concepto.id, // ID del concepto
			unidad_id: concepto.unidad_id // ID de la unidad del concepto
			
		
		};
        await agregarPrecioUnitarioConcepto(nuevoPrecioUnitarioConcepto); // Agregamos el concepto relacionado
      }

      goto('/dashboard/precios-unitarios'); // Redirigir a la lista de precios unitarios
    }
  } catch (error) {
    console.error('Error al agregar precio unitario o los conceptos asociados:', error);
    mensajeError = 'Ocurrió un error al agregar el precio unitario y los conceptos.';
  }
}


  // Función para manejar la búsqueda de conceptos por nombre
  function buscarConceptos() {
    if (buscadorConcepto.length > 0) {
      conceptosFiltrados = conceptos
        .filter(concepto =>
          concepto.nombre.toLowerCase().includes(buscadorConcepto.toLowerCase()) // Filtrar por nombre
        )
        .slice(0, 5); // Limitar la lista de resultados a 5 conceptos
    } else {
      conceptosFiltrados = []; // Si el buscador está vacío, no mostrar conceptos
    }
  }

  // Función para agregar un concepto a la lista al hacer clic
  function agregarConcepto(concepto: Concepto) {
    if (!listaConceptos.some(c => c.concepto.id === concepto.id)) {
      listaConceptos = [...listaConceptos, { concepto, cantidad: 1 }];
    }
    recalcularCostoTotal(); // Recalcula el total después de agregar el concepto
  }

  // Función para eliminar un concepto de la lista
  function eliminarConcepto(conceptoId: string) {
    listaConceptos = listaConceptos.filter(c => c.concepto.id !== conceptoId);
    recalcularCostoTotal(); // Recalcula el total después de eliminar el concepto
  }

  // Asegurarse de que unidadSeleccionada sea un número
  function handleUnidadSeleccionada(event: Event) {
    const target = event.target as HTMLSelectElement;
    unidadSeleccionada = parseInt(target.value, 10) || null; // Convertir a número
  }

  // Calcular el total para cada concepto
  function calcularTotal(cantidad: number, costo: number) {
    return cantidad * costo;
  }

  // Recalcular el costo unitario total cada vez que cambie la cantidad o se eliminen/agreguen conceptos
  function recalcularCostoTotal() {
    costoUnitarioTotal = listaConceptos.reduce((total, item) => total + calcularTotal(item.cantidad, item.concepto.costo), 0);
  }
</script>

<!-- Estilos usando DaisyUI con mejoras de visibilidad -->
<div class="container mx-auto p-4">
  <h2 class="text-lg font-bold mb-4">Crear Nuevo Precio Unitario</h2>

  {#if mensajeError}
    <div class="alert alert-error text-sm">{mensajeError}</div>
  {/if}

  <form on:submit|preventDefault={handleSubmit} class="space-y-2">
    
    <!-- Descripción y Unidad en un solo renglón -->
    <div class="grid grid-cols-5 gap-4">
      <!-- Descripción -->
      <div class="form-control col-span-4">
        <label for="descripcion" class="label text-sm">
          <span class="label-text">Descripción</span>
        </label>
        <input
          type="text"
          id="descripcion"  
          bind:value={descripcion}
          placeholder="Descripción"
          class="input input-bordered input-sm w-full"
          required
        />
      </div>

      <!-- Unidad -->
      <div class="form-control col-span-1">
        <label for="unidadSelect" class="label text-sm">
          <span class="label-text">Unidad</span>
        </label>
        <select id="unidadSelect" on:change={handleUnidadSeleccionada} class="select select-bordered select-sm w-full" required>
          <option value="" disabled selected>Unidad</option>
          {#each unidades as unidad}
            <option value={unidad.id}>{unidad.unidad}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Buscador de conceptos -->
    <BuscadorConceptos
    bind:buscadorConcepto={buscadorConcepto}
    onInputBuscarConceptos={buscarConceptos}
  />

    <!-- Lista de conceptos filtrados (selección con clic) -->
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

    <!-- Tabla de conceptos agregados -->
    <ConceptosSeleccionados
    {listaConceptos}
    {recalcularCostoTotal}
    {eliminarConcepto}
    {calcularTotal}
  />
    <!-- Mostrar costo unitario total calculado -->
    <CostoUnitarioTotal {costoUnitarioTotal} />
    <button type="submit" class="btn btn-primary w-full btn-sm">Crear Precio Unitario</button>
  </form>
</div>
