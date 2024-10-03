<script lang="ts">
    import { onMount } from 'svelte';
    import { addProyecto } from '$lib/stores/proyectoStore';
    import { goto } from '$app/navigation';
    import { loadClientes } from '$lib/stores/clienteStore';
    import type { Proyecto } from '$lib/types/Proyecto';
    import type { Cliente } from '$lib/types/Cliente';
    
    let nombre: string = '';
    let clienteSeleccionado: Cliente | null = null;
    let fecha_inicio: string | undefined = undefined;
    let fecha_fin: string | undefined = undefined;
    let estado: string = '';
    let descripcion: string = '';
    let mensajeError: string = '';
    let clientes: Cliente[] = [];
    let filtroCliente: string = '';
    let clientesFiltrados: Cliente[] = [];
    let mostrarSugerencias = false;  // Para manejar la visibilidad de las sugerencias
  
    // Lista de estados para el dropdown
    const estados = ["En progreso", "Cotizando", "Finalizado", "Cancelado"];
  
    // Cargar los clientes al montar el componente
    onMount(async () => {
      clientes = await loadClientes();
    });
  
    // Función para manejar la búsqueda de clientes
    function buscarClientes() {
      if (filtroCliente.length > 0) {
        clientesFiltrados = clientes.filter(cliente =>
          cliente.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
        ).slice(0, 5); // Mostrar hasta 5 resultados
        mostrarSugerencias = true;
      } else {
        clientesFiltrados = [];
        mostrarSugerencias = false;  // Ocultar sugerencias si no hay filtro
      }
    }
  
    // Función para seleccionar un cliente
    function seleccionarCliente(cliente: Cliente) {
      clienteSeleccionado = cliente;
      filtroCliente = cliente.cliente; // Mostrar el cliente seleccionado en el input
      mostrarSugerencias = false; // Ocultar las sugerencias
    }
  
    // Función para manejar la creación del nuevo proyecto
    async function handleSubmit() {
      // Validar que todos los campos requeridos estén completos
      if (!nombre || !fecha_inicio || !estado || !clienteSeleccionado) {
        mensajeError = 'Por favor complete todos los campos obligatorios.';
        return;
      }
  
      // Crear el nuevo proyecto
      const nuevoProyecto: Proyecto = {
        id: Math.floor(Math.random() * 100000), // Generar un ID temporal
        nombre,
        cliente_id: clienteSeleccionado.id, // Guardar solo el nombre del cliente seleccionado
        fecha_inicio,
        fecha_fin,
        estado,
        descripcion
      };
  
      try {
        // Agregar el nuevo proyecto
       
        await addProyecto(nuevoProyecto);
  
        // Redirigir a la lista de proyectos después de la creación
        goto('/dashboard/proyectos');
        
      } catch (error) {
        console.error('Error al agregar proyecto:', error);
        mensajeError = 'Ocurrió un error al agregar el proyecto.';
      }
    }
  </script>
  
  <!-- Estilos usando DaisyUI con mejoras de visibilidad -->
  <div class="container mx-auto p-4">
    <h2 class="text-lg font-bold mb-4">Crear Nuevo Proyecto</h2>
  
    {#if mensajeError}
      <div class="alert alert-error text-sm">{mensajeError}</div>
    {/if}
  
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <!-- Nombre del proyecto -->
      <div class="form-control">
        <label for="nombre" class="label text-sm">
          <span class="label-text">Nombre del Proyecto</span>
        </label>
        <input
          type="text"
          id="nombre"  
          bind:value={nombre}
          placeholder="Nombre del Proyecto"
          class="input input-bordered input-sm w-full"
          required
        />
      </div>
  
      <!-- Cliente con campo de búsqueda y sugerencias -->
      <div class="form-control relative">
        <label for="cliente" class="label text-sm">
          <span class="label-text">Cliente</span>
        </label>
  
        <!-- Buscador de cliente -->
        <input 
          type="text" 
          placeholder="Buscar cliente..." 
          bind:value={filtroCliente} 
          on:input={buscarClientes}
          class="input input-bordered input-sm w-full"
        />
  
        <!-- Lista de clientes filtrados (solo aparece si hay sugerencias) -->
        {#if mostrarSugerencias && clientesFiltrados.length > 0}
          <ul class="absolute left-0 right-0 bg-white border border-gray-300 shadow-lg z-10 max-h-40 overflow-auto">
            {#each clientesFiltrados as cliente}
             
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" on:click={() => seleccionarCliente(cliente)}>
                {cliente.cliente}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
  
      <!-- Fecha de Inicio y Fecha de Fin -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Fecha de Inicio -->
        <div class="form-control">
          <label for="fecha_inicio" class="label text-sm">
            <span class="label-text">Fecha de Inicio</span>
          </label>
          <input
            type="date"
            id="fecha_inicio"
            bind:value={fecha_inicio}
            class="input input-bordered input-sm w-full"
            required
          />
        </div>
  
        <!-- Fecha de Fin -->
        <div class="form-control">
          <label for="fecha_fin" class="label text-sm">
            <span class="label-text">Fecha de Fin</span>
          </label>
          <input
            type="date"
            id="fecha_fin"
            bind:value={fecha_fin}
            class="input input-bordered input-sm w-full"
          />
        </div>
      </div>
  
      <!-- Estado con Dropdown -->
      <div class="form-control">
        <label for="estado" class="label text-sm">
          <span class="label-text">Estado</span>
        </label>
        <select
          id="estado"
          bind:value={estado}
          class="select select-bordered select-sm w-full"
          required
        >
          <option disabled selected>Selecciona un estado</option>
          {#each estados as estadoOption}
            <option value={estadoOption}>{estadoOption}</option>
          {/each}
        </select>
      </div>
  
      <!-- Descripción -->
      <div class="form-control">
        <label for="descripcion" class="label text-sm">
          <span class="label-text">Descripción</span>
        </label>
        <textarea
          id="descripcion"
          bind:value={descripcion}
          placeholder="Descripción del Proyecto"
          class="textarea textarea-bordered w-full"
        />
      </div>
  
      <!-- Botón de crear -->
      <button type="submit" class="btn btn-primary w-full btn-sm">Crear Proyecto</button>
    </form>
  </div>
  