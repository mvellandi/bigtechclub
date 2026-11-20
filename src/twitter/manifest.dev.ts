import type { ExperienceManifest } from '../workspace/manifest';
import { defaultVariant } from './default';
import { variants } from './variants.dev';

export { emptyProfileScenario } from './data-source';

const href = './twitter/';

export const twitterManifest: ExperienceManifest = {
  name: 'Twitter profile',
  href,
  previews: variants.map(variant => ({
    name: variant.name,
    links: variant.previews.map(preview => {
      const parameters = new URLSearchParams();
      if (variant.id !== defaultVariant.id) parameters.set('variant', variant.id);
      if (preview.scenario) parameters.set('scenario', preview.scenario);
      const query = parameters.toString();
      return { label: preview.label, href: href + (query ? '?' + query : '') };
    }),
  })),
};
