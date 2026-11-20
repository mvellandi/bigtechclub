export interface PreviewGroup {
  name: string;
  links: { label: string; href: string }[];
}

export interface ExperienceManifest {
  name: string;
  href: string;
  previews: PreviewGroup[];
}
