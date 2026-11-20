import type { ExperienceManifest } from '../workspace/manifest';

const href = './twitter/';
export const emptyProfileScenario = 'empty-profile';

export const twitterManifest: ExperienceManifest = {
  name: 'Twitter profile',
  href,
  previews: [{
    name: 'Profile',
    links: [
      { label: 'With posts', href },
      { label: 'No posts', href: href + '?scenario=' + emptyProfileScenario },
    ],
  }],
};
