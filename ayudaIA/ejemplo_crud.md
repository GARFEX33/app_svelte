
// src/lib/types/Concepto.ts
export interface Concepto {
  id: string;               // ID manual obligatorio
  nombre: string;
  tipo_id: number;          // Relacionado con la tabla de tipos
  unidad_id: number;        // Relacionado con la tabla de unidades
  costo: number;
}

export interface ConceptoSupabase {
  id: string;
  nombre: string;
  tipo_id: number;
  unidad_id: number;
  costo: number;
  created_at: string;       // La base de datos manejará automáticamente este campo
}

/src/lib/repositories/conceptos/ConceptoRepository.ts
import type { Concepto } from '$lib/types/Concepto';

export interface ConceptoRepository {
  fetchConceptos(): Promise<Concepto[]>;
  addConcepto(concepto: Concepto): Promise<Concepto | null>;
  updateConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<Concepto | null>;
  deleteConcepto(id: string): Promise<void>;
}

/src/lib/repositories/conceptos/ConceptoRepositoryFactory.ts

import type { ConceptoRepository } from './ConceptoRepository';
import { SupabaseConceptoRepository } from './SupabaseConceptoRepository';

export function createConceptoRepository(): ConceptoRepository {
  return new SupabaseConceptoRepository();
}

/src/lib/repositories/conceptos/SupabaseConceptoRepository.ts

import { addConcepto, deleteConcepto, fetchConceptos, updateConcepto } from '$lib/services/ConceptoService';
import type { Concepto, ConceptoSupabase } from '$lib/types/Concepto';
import type { ConceptoRepository } from './ConceptoRepository';

export class SupabaseConceptoRepository implements ConceptoRepository {
  async fetchConceptos(): Promise<Concepto[]> {
    try {
      const conceptos = await fetchConceptos();
      return conceptos.map(concepto => ({
        id: concepto.id,
        nombre: concepto.nombre,
        tipo_id: concepto.tipo_id,
        unidad_id: concepto.unidad_id,
        costo: concepto.costo,
      }));
    } catch (error) {
      console.error('Error fetching conceptos:', error);
      throw new Error('Error fetching conceptos'); // Lanzamos el error para que el store lo maneje
    }
  }

  async addConcepto(nuevoConcepto: Concepto): Promise<Concepto | null> {
    const conceptoParaInsertar: Omit<ConceptoSupabase, 'created_at'> = {
      id: nuevoConcepto.id,
      nombre: nuevoConcepto.nombre,
      tipo_id: nuevoConcepto.tipo_id,
      unidad_id: nuevoConcepto.unidad_id,
      costo: nuevoConcepto.costo,
    };

    try {
      const conceptoAgregado = await addConcepto(conceptoParaInsertar);
      return conceptoAgregado
        ? {
            id: conceptoAgregado.id,
            nombre: conceptoAgregado.nombre,
            tipo_id: conceptoAgregado.tipo_id,
            unidad_id: conceptoAgregado.unidad_id,
            costo: conceptoAgregado.costo,
          }
        : null;
    } catch (error) {
      console.error('Error adding concepto:', error);
      throw new Error('Codigo duplicado'); // Lanzamos el error para que el store lo maneje
    }
  }

  async updateConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<Concepto | null> {
    const conceptoParaActualizar: Partial<ConceptoSupabase> = {
      nombre: conceptoActualizado.nombre,
      tipo_id: conceptoActualizado.tipo_id,
      unidad_id: conceptoActualizado.unidad_id,
      costo: conceptoActualizado.costo,
    };

    try {
      const conceptoActualizadoDb = await updateConcepto(id, conceptoParaActualizar);
      return conceptoActualizadoDb
        ? {
            id: conceptoActualizadoDb.id,
            nombre: conceptoActualizadoDb.nombre,
            tipo_id: conceptoActualizadoDb.tipo_id,
            unidad_id: conceptoActualizadoDb.unidad_id,
            costo: conceptoActualizadoDb.costo,
          }
        : null;
    } catch (error) {
      console.error('Error updating concepto:', error);
      throw new Error('Error updating concepto'); // Lanzamos el error para que el store lo maneje
    }
  }

