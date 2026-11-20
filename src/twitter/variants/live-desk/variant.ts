import type { VariantDefinition } from '../../variant';
import { liveDeskProfileSource, sessionInProgressScenario, sessionRecapScenario } from './data-source';

export const liveDeskVariant = {
  id: 'live-desk',
  name: 'Live Desk',
  source: liveDeskProfileSource,
  previews: [
    { label: 'Session in progress', scenario: sessionInProgressScenario },
    { label: 'Session recap', scenario: sessionRecapScenario },
  ],
  load: () => import('./App'),
} satisfies VariantDefinition;
