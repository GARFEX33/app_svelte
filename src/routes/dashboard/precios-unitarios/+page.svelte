<script lang="ts">
  import { onMount } from 'svelte';
  import TablaPreciosUnitarios from './componentes/TablaPreciosUnitarios.svelte';
  import BotonBuscador from './componentes/BotonBuscador.svelte';
  import { goto } from '$app/navigation';
	import { cargarPreciosUnitarios, eliminarPrecio, filtro, preciosUnitariosFiltrados } from '$lib/logic/precios-unitarios/preciosUnitariosLogic';

  // Cargar precios unitarios al montar el componente
  onMount(async () => {
    await cargarPreciosUnitarios();
  });

  // Función para manejar la eliminación de un precio unitario
  function handleEliminarPrecioUnitario(id: number) {
    eliminarPrecio(id);
  }

  // Función para navegar a la página de creación
  function navegarACrear() {
    goto('/dashboard/precios-unitarios/crear');
  }
</script>

<!-- Botón para abrir el modal -->
<BotonBuscador
  abrirModal = {navegarACrear}
 bind:filtro = {$filtro}  
/>

<!-- Tabla de precios unitarios filtrados -->
<TablaPreciosUnitarios 
preciosUnitariosFiltrados=  {$preciosUnitariosFiltrados}
  {handleEliminarPrecioUnitario}
/>

