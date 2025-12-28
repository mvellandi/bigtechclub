# BEAM Tech Evidence Registry — Curator-Led v3 (LiveView)

**Architecture**: Phoenix + LiveView + PostgreSQL  
**Auth**: Simple accounts (password or magic-link), small verifier whitelist  
**Purpose**: Curator-led evidence capture with a tiny circle of co-verifiers; minimal surface area, high-quality signals.

## Scope & Principles
- Evidence-first: every Confirmed claim cites a specific artifact.
- Lean governance: you (curator) submit most entries; a handful of trusted verifiers confirm.
- Low friction: shortest possible form; insiders are a flag, not a status.
- Freshness: time-decay auto-demotes stale claims; prompts for re-checks.
- Transparency: show provenance, timestamps, verifier identity; no silent edits.

## Status Model
1) **Reported** — claim logged without evidence (community or curator)  
2) **Evidenced** — at least one artifact URL attached  
3) **Confirmed** — second human (whitelisted verifier) reviewed the evidence and approved  
4) **Historical** — expired or counter-signaled (auto-demotion after freshness window)

**Orthogonal flag**: `insider_attested` with optional `role` + `timeframe`. It never replaces evidence.

## Roles (minimal)
- **Visitor**: Read-only.
- **Contributor**: Submit Reported/Evidenced claims; add artifacts; mark insider flag. (Can be public if desired.)
- **Curator**: Same as contributor plus can push to Confirmed and manage merges.
- **Verifier** (small whitelist): Can Confirm or return to Evidenced; cannot confirm own submissions or affiliated orgs.
- **Admin**: User management and settings (usually you).

## Core Flows
- **Submit**: org + tech (autocomplete) + URL (optional) + short context + insider flag. No evidence → Reported; with URL → Evidenced.
- **Verify**: queue of Evidenced; verifier checks artifact, clicks Confirm or Return; adds a short note; COI check blocks affiliated orgs.
- **Freshness**: nightly job auto-demotes Confirmed older than N months to Historical; queues them for re-check.
- **Dedupe**: org dedupe by domain; tech dedupe by slug/hex package; curator can merge and redirect claims.
- **Challenges**: “Flag for review” pushes claim into curator queue; doesn’t change status directly.

## Data Model (lean)
- **Organization**: id, name, domain (canonical), slug, aliases?, region?, size_band?, created_at/updated_at, merged_into?
- **Technology**: id, name, slug, ecosystem (`erlang`|`elixir`|`gleam`), category, hex_package?, aliases?, created_at/updated_at, merged_into?
- **Claim**: id, organization_id, technology_id, status, insider_attested?, insider_role?, insider_timeframe?, usage_context (`production`|`staging`|`experimental`|`deprecated`), submitted_by, submitted_at, last_reviewed_at.
- **Evidence**: id, claim_id, url, type (`job_post`|`repo`|`talk`|`doc`|`news`), captured_at, snippet?, source_score?, added_by.
- **User**: id, email, display_name, role (`visitor`|`contributor`|`curator`|`verifier`|`admin`), org_affiliations[], created_at, last_active_at.
- **Audit**: id, actor_id, action (`create_claim`|`add_evidence`|`confirm`|`return`|`merge_org`|`merge_tech`|`auto_demote`), target_ref, note, created_at.

## Automation (small and targeted)
- **Harvester** (optional v2): crawl job boards and org GitHub repos by domain → seed Evidenced claims.
- **Freshness/Decay**: cron to demote stale Confirmed → Historical and queue for re-check.
- **Dedupe Helper**: nightly fuzzy match on org names/domains and tech slugs to suggest merges.

## LiveView App Surface
- Landing/search: filter by org/tech/status; show evidence count and last reviewed date.
- Claim detail: statuses, evidence list, insider flag, audit trail.
- Submit form: minimal fields, inline validation, optional insider attestation.
- Verifier queue: list of Evidenced, COI check, Confirm/Return + note.
- Merge tool: simple select-to-merge for orgs/techs with redirect of claims.
- Admin: manage users/roles; set freshness window; view audit log.

## Auth & Security
- Simple auth: Phoenix built-in auth (password) or magic links; CSRF enabled.
- Whitelist verifiers: role assigned by admin; no public reputation system.
- COI check: block confirmations where verifier has an affiliation with the org.
- Rate limits: per-IP and per-user submission caps to avoid spam.

## Operational Policies
- Evidence freshness window: default 18 months; configurable.
- Confirmation rule: submitter cannot self-confirm; requires another verifier.
- Historical visibility: keep visible with clear “Historical” label; prompt for refresh.
- Audit retention: keep significant events; prune trivial actions to avoid noise.

## MVP Checklist
- CRUD for org/tech with dedupe/merge.
- Claim submission and evidence attachment (one URL is enough).
- Verifier queue with Confirm/Return and COI guard.
- Freshness job to demote stale Confirmed to Historical.
- Public read pages (search + detail) with status labels and evidence links.
- Admin console for user roles and freshness config.

## Non-Goals (v3)
- Reputation scores, badges, or community voting.
- Complex workflows (challenges auto-changing status).
- Broad infra taxonomy beyond BEAM + essential runtime deps (DB/cache/messaging).