  async deleteConcepto(id: string): Promise<void> {
    try {
      await deleteConcepto(id);
    } catch (error) {
      console.error('Error deleting concepto:', error);
      throw new Error('Error deleting concepto'); // Lanzamos el error para que el store lo maneje
    }
  }
}

// src/lib/services/ConceptoService.ts
import { supabase } from '$lib/supabaseClient';
import type { ConceptoSupabase } from '$lib/types/Concepto';

export async function fetchConceptos(): Promise<ConceptoSupabase[]> {
  const { data, error } = await supabase.from('conceptos').select('*');
  if (error) {
    console.error('Error fetching conceptos:', error);
    throw new Error('Error fetching conceptos');
  }
  return data ?? [];
}

export async function addConcepto(concepto: Omit<ConceptoSupabase, 'created_at'>): Promise<ConceptoSupabase | null> {
  const { data, error } = await supabase.from('conceptos').insert(concepto).select().single();
  if (error) {
    console.error('Error service:', error);
    throw new Error(error.message); // Lanza una excepción para que el error sea manejado
  }
  return data;
}


export async function updateConcepto(id: string, concepto: Partial<ConceptoSupabase>): Promise<ConceptoSupabase | null> {
  const { data, error } = await supabase.from('conceptos').update(concepto).eq('id', id).select().single();
  if (error) {
    throw new Error(error.message); // Lanza una excepción para que el error sea manejado

  }
  return data;
}

export async function deleteConcepto(id: string): Promise<void> {
  const { error } = await supabase.from('conceptos').delete().eq('id', id);
  if (error) {
    console.error('Error deleting concepto:', error);
    throw new Error('Error deleting concepto');
  }
}

// src/lib/stores/conceptoStore.ts
import type { Concepto } from '$lib/types/Concepto';
import { createConceptoRepository } from '$lib/repositories/conceptos/ConceptoRepositoryFactory';
import { writable } from 'svelte/store';

// Crea la instancia del repositorio
const conceptoRepository = createConceptoRepository();

// Store para mantener la lista de conceptos
export const conceptos = writable<Concepto[]>([]);


export async function loadConceptos(): Promise<Concepto[]> {
  try {
    const data = await conceptoRepository.fetchConceptos();
    conceptos.set(data); // Actualiza el store
    return data; // Retorna los conceptos
  } catch (error) {
    console.error('Error al cargar conceptos:', error);
    throw error;
  }
}

export async function agregarConcepto(nuevoConcepto: Concepto): Promise<void> {
  try {
    const conceptoAgregado = await conceptoRepository.addConcepto(nuevoConcepto);
   
    if (conceptoAgregado) {
      conceptos.update(current => [...current, conceptoAgregado]);
    } else {
      console.error('Error: No se pudo agregar el concepto');
    }
  } catch (error) {
    console.error('Error al agregar concepto Store:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

export async function actualizarConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<void> {
  try {
    const concepto = await conceptoRepository.updateConcepto(id, conceptoActualizado);
    if (concepto) {
      conceptos.update(current =>
        current.map(c => (c.id === id ? concepto : c))
      );
    }
  } catch (error) {
    console.error('Error al actualizar concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

export async function eliminarConcepto(id: string): Promise<void> {
  try {
    await conceptoRepository.deleteConcepto(id);
    conceptos.update(current => current.filter(concepto => concepto.id !== id));
  } catch (error) {
    console.error('Error al eliminar concepto:', error);
    throw error; // Lanzar el error para que pueda manejarse en el componente
  }
}

Esto es el ejemplo de un crud que contiene el type, repositorio, servicio y store para realizar un crud en supabase, debes crear esta misma estructura para la siguiente tabla de supabase.
crea un archivo separado para copiar y pegar el codigo:

1. **Proyectos**: 
   Esta tabla almacenará información sobre cada proyecto en el que se trabajarán los presupuestos.

   ```sql
   CREATE TABLE proyectos (
     id SERIAL PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL,
     cliente VARCHAR(255),
     fecha_inicio DATE,
     fecha_fin DATE,
     estado VARCHAR(50),
     descripcion TEXT
   );
   ```