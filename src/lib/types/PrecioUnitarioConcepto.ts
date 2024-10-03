// src/lib/types/PrecioUnitarioConcepto.ts

export interface PrecioUnitarioConcepto {
    id?: number;                    // ID de la relación (opcional)
    created_at?: string;              // Timestamp con zona horaria
    cantidad: number;                // Cantidad del concepto
    total: number;                   // Total (cantidad * costo)
    precio_unitario_id: number;      // ID del precio unitario
    concepto_id: string;             // ID del concepto (referencia a la tabla conceptos)
    unidad_id: number;               // ID de la unidad del concepto
  }
  
  export interface PrecioUnitarioConceptoSupabase {
    id: number;                     // ID manejado por la base de datos
    created_at: string;             // Timestamp con zona horaria
    cantidad: number;               // Cantidad del concepto
    total: number;                  // Total (cantidad * costo)
    precio_unitario_id: number;     // ID del precio unitario
    concepto_id: string;            // ID del concepto (referencia a la tabla conceptos)
    unidad_id: number;              // ID de la unidad del concepto
  }
  