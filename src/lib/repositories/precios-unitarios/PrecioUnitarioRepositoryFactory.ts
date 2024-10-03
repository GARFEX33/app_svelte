// src/lib/repositories/precios-unitarios/PrecioUnitarioRepositoryFactory.ts
import { SupabasePrecioUnitarioRepository } from './SupabasePrecioUnitarioRepository';
import type { PrecioUnitarioRepository } from './PrecioUnitarioRepository';

export function createPrecioUnitarioRepository(): PrecioUnitarioRepository {
  return new SupabasePrecioUnitarioRepository();
}
