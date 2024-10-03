// src/lib/repositories/UnidadRepository.ts
import type { Unidad } from '$lib/types/Unidad';

export interface UnidadRepository {
  fetchUnidades(): Promise<Unidad[]>;
  addUnidad(unidad: Omit<Unidad, 'id'>): Promise<Unidad | null>;
  updateUnidad(id: number, unidadActualizada: Partial<Unidad>): Promise<Unidad | null>;
  deleteUnidad(id: number): Promise<void>;
}
