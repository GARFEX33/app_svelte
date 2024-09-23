<script>
	import { goto } from '$app/navigation';
	import { login, token } from '$lib/stores/authStore';
    import { onMount } from 'svelte';
    let email = '';
    let password = '';
    onMount(async () => {
      if ($token) {
        goto('/dashboard');
      }
    });
    async function loginForm() {
      await login(email, password);
    }
  

  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center ">Iniciar Sesión</h2>
        
        <!-- Correo Electrónico -->
        <div class="form-control">
          <label for="email" class="label">
            <span class="label-text">Correo Electrónico</span>
          </label>
          <input id="email" type="email" bind:value={email} placeholder="correo@ejemplo.com" class="input input-bordered" />
        </div>
        
        <!-- Contraseña -->
        <div class="form-control mt-4">
          <label for="password" class="label">
            <span class="label-text">Contraseña</span>
          </label>
          <input id="password" type="password" bind:value={password} placeholder="********" class="input input-bordered" />
        </div>
        
        <!-- Botón de Ingresar -->
        <div class="form-control mt-6">
          <button class="btn btn-primary w-full" on:click={loginForm}>Ingresar</button>

        </div>


      </div>
    </div>
  </div>