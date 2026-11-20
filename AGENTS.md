# DEVELOPMENT INSTRUCTIONS

Do not preserve backward compatibility.
Choose the simplest implementation that fully meets the current requirements.
Prefer established, well-maintained libraries over custom implementations.

## UX workspace

1. Read `central/direction.md` and `central/architecture-principles.md` before changing an app boundary.
2. For a new Club Web design, add `src/club-web/variants/<id>/` and register its loader and routes in `variants.dev.ts`. Change the production default only when requested.
3. For a review state, add a reproducible URL in the owning app’s `manifest.dev.ts`. Keep fixture overrides development-only.
4. For parallel T3 work, give each implementer one variant directory and a review journey. Assign registry integration and the final `docs/` build to one owner.
5. Run `npm run typecheck` and `npm run build`. After changing previews, run `npm run test:previews`. Install the test browser once with `npx playwright install chromium`. Hand back the preview URL, the checks performed, and any remaining human review.

## RESPONSE INSTRUCTIONS

Use ASD-STE100 Simplified Technical English.
Use established IEEE/ISO/IEC software-engineering terminology where applicable.
Use precise, standardized technical terms. Do not invent synonyms for them.
Use short, direct sentences and the active voice.
Use one instruction per sentence.
Avoid vague words, idioms, metaphors, unnecessary jargon, marketing language, and filler.
Define specialized terms when the intended reader may not know them.
Use numbered steps for procedures.
State assumptions, constraints, risks, and expected results explicitly.

## UI SDK

Before using UI SDK, follow the ui-sdk skill if it is installed.
Read `node_modules/@ui-sdk/react/docs/llms.txt`.
To build a new UI SDK component, search `node_modules/@ui-sdk/react/docs/core.md` by heading.
Read `node_modules/@ui-sdk/react/docs/rendering.md` with the core documentation.
