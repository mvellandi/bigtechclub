---
title: Big Tech Club Direction
status: working-direction
updated_at: "2026-11-20"
scope: product-and-visual-exploration
---

# Big Tech Club Direction

## Product intent

Big Tech Club is an independent public club for AI engineering education and member participation.

The core product is a free online book and a member directory. A live program, a print edition, and structured contribution paths support that core.

The product should help people learn practical AI engineering, find other practitioners, and share useful work. Keep the main public experience clear, accessible, and responsive.

## Experience intent

Use low information density, generous negative space, and editorial pacing. Combine that foundation with playful wayfinding and distinctive visual compositions.

Treat each design exploration as a complete, named creation. A creation can have its own layout, typography, color selection, components, motion, illustration, and interaction details. It should remain coherent rather than become a collection of unrelated effects.

Use external visual references for broad qualities only. Do not copy protected characters, logos, assets, fonts, or exact layouts.

## Exploration intent

Use this repository to explore designs for the main site and semi-independent microsites. The `/club-web/` route hosts named website variations. The `/twitter/` route previews the club’s social profile. Other routes can host other concepts.

Preserve worthwhile creations for later review and reuse. Do not require separate Git branches for visual variants.

Build a shared library over time. It can contain color themes, basic components, animation patterns, easing curves, tiles, illustrations, shaders, and other assets.

Keep reusable assets independent of the application in which they originated. Make their dependencies and customization points explicit. Adapt them to new contexts without maintaining disconnected copies.

## Current decisions and open questions

The existing React implementation is a working prototype, not a fixed architectural target.

The target system should support complete microsite variants and selected page- or component-level substitutions. The required tooling and composition contracts remain open to validation.

Do not build a general-purpose design tool. Add exploration tooling only when real variants demonstrate a need.
