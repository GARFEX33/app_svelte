<script lang="ts">
  import { onMount } from 'svelte';
  import BotonBuscador from './componentes/BotonBuscador.svelte';
  import { goto } from '$app/navigation';
  import { iniciarEdicion ,cargarProyectos, eliminarProyecto, filtro, proyectosFiltrados } from '$lib/logic/proyectos/proyectosLogic';
	import TablaProyectos from './componentes/TablaProyectos.svelte';

  // Cargar proyectos al montar el componente
  onMount(async () => {
    await cargarProyectos();
  });

  // Función para manejar la eliminación de un proyecto
  function handleEliminarProyecto(id: number) {
    eliminarProyecto(id);
  }

  // Función para navegar a la página de creación
  function navegarACrear() {
    goto('/dashboard/proyectos/crear');
  }
</script>

<!-- Botón para abrir el modal -->
<BotonBuscador
  label="Proyecto"
  abrirModal={navegarACrear}
  bind:filtro={$filtro}  
/>

<!-- Tabla de proyectos filtrados -->
<TablaProyectos 
proyectosFiltrados={$proyectosFiltrados}
  {handleEliminarProyecto}
  {iniciarEdicion}
/>
