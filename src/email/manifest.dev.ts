import type { ExperienceManifest } from '../workspace/manifest';

const href = './email/';

export const emailManifest: ExperienceManifest = {
  name: 'Email',
  href,
  previews: [{ name: 'Chapter announcement', links: [{ label: 'Frame the problem', href }] }],
};
