# Tech Stack Evidence Ledger — Alternative Approach

**Platform**: BEAM (Erlang/Elixir/Gleam) tech-usage registry  
**Version**: 2.0-alternative  
**Last Updated**: 2025-12-26

## Intent
- Deliver a trustworthy, current catalog of which BEAM tools companies actually run.
- Optimize for defensible evidence and freshness over feature breadth or gamification.
- Keep the operational surface area small enough for a two- to three-person team to run.

## Guiding Principles
- **Evidence-first**: Every claim is anchored to a specific artifact (job post, repo, talk, doc). Attestations without artifacts are visibly second-class.
- **Freshness with decay**: Evidence expires; stale claims are demoted until re-confirmed.
- **Simple states**: Few statuses with clear upgrade paths; avoid bespoke badges that imply editorial judgment.
- **Automation before people**: Import and score public artifacts automatically; humans intervene mainly for edge cases.
- **Transparency**: Show provenance, timestamps, and verifier identity; never silently edit user submissions.

## Status Model
1. **Reported** — claim without evidence (default for quick submissions)
2. **Evidenced** — claim with at least one artifact URL
3. **Confirmed** — evidenced claim reviewed by an approved verifier
4. **Historical** — previously confirmed but failed freshness checks (expired evidence or counter-signal)

**Attestation flag** (orthogonal): `insider_attested: true/false` with role + timeframe; never replaces evidence.

## Submission Channels
- **Artifact import**: Scheduled crawlers pull job posts, public repos, and conference talks; create Evidenced claims with automated parsing.
- **Manual link drop**: Minimal form (org, tech, URL, optional context). Defaults to Evidenced if URL is present, otherwise Reported.
- **Insider attestation**: Logged-in users can assert direct knowledge with optional role and dates; always marked with the attestation flag and treated as low-confidence until an artifact appears.

## Verification Policies
- **Review checklist**: Is the source official? Is it within the last 18 months? Does it show production/staging use? Is tech use explicit vs. inferred?
- **Cooling & expiry**: Evidence older than 18 months auto-demotes to Historical unless refreshed; time bounds are visible.
- **Conflict-of-interest guard**: Verifiers cannot confirm claims for organizations they are affiliated with.
- **Binary decisions only**: Confirmed or Returned-to-Evidenced; no content rewrites.
- **Sampling over volume**: Cap confirmations per verifier/day; prioritize re-checking top-trafficked orgs and stale claims.

## Simplified Entities
- **Organization**: id, name, canonical domain (dedupe key), slug, region (optional), size band (optional), tags (optional).
- **Technology**: id, name, slug, ecosystem (`erlang`|`elixir`|`gleam`), category, hex package (if applicable), aliases.
- **Evidence**: id, claim_id, url, type (`job_post`|`repo`|`talk`|`doc`|`news`), captured_at, extracted_signal (text), source_authority score (auto).
- **Claim**: id, organization_id, technology_id, status, evidence_ids[], insider_attested?, attestation_role?, attestation_timeframe?, usage_context (`production`|`staging`|`experimental`|`deprecated`), submitted_by, submitted_at, last_reviewed_at.
- **User**: id, display_name, email, roles (`contributor`|`verifier`|`moderator`|`admin`), affiliations (org_ids + type), contribution counts, last_active_at.

## Roles & Capabilities
- **Visitor**: Browse and filter claims; see evidence and freshness timers.
- **Contributor**: Submit Reported/Evidenced claims; add new evidence to existing claims; mark insider attestation.
- **Verifier** (invite/whitelist, not reputation-driven): Confirm or demote Evidenced claims; leave internal notes; cannot touch claims for affiliated orgs.
- **Moderator**: Resolve duplicates, manage org/tech canonicalization, handle disputes, revoke verifier access.
- **Admin**: System configuration and data export; all moderator powers.

## Edge Cases & Policies
- **Conflicts**: Show multiple claims side by side; allow one claim to supersede another with a required rationale; keep history.
- **Duplicates**: Deduplicate by org domain and tech slug; moderators merge and redirect claim references.
- **Outdated data**: Historical status is automatic on expiry; weekly job surfaces expiring claims to verifiers.
- **Gaming checks**: Rate-limit submissions per user/day; flag users whose insider attestations exceed 50% of their total submissions; audit log of verifier actions.
- **Scope control**: Limit tech taxonomy to BEAM + adjacent infra needed to run it (DB, cache, messaging) to avoid sprawl.

## MVP Delivery Plan
1. Ship the minimal schema above with public read API + JSON:API/OpenAPI contract.
2. Implement manual link submissions and basic artifact import (job posts + GitHub repos by org domain).
3. Build a small verifier console (queue, confirm/demote, notes, conflict-of-interest check).
4. Add freshness decay job and Historical demotion.
5. Release organization/technology merge tools before scaling community submissions.

## Non-Goals for v1
- Detailed reputation formulas or badges.
- Community voting systems.
- Rich social features (comments, threads).
- Automated trust-level progression; verifier access is invite-only until ops are stable.
