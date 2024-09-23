<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { goto } from '$app/navigation';
	import { token, user } from '$lib/stores/authStore';
	import { onMount } from 'svelte';
  
  onMount(() => {
    console.log($user);

    if (!$token) {
      goto('/'); // Redirige al login si no hay token
    }
  });
  
</script>

<div class="flex h-screen">
  <Sidebar />
  <div class="flex-1 p-6 bg-gray-100">
    <slot />
  </div>
</div>
