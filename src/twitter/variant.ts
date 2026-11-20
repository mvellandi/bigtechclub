import type { ComponentType } from 'react';
import type { Profile, ProfileDataSource } from './data-source';

export interface VariantPreview {
  label: string;
  scenario?: string;
}

export interface VariantDefinition {
  id: string;
  name: string;
  source: ProfileDataSource;
  previews: readonly VariantPreview[];
  load: () => Promise<{ default: ComponentType<{ profile: Profile }> }>;
}
