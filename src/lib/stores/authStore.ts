import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';

// Define los tipos para las stores
export const user = writable<User | null>(null);
export const token = writable<string | null>(null);

if (browser) {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if (storedToken) {
    token.set(storedToken);
    if (storedUser) {
      user.set(JSON.parse(storedUser)); // Recupera el usuario desde localStorage
    } else {
      // Obtener el usuario asociado al token si no está en localStorage
      supabase.auth.getUser(storedToken).then(({ data, error }) => {
        if (error) {
          console.error('Error al obtener el usuario:', error.message);
        } else {
          user.set(data.user);
          localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario en localStorage
        }
      });
    }
  }
}

// Define el tipo de retorno para la función login
export async function login(email: string, password: string): Promise<string | void> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Error al iniciar sesión:', error.message);
    return error.message;
  } else {
    user.set(data.user);
    token.set(data.session.access_token);
    localStorage.setItem('token', data.session.access_token);
    localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario en localStorage
    goto('/dashboard');
  }
}

// Define el tipo de retorno para la función logout
export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error al cerrar sesión:', error.message);
  } else {
    user.set(null);
    token.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Elimina el usuario de localStorage
    goto('/');
  }
}
