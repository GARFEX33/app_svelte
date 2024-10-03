

import { addTipo, deleteTipo, fetchTipos, updateTipo } from "$lib/services/TipoService";
import type { Tipo, TipoSupabase } from "$lib/types/Tipo";

import type { TipoRepository } from "./TipoRepository";

export class SupabaseTipoRepository implements TipoRepository {
  async fetchTipos(): Promise<Tipo[]> {
    return await fetchTipos(); // Reutiliza la función centralizada
  }

  async addTipo(nuevoTipo: Omit<Tipo, 'id'>): Promise<Tipo | null> {
    // Mapea el objeto Tipo al formato de TipoSupabase
    const tipoParaInsertar: Omit<TipoSupabase, 'id'> = {
        tipo: nuevoTipo.tipo,

    };

    const tipoAgregado = await addTipo(tipoParaInsertar);
    console.log("Tipo agregado repo", tipoAgregado);
    return tipoAgregado ? {
      id: tipoAgregado.id,
      tipo: tipoAgregado.tipo,
  
    } : null;
  }

  async updateTipo(id: number, tipoActualizado: Partial<Tipo>): Promise<Tipo | null> {
    const tipoParaActualizar: Partial<TipoSupabase> = {
      tipo: tipoActualizado.tipo,
    };

    const tipoActualizadoDb = await updateTipo(id, tipoParaActualizar);

    return tipoActualizadoDb ? {
      id: tipoActualizadoDb.id,
      tipo: tipoActualizadoDb.tipo,
  
    } : null;
  }

  async deleteTipo(id: number): Promise<void> {
    await deleteTipo(id); // Reutiliza la función centralizada
  }
}
