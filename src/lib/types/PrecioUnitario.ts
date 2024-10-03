import type { Concepto } from "./Concepto";

// src/lib/types/PrecioUnitario.ts
export interface PrecioUnitario {
  id?: number; // `id` es opcional para la creación
  descripcion: string;
  unidad_id: number;
  costo_unitario_total: number;
  conceptos?: Concepto[]; // Opcional si estás usando relaciones
  created_at?: string; // Campo opcional
}

export interface PrecioUnitarioSupabase {
  id: number;
  descripcion: string;
  unidad_id: number;
  costo_unitario_total: number;
  created_at: string;
}
