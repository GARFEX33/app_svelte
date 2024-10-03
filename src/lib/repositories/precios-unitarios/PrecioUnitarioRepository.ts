import type { PrecioUnitario } from '$lib/types/PrecioUnitario';

export interface PrecioUnitarioRepository {
  fetchPreciosUnitarios(): Promise<PrecioUnitario[]>;
  addPrecioUnitario(precioUnitario: PrecioUnitario): Promise<PrecioUnitario | null>;
  updatePrecioUnitario(id: number, precioUnitarioActualizado: Partial<PrecioUnitario>): Promise<PrecioUnitario | null>;
  deletePrecioUnitario(id: number): Promise<void>;
}
