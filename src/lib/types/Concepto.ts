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
