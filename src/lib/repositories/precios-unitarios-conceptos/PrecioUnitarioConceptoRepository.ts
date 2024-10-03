import type { PrecioUnitarioConcepto } from '$lib/types/PrecioUnitarioConcepto';

export interface PrecioUnitarioConceptoRepository {
  fetchPrecioUnitarioConceptos(): Promise<PrecioUnitarioConcepto[]>; // Para obtener todos los conceptos
  fetchPrecioUnitarioConceptosByPrecioUnitarioId(precioUnitarioId: number): Promise<PrecioUnitarioConcepto[]>; // Para obtener conceptos filtrados por precio_unitario_id
  addPrecioUnitarioConcepto(precioUnitarioConcepto: PrecioUnitarioConcepto): Promise<PrecioUnitarioConcepto | null>;
  updatePrecioUnitarioConcepto(id: number, precioUnitarioConceptoActualizado: Partial<PrecioUnitarioConcepto>): Promise<PrecioUnitarioConcepto | null>;
  deletePrecioUnitarioConcepto(id: number): Promise<void>;
}
