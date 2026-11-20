import type { ComponentType } from 'react';

export interface VariantPreview {
  label: string;
  path: string;
}

export interface VariantDefinition {
  id: string;
  name: string;
  routes: Readonly<Record<string, string>>;
  previews: readonly VariantPreview[];
  load: () => Promise<{ default: ComponentType }>;
}
