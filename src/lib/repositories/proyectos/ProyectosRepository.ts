import type { Proyecto } from "$lib/types/Proyecto";

export interface ProyectosRepository {
    fetchProyectos(): Promise<Proyecto[]>;
    addProyecto(proyecto: Proyecto): Promise<Proyecto | null>;
    updateProyecto(id: number, proyecto: Partial<Proyecto>): Promise<Proyecto | null>;
    deleteProyecto(id: number): Promise<void>;
    getProyectoById(id: number): Promise<Proyecto | null>;
  }