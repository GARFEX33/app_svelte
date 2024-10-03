

import type { ClienteRepository } from "./ClienteRepository";
import { SupabaseClienteRepository } from "./SupabaseClienteRepository";


// Podrías agregar otras implementaciones como FirebaseClienteRepository en el futuro.
export function createClienteRepository(): ClienteRepository {
  return new SupabaseClienteRepository(); // Aquí seleccionas Supabase, pero podrías cambiarlo.
}
