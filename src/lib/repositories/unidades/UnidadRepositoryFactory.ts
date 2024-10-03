// src/lib/repositories/UnidadRepositoryFactory.ts

import type { UnidadRepository } from "./UnidadRepository";
import { SupabaseUnidadRepository } from "./SupabaseUnidadRepository";

// Podrías agregar otras implementaciones como FirebaseUnidadRepository en el futuro.
export function createUnidadRepository(): UnidadRepository {
  return new SupabaseUnidadRepository(); // Aquí seleccionas Supabase, pero podrías cambiarlo.
}
