
import type { Concepto } from '$lib/types/Concepto';

export interface ConceptoRepository {
  fetchConceptos(): Promise<Concepto[]>;
  addConcepto(concepto: Concepto): Promise<Concepto | null>;
  updateConcepto(id: string, conceptoActualizado: Partial<Concepto>): Promise<Concepto | null>;
  deleteConcepto(id: string): Promise<void>;
}
