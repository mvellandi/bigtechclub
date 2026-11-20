import type { ExperienceManifest } from '../workspace/manifest';
import { defaultVariant } from './default';
import { variants } from './variants.dev';

const href = './club-web/';

export const clubWebManifest: ExperienceManifest = {
  name: 'Club Web',
  href,
  previews: variants.map(variant => {
    const entry = variant.id === defaultVariant.id ? href : href + '?variant=' + encodeURIComponent(variant.id);
    return {
      name: variant.name,
      links: variant.previews.map(preview => ({
        label: preview.label,
        href: entry + (preview.path === '/' ? '' : '#' + preview.path),
      })),
    };
  }),
};
