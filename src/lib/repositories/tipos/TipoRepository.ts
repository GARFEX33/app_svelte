import type { Tipo } from "$lib/types/Tipo";



export interface TipoRepository {
  fetchTipos(): Promise<Tipo[]>;
  addTipo(tipo: Omit<Tipo, 'id'>): Promise<Tipo | null>;
  updateTipo(id: number, tipoActualizado: Partial<Tipo>): Promise<Tipo | null>;
  deleteTipo(id: number): Promise<void>;
}
