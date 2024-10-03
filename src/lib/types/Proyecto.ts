// src/lib/types/Proyecto.ts
export interface Proyecto {
    id?: number;
    nombre: string;
    cliente_id?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
    estado?: string;
    descripcion?: string;
  }