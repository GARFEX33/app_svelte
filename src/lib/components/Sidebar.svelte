<script>
	import { logout } from "$lib/stores/authStore";

  
  async function logoutPage() {
    logout();
  }
  
</script>
<nav class="w-64 bg-blue-900 text-white h-full flex flex-col">
    <div class="p-4">
      <div class="bg-blue-500 w-12 h-12 rounded-full"></div>
    </div>
    <ul class="menu p-4 flex-grow">
      <li><a class="text-white" href="/dashboard">Inicio</a></li>
      <li><a class="text-white" href="/dashboard/clientes">Clientes</a></li>
      <li><a class="text-white" href="/dashboard/option2">Opción 2</a></li>
      <li><a class="text-white" href="/dashboard/option3">Opción 3</a></li>
      <li><a class="text-white" href="/dashboard/settings">Configuración</a></li>
    </ul>
    <div class="p-4">
      <button class="btn btn-primary w-full"  on:click={logoutPage}>Cerrar Sesión</button>
  </nav>
  