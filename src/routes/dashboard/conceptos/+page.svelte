<script lang="ts">
  import {
    nuevoCodigo,
    nuevoNombre,
    nuevoTipoId,
    nuevaUnidadId,
    nuevoCosto,
    formularioValido,
    mensajeError,
    tipos,
    unidades,
    mostrarModal,
    conceptosFiltrados,
    cargarDatosIniciales,
    iniciarEdicion,
    handleAgregarConcepto,
    handleActualizarConcepto,
    handleEliminarConcepto,
    abrirModal,
    cerrarModal,
    editandoConcepto,
    filtro
  } from '$lib/logic/conceptos/conceptosLogic';

  import { onMount } from 'svelte';
  import ModalConcepto from './componentes/ModalConcepto.svelte';
  import TablaConceptos from './componentes/TablaConceptos.svelte';
	import BotonBuscador from './componentes/BotonBuscador.svelte';

  // Cargar los datos iniciales cuando el componente se monte
  onMount(async () => {
    await cargarDatosIniciales();
  });



  // Función para decidir si se guarda un nuevo concepto o se actualiza uno existente
  function handleGuardar() {
    if ($editandoConcepto) {
      handleActualizarConcepto();
    } else {
      handleAgregarConcepto();
    }
  }

</script>

<!-- Botón para abrir el modal -->
<BotonBuscador
  {abrirModal}
 bind:filtro= {$filtro}  
/>

{#if $mostrarModal}
  <!-- Modal de prueba con handleInputChange -->
  <ModalConcepto
  bind:nuevoCodigo={$nuevoCodigo}
  bind:nuevoNombre={$nuevoNombre}
  bind:nuevoTipoId={$nuevoTipoId}
  bind:nuevaUnidadId={$nuevaUnidadId}
  bind:nuevoCosto={$nuevoCosto}
  editandoConcepto={$editandoConcepto !== null}
  tipos={$tipos}
  unidades={$unidades}
  handleGuardar={handleGuardar}
  handleCancelar={cerrarModal}
  mensajeError={$mensajeError}
  formularioValido={$formularioValido}
  />
{/if}

<!-- Tabla de conceptos -->
<TablaConceptos 
  conceptosFiltrados={$conceptosFiltrados}
  {iniciarEdicion}
  {handleEliminarConcepto}
/>
