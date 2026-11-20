---
title: Architecture Principles
status: working-principles
updated_at: "2026-11-20"
scope: static-applications-and-independent-visual-assets
---

# Architecture Principles

## Current constraints

Keep the main application deployable as static files on GitHub Pages. Use Vite and publish the build to `docs/`. Preserve the required HTML entry points and CNAME content.

Use local JSON fixtures behind small asynchronous data-source interfaces. A future remote backend-for-frontend can implement the same interfaces. Keep private credentials and privileged operations out of browser code.

The current main site and `/future/` entry share a React implementation. The intended separation into independent microsite variants has not been implemented.

## Target exploration model

A microsite belongs to a route and has its own purpose. A microsite configuration records its available variants and its default variant in code.

A microsite variant is a complete, named creation. It can own its application entry, rendered markup, styles, routes, pages, components, and local assets. Loading a microsite selects its default variant unless a development override is active.

Use the same model for other route-level microsite concepts. Use dynamic imports to keep variants separate and load only the selected creation.

## Shared library

Keep reusable resources outside individual microsites. Organize them by semantic type and give each creation a distinct name.

Color themes must be variant-agnostic. Define semantic color tokens rather than application-specific values. Provide light and dark palettes where the theme supports both modes.

Components need explicit public contracts. Define their props, events, data requirements, keyboard behavior, and customization points. A shared component must not import pages, fixtures, routes, or styles from its originating application.

Apply the same independence principle to animation patterns, easing curves, tiles, illustrations, shaders, and other assets. Document their inputs, outputs, dependencies, and rendering requirements.

Promote a local resource to the shared library when another creation needs it. Use an adapter at the application boundary when an existing resource does not satisfy the new contract. Avoid adding unrelated options to shared resources.

## Existing and custom implementations

Prefer established, maintained implementations when they satisfy the requirement. Evaluate shadcn-compatible components, Base UI implementations, UI SDK behaviors, React Bits, and other suitable sources before writing a complex component.

Do not create complex controls such as date pickers from scratch without a demonstrated need. Avoid implementing the same focus, keyboard, selection, or popup behavior twice.

Check licenses, accessibility, maintenance, bundle size, runtime performance, and visual adaptability before adopting an implementation. Keep project-specific styling under project control.

Reserve custom implementation for requirements that existing resources cannot meet cleanly. Keep custom resources independent and reusable by default.

## Composition and development tooling

Use explicit composition manifests for default page and component selections. Support substitutions only through declared semantic slots with compatible contracts.

A complete microsite variant may change its routes and workflows. A page variant should preserve the route's user journey and data contract. Use another microsite variant when those boundaries change.

Development tooling may select microsite, page, and component variants. Keep it out of production builds. Keep committed defaults in code and exploratory overrides visible in the development URL.

Do not recreate Storybook or a general visual editor. Add tooling after multiple real variants establish the required interactions.

## Rendering, accessibility, and performance

Scope variant styles so that one creation cannot unintentionally change another. Remount the application when a complete microsite variant changes.

Treat semantic HTML, keyboard operation, focus management, responsive behavior, and reduced motion as requirements.

Lazy-load expensive graphics and motion resources. Provide usable fallbacks for WebGL and shader failures. Do not make essential content or navigation depend on a graphics effect.

Validate shared resources in more than one consuming context when possible. Check each selected composition for accessibility, overflow, console errors, and production-build correctness.

## Non-goals

Do not build a local or production backend for visual exploration.

Do not force every creation into one layout or component hierarchy.

Do not build a universal component with a large configuration surface.

Do not require a separate Git branch for each visual creation.
