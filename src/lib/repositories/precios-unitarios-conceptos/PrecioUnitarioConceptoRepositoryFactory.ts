import { SupabasePrecioUnitarioConceptoRepository } from './SupabasePrecioUnitarioConceptoRepository';
import type { PrecioUnitarioConceptoRepository } from './PrecioUnitarioConceptoRepository';

export function createPrecioUnitarioConceptoRepository(): PrecioUnitarioConceptoRepository {
  return new SupabasePrecioUnitarioConceptoRepository();
}
