import type { ExperienceManifest } from '../workspace/manifest';
import { defaultVariant } from './default';
import { variants } from './variants.dev';

const href = './club-web/';
const directoryScenarios = [
  { label: 'Members in Berlin', query: 'place=Berlin' },
  { label: 'No matches', query: 'place=Berlin&specialty=Retrieval' },
];

export function directoryScenarioName(search: string) {
  const filters = new URLSearchParams(search);
  for (const [key, value] of [...filters]) {
    if (value === 'all') filters.delete(key);
  }
  filters.sort();
  return directoryScenarios.find(scenario => scenario.query === filters.toString())?.label;
}

export const clubWebManifest: ExperienceManifest = {
  name: 'Club Web',
  href,
  previews: variants.map(variant => {
    const entry = variant.id === defaultVariant.id ? href : href + '?variant=' + encodeURIComponent(variant.id);
    const links = [{ label: 'Home', href: entry }];
    if ('members' in variant.routes) {
      for (const { label, query } of directoryScenarios) {
        links.push({ label, href: entry + '#' + variant.routes.members + '?' + query });
      }
    }
    return { name: variant.name, links };
  }),
};
