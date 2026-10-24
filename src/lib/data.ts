import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export const ANNEES = [
  { id: 'but1', label: 'BUT 1' },
  { id: 'but2', label: 'BUT 2' },
  { id: 'but3', label: 'BUT 3' },
] as const;

export async function getCompetences() {
  const all = await reader.collections.competences.all();
  return all.sort(
    (a, b) =>
      a.entry.annee.localeCompare(b.entry.annee) ||
      a.entry.code.localeCompare(b.entry.code, 'fr', { numeric: true })
  );
}
