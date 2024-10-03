// src/lib/repositories/TipoRepositoryFactory.ts

import type { TipoRepository } from "./TipoRepository";
import { SupabaseTipoRepository } from "./SupabaseTipoRepository";

// Podrías agregar otras implementaciones como FirebaseTipoRepository en el futuro.
export function createTipoRepository(): TipoRepository {
  return new SupabaseTipoRepository(); // Aquí seleccionas Supabase, pero podrías cambiarlo.
}
