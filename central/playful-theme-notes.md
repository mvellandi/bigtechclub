---
title: Playful Theme Notes
status: design-reference
updated_at: "2026-11-20"
---

# Playful Theme Notes

## Intent

Field Quest is a named development variant of Club Web. These notes describe its design direction and ideas for further exploration.

Use friendly color, clear landmarks, tactile controls, and immediate feedback as broad references. Do not copy characters, logos, fonts, assets, or exact layouts from existing games or applications.

Keep generous negative space and calm reading pacing. Use one dominant visual element per section. Do not add points, streaks, or other game mechanics without a product need.

## Colors

Explore a palette with these color roles:

- Sky blue for open surfaces and map water.
- Leaf green for primary actions and progress.
- Warm yellow for highlights and selected details.
- Coral for emphasis and important feedback.
- Deep navy for text and strong outlines.

Define colors through semantic tokens. Do not refer to literal colors in components.

Provide complete light and dark palettes. Design each mode independently. Check text, controls, map details, and focus indicators for contrast.

Keep the color theme independent of any microsite, page, or component implementation.

## Components

Explore these component treatments:

- Large corner radii on cards and panels.
- Strong borders and short offset shadows.
- Pill-shaped badges and compact controls.
- Chapter markers that resemble collectible medallions.
- Tactile hover, focus, and pressed states on buttons.
- Original flags, books, signposts, stars, and landscape symbols.

Keep global layout and typography stable during the first exploration. Use a scoped component theme for shape, border, shadow, and control treatments.

Use short and restrained motion. Disable nonessential motion when the user requests reduced motion.

## Reuse and review

Keep the initial exploration limited to color, component geometry, illustration, and motion. Reuse the same content, routes, and interaction behavior.

Review the result at narrow and wide sizes. Test keyboard operation, light mode, dark mode, and reduced motion.

Decide after review whether the result should remain an alternate creation or become a default theme.
