// src/lib/repositories/ConceptoRepositoryFactory.ts
import type { ConceptoRepository } from './ConceptoRepository';
import { SupabaseConceptoRepository } from './SupabaseConceptoRepository';

export function createConceptoRepository(): ConceptoRepository {
  return new SupabaseConceptoRepository();
}
