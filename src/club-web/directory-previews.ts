import type { VariantPreview } from './variant';

export const directoryScenarios = [
  { label: 'Members in Berlin', query: 'place=Berlin' },
  { label: 'No matches', query: 'place=Berlin&specialty=Retrieval' },
];

export function directoryPreviews(membersPath: string): VariantPreview[] {
  return directoryScenarios.map(({ label, query }) => ({
    label,
    path: `${membersPath}?${query}`,
  }));
}

export function directoryScenarioName(search: string) {
  const filters = new URLSearchParams(search);
  for (const [key, value] of [...filters]) {
    if (value === 'all') filters.delete(key);
  }
  filters.sort();
  return directoryScenarios.find(scenario => scenario.query === filters.toString())?.label;
}
