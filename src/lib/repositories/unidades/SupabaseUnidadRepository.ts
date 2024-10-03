// src/lib/repositories/SupabaseUnidadRepository.ts

import { addUnidad, deleteUnidad, fetchUnidades, updateUnidad } from "$lib/services/UnidadService";
import type { Unidad, UnidadSupabase } from "$lib/types/Unidad";
import type { UnidadRepository } from "./UnidadRepository";

export class SupabaseUnidadRepository implements UnidadRepository {
  async fetchUnidades(): Promise<Unidad[]> {
    return await fetchUnidades(); // Reutiliza la función centralizada
  }

  async addUnidad(nuevaUnidad: Omit<Unidad, 'id'>): Promise<Unidad | null> {
    // Mapea el objeto Unidad al formato de UnidadSupabase
    const unidadParaInsertar: Omit<UnidadSupabase, 'id'> = {
      unidad: nuevaUnidad.unidad,
    };

    const unidadAgregada = await addUnidad(unidadParaInsertar);
    console.log("Unidad agregada repo", unidadAgregada);
    return unidadAgregada ? {
      id: unidadAgregada.id,
      unidad: unidadAgregada.unidad,
    } : null;
  }

  async updateUnidad(id: number, unidadActualizada: Partial<Unidad>): Promise<Unidad | null> {
    const unidadParaActualizar: Partial<UnidadSupabase> = {
      unidad: unidadActualizada.unidad,
    };

    const unidadActualizadaDb = await updateUnidad(id, unidadParaActualizar);

    return unidadActualizadaDb ? {
      id: unidadActualizadaDb.id,
      unidad: unidadActualizadaDb.unidad,
    } : null;
  }

  async deleteUnidad(id: number): Promise<void> {
    await deleteUnidad(id); // Reutiliza la función centralizada
  }
}
