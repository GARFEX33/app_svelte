// src/lib/repositories/proyectos/ProyectosRepositoryFactory.ts
import { SupabaseProyectosRepository } from './SupabaseProyectosRepository';
import type { ProyectosRepository } from './ProyectosRepository';

export function createProyectosRepository(): ProyectosRepository {
  return new SupabaseProyectosRepository();
}

