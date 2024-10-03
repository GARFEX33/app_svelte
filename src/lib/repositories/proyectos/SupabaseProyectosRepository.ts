// src/lib/repositories/proyectos/SupabaseProyectosRepository.ts
import { fetchProyectos, addProyecto, updateProyecto, deleteProyecto, getProyectoById } from '$lib/services/ProyectoService';
import type { Proyecto } from '$lib/types/Proyecto';
import type { ProyectosRepository } from './ProyectosRepository';

export class SupabaseProyectosRepository implements ProyectosRepository {

  getProyectoById(id: number): Promise<Proyecto | null> {
    try {
      return getProyectoById(id);
    }
    catch (error) {
      console.error('Error fetching proyecto by ID:', error);
      throw new Error('Error fetching proyecto by ID');
    }
  }

  async fetchProyectos(): Promise<Proyecto[]> {
    try {
      const proyectos = await fetchProyectos();
      return proyectos;
    } catch (error) {
      console.error('Error fetching proyectos:', error);
      throw new Error('Error fetching proyectos');
    }
  }

  async addProyecto(proyecto: Proyecto): Promise<Proyecto | null> {
    try {
      return await addProyecto(proyecto);
    } catch (error) {
      console.error('Error adding proyecto:', error);
      throw new Error('Error adding proyecto');
    }
  }

  async updateProyecto(id: number, proyecto: Partial<Proyecto>): Promise<Proyecto | null> {
    try {
      return await updateProyecto(id, proyecto);
    } catch (error) {
      console.error('Error updating proyecto:', error);
      throw new Error('Error updating proyecto');
    }
  }

  async deleteProyecto(id: number): Promise<void> {
    try {
      await deleteProyecto(id);
    } catch (error) {
      console.error('Error deleting proyecto:', error);
      throw new Error('Error deleting proyecto');
    }
  }
  
}
