# Tech Stack Claims Verification System - Design Outline

**Platform**: Erlang/Elixir/Gleam Ecosystem Tech Usage Database
**Version**: 2.0
**Last Updated**: 2025-12-26

## Core Status Levels
1. **Claimed** - Assertion without evidence
2. **Sourced** - Assertion with reference URL
3. **Verified** - Sourced claim reviewed and confirmed credible

## Submission Paths

### Path A: Standard Submission
```
User submits claim
├─ No source provided → Status: Claimed
└─ Source URL provided → Status: Sourced
    └─ Awaits 3rd party review → Status: Verified (if approved)
```

### Path B: Self-Verification (Insider Knowledge)
```
User submits claim
├─ Marks "I have direct knowledge"
│   ├─ Optional: Role/relationship field
│   ├─ Optional: Context notes
│   └─ Status: Self-Verified (distinct badge)
└─ Can be upgraded later if external source found
```

## Review Process

### Third-Party Verification Criteria
- **Source authority**: Official vs. unofficial channels
- **Recency**: Current vs. outdated information
- **Context**: Production use vs. experimentation
- **Specificity**: Detailed vs. vague mention

### Reviewer Actions
- Single binary decision: Credible / Not Credible
- No content editing allowed
- Only status change capability
- Audit trail: who verified, when

## Edge Cases & Decisions

### Small/Medium Companies
- **Problem**: Little public evidence despite legitimate usage
- **Solution**: Self-verification path with distinct labeling

### Outdated Information
- **Problem**: Source was accurate but tech no longer used
- **Solution**: TBD - flag for re-verification? Deprecation status?

### Conflicting Claims
- **Problem**: Multiple submissions about same company/tech
- **Solution**: TBD - show all with status? Community voting?

### Source Quality Boundaries
- ✅ Credible: Official blogs, job postings, conference talks, verified employee statements
- ⚠️ Questionable: Forum posts, unverified social media, aggregator sites
- ❌ Not credible: TBD - define threshold

## System Design Principles

### Minimize Subjectivity
- Binary gates instead of quality judgments
- Controlled vocabularies (dropdowns for company/tech)
- Fixed schema prevents scope creep
- Clear status labels, not editorial decisions

### Transparency
- All submissions visible regardless of status
- Complete audit trail (submitter, reviewer, timestamps)
- Distinct badges for different verification types
- Community can challenge verifications

### Low Friction
- Minimal required fields (company + tech + status)
- No account walls for initial submission
- Simple URL paste for sourcing
- Single-button verification for reviewers

### Defer Complexity
- Start with three-tier system
- Build dispute resolution only when needed
- Version 1 focus: collect and verify
- Avoid premature optimization

## Open Questions for Further Development

1. **Conflicting claims handling**: How to resolve competing assertions?
2. **Deprecation workflow**: How to mark tech no longer in use?
3. **Reviewer permissions**: Who can verify? Reputation system?
4. **Source quality automation**: Domain allowlists vs. manual review?
5. **Upgrade paths**: How do claims move between statuses?
6. **Display logic**: How to show multiple claims for same company/tech?
7. **Challenge mechanism**: How can community flag incorrect verifications?
8. **Self-verification abuse**: How to prevent misuse without barriers?

## Data Model (Simplified)

```
Claim {
  company: string (dropdown)
  technology: string (dropdown)
  status: "claimed" | "sourced" | "verified" | "self-verified"
  source_url?: string
  submitter_id: string
  submitted_at: timestamp
  
  // Self-verification fields
  direct_knowledge?: boolean
  role_relationship?: string
  context_notes?: string
  
  // Verification fields
  verified_by?: string
  verified_at?: timestamp
  verification_notes?: string
}
```

---

## Entity Definitions

### User Entity

**Identity** (from Zitadel OIDC):
- Zitadel ID (unique external identifier from JWT `sub` claim)
- Email address
- Display name (user-chosen)
- Avatar URL (from OAuth provider)

**Profile Data**:
- Bio (optional, max 500 characters)
- Company affiliations
- GitHub handle (for tech community credibility)
- Website URL

**Contribution Metrics** (calculated):
- Claims submitted count
- Claims verified count (as reviewer)
- Self-verified claims count
- Successful verifications count
- Challenged verifications count

**Reputation & Trust**:
- Reputation score (calculated composite)
- Trust level: `new` → `basic` → `established` → `trusted` → `expert`
- Account creation date
- Last activity timestamp

**Privileges & Roles**:
- Roles: `user`, `reviewer`, `moderator`, `admin`
- Reviewer eligibility (calculated based on criteria)
- Verification privilege unlock timestamp

**Reviewer Eligibility Rules**:
- Account age > 30 days AND
- Claims submitted > 10 AND
- Self-verified claims < 50% of total AND
- No recent moderation actions

**Trust Level Progression**:
- **New** (0-100 rep): 0-7 days, <5 claims
- **Basic** (100-500 rep): 7-30 days, 5-20 claims
- **Established** (500-2000 rep): 30+ days, 20+ claims, 5+ verifications
- **Trusted** (2000-5000 rep): 90+ days, 50+ claims, 20+ verifications, <10% challenge rate
- **Expert** (5000+ rep): 180+ days, 100+ claims, 50+ verifications, <5% challenge rate

### Organization Entity

**Identification**:
- Name (canonical)
- Normalized name (for deduplication)
- URL-friendly slug
- Aliases (alternate names, acronyms)

**Official Identifiers**:
- Website URL
- LinkedIn URL
- GitHub organization
- Stock ticker (for public companies)

**Classification**:
- Industry (tech, finance, healthcare, retail, etc.)
- Industry tags (more granular: fintech, saas, marketplace)
- Company size: `startup`, `small`, `medium`, `large`, `enterprise`
- Employee count range: 1-10, 11-50, 51-200, 201-1000, 1000+
- Funding stage: `bootstrap`, `seed`, `series_a`, `series_b`, `public`, `acquired`
- Geographic region

**Verification & Quality**:
- Verification status: `unverified`, `community_verified`, `officially_verified`
- Duplicate flag (marked as duplicate of another org)
- Canonical organization reference (if duplicate)
- Verification timestamp and verifier

**Public Profile**:
- Description
- Logo URL
- Tech stack count (aggregate)
- Verified stack count (aggregate)
- Profile completeness score

**Duplicate Handling**:
- Fuzzy matching via normalized name + website domain
- Moderators merge duplicates → redirect claims to canonical version
- Audit trail of merged entities
- Community can flag potential duplicates

### Technology Entity

**Identification**:
- Name
- Normalized name (for deduplication)
- URL-friendly slug
- Aliases (common alternate names)

**Ecosystem Classification**:
- Primary ecosystem: `erlang`, `elixir`, `gleam`
- Category: `language`, `web_framework`, `testing_framework`, `database_library`, `auth_library`, `api_framework`, `message_queue`, `cache_library`, `observability_tool`, `dev_tool`, `build_tool`, `deployment_tool`
- Subcategory (more specific)
- Tags (flexible: real-time, distributed, fault-tolerant)

**BEAM Ecosystem Specific**:
- Core BEAM/OTP flag
- Hex package name (canonical identifier)
- Ecosystem compatibility (which BEAM languages it supports)
- Maturity level: `experimental`, `beta`, `stable`, `mature`, `legacy`

**Metadata**:
- Official website
- GitHub repository
- Hex documentation URL
- Description (what the tech does)
- Logo URL

**Usage Metrics** (aggregated):
- Total claims count
- Verified usage count
- Unique organizations using count

**BEAM Ecosystem Categories** (examples):
- **Languages**: Erlang, Elixir, Gleam
- **Web**: Phoenix, Cowboy, Mist
- **API/GraphQL**: Absinthe, AshGraphql, AshJsonApi
- **Testing**: ExUnit, PropCheck, Wallaby
- **Databases**: Ecto, Commanded, EventStore
- **Real-time**: Phoenix Channels, Phoenix LiveView
- **Observability**: Telemetry, AppSignal, Sentry

### Claim Entity (Enhanced)

**Core Fields** (existing):
- Organization reference
- Technology reference
- Status: `claimed`, `sourced`, `verified`, `self_verified`
- Source URL (optional)
- Submitter reference

**Self-Verification Fields**:
- Direct knowledge flag
- Relationship type: `current_employee`, `former_employee`, `contractor`, `founder`, `tech_lead`
- Role context ("Backend Engineer", "CTO", etc.)
- Knowledge notes (additional context)
- Employment timeframe: `current`, `within_1_year`, `1_3_years_ago`, `3plus_years_ago`

**Verification Fields**:
- Verified by (user reference)
- Verified at (timestamp)
- Verification decision: `credible`, `not_credible`
- Verification notes
- Source quality rating: `official`, `strong`, `moderate`, `weak`

**Context Metadata**:
- Usage context: `production`, `staging`, `experimental`, `deprecated`, `legacy`
- Usage scale: `core_infrastructure`, `major_component`, `minor_component`, `tooling_only`
- Additional context (freeform, max 1000 chars)
- Confidence level: `certain`, `highly_likely`, `probable`, `uncertain`

**Audit Trail**:
- Created timestamp
- Updated timestamp
- Claim history (relationship to versions)
- Original claim reference (if update/supersede)

**Conflict Resolution**:
- Superseded by (claim reference)
- Conflicts with (list of claim references)
- Resolution status: `active`, `superseded`, `duplicate`, `disputed`, `resolved`
- Dispute reason

**Community Oversight**:
- Flagged for review (boolean)
- Flag count
- Last flagged timestamp
- Last reviewed timestamp

### OrganizationAffiliation Entity

**Purpose**: Links users to organizations for insider knowledge credibility and conflict-of-interest detection.

**Core Fields**:
- User reference
- Organization reference
- Affiliation type: `current_employee`, `former_employee`, `contractor`, `founder`
- Verification status (has user verified this)
- Start date (optional)
- End date (optional)
- Public visibility flag

**Benefits**:
- Enables "Works at X" profile badges
- Validates self-verification credibility
- Detects conflicts of interest for reviewers
- Filters claims by insider vs. outsider perspective

### ClaimRelationship Entity

**Purpose**: Tracks relationships between claims for conflicts, updates, and evolution.

**Core Fields**:
- Source claim reference
- Target claim reference
- Relationship type: `supersedes`, `conflicts_with`, `duplicates`, `supports`
- Created by (user reference)
- Created timestamp
- Resolution status: `active`, `resolved`

**Use Cases**:
- Track claim version history
- Identify contradictory claims
- Merge duplicate submissions
- Build claim evolution timeline

---

## Entity Relationships

### User ↔ Claim

- **User → Claims Submitted**: User has many claims (as submitter)
- **User → Claims Verified**: User has many claims verified (as reviewer)
- **Claim → Submitter**: Claim belongs to one user (submitter)
- **Claim → Verifier**: Claim belongs to one user (verifier, optional)

### Organization ↔ Claim

- **Organization → Claims**: Organization has many claims (about its tech usage)
- **Organization → Verified Claims**: Filtered subset of verified claims only
- **Organization → Technologies**: Many-to-many through claims
- **Claim → Organization**: Claim belongs to one organization

### Technology ↔ Claim

- **Technology → Claims**: Technology has many usage claims
- **Technology → Verified Claims**: Filtered subset of verified claims only
- **Technology → Organizations**: Many-to-many through claims (companies using this tech)
- **Claim → Technology**: Claim belongs to one technology

### User ↔ Organization (via OrganizationAffiliation)

- **User → Affiliations**: User has many organization affiliations
- **Organization → Affiliated Users**: Organization has many affiliated users
- **Purpose**: Establishes insider credibility and enables conflict-of-interest checks

### Claim ↔ Claim (via ClaimRelationship)

- **Claim → Supersedes**: Claim can supersede other claims
- **Claim → Conflicts With**: Claim can conflict with other claims
- **Claim → Duplicates**: Claim can duplicate other claims
- **Purpose**: Version tracking and dispute resolution

---

## User Roles & Affordances

### Anonymous Users

**Can**:
- View all claims (all statuses visible with clear labels)
- View organization profiles and tech stacks
- View technology usage statistics
- Search and filter claims
- Browse leaderboards

**Cannot**:
- Submit claims
- Verify claims
- Flag content

### Registered Users (Default Role)

**Can**:
- All anonymous user permissions, plus:
- Submit new claims (any status path)
- Edit own unverified claims
- Delete own unverified claims
- Mark claims with direct knowledge (self-verification)
- Declare organization affiliations
- View personal submission history
- Track contribution statistics

**Cannot**:
- Verify others' claims (until reviewer unlocked)
- Edit verified claims
- Perform moderation actions

### Reviewer (Unlockable Privilege)

**Eligibility** (automatic unlock when criteria met):
- Account age > 30 days
- Claims submitted > 10
- Self-verified claims < 50% of total
- No moderation strikes
- Trust level ≥ `basic`

**Can**:
- All registered user permissions, plus:
- Verify others' sourced claims (binary: credible/not credible)
- Leave verification notes (internal)
- Access verification queue
- View source quality guidelines
- See personal verification statistics

**Cannot**:
- Verify own claims
- Verify claims about affiliated organizations (conflict of interest)
- Edit claim content (only status change)

**Limits**:
- Maximum 5 verifications per day

**Accountability**:
- All verifications logged in audit trail
- Community can challenge verifications
- High challenge rate (>20%) triggers review
- Repeated poor decisions → privilege revoked

### Moderator (Invitation-Only Role)

**Selection Criteria**:
- Invitation from admins
- 50+ accurate verifications
- Trust level: `trusted` or higher
- Active for 6+ months
- Good community standing

**Can**:
- All reviewer permissions, plus:
- Resolve claim conflicts
- Merge duplicate organizations
- Merge duplicate technologies
- Handle flagged content
- Temporarily restrict users
- Edit claim metadata (categorization only, not content)
- Access moderation queue
- View moderation audit log

**Cannot**:
- Delete claims (only archive)
- Edit verified claims without creating new version

**Accountability**:
- All actions logged
- Reviewable by admins
- Community oversight

### Admin (System Role)

**Can**:
- All moderator permissions, plus:
- Assign/revoke moderator role
- Access full system audit trail
- Configure system settings
- Override restrictions (all logged)
- Export data for analysis
- Ban users (extreme cases only)

**Accountability**:
- All actions logged
- Regular transparency reports
- Subject to community feedback

### Affordance Matrix

| Action | Anonymous | Registered | Reviewer | Moderator | Admin |
|--------|-----------|------------|----------|-----------|-------|
| View claims | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit claim | ❌ | ✅ | ✅ | ✅ | ✅ |
| Self-verify claim | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit own unverified claim | ❌ | ✅ | ✅ | ✅ | ✅ |
| Delete own unverified claim | ❌ | ✅ | ✅ | ✅ | ✅ |
| Verify others' claims | ❌ | ❌ | ✅ | ✅ | ✅ |
| Flag claim for review | ❌ | ✅ | ✅ | ✅ | ✅ |
| Resolve conflicts | ❌ | ❌ | ❌ | ✅ | ✅ |
| Merge duplicates | ❌ | ❌ | ❌ | ✅ | ✅ |
| Restrict users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Assign roles | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Contributor Recognition System

### Philosophy

- **Meritocratic**: Based on quality contributions, not volume alone
- **Transparent**: Clear criteria for unlocks and recognition
- **Intrinsic Motivation**: Recognition over external rewards
- **Anti-Gaming**: Safeguards against manipulation

### Reputation Score Calculation

**Base Formula**:

```
reputation_score =
  (claims_submitted × 2) +
  (verified_claims_submitted × 3) +
  (self_verified_claims × 1.5) +
  (verifications_performed × 5) +
  (accurate_verifications × 10) -
  (challenged_verifications × 15) -
  (moderation_strikes × 50)
```

**Modifiers**:
- **Accuracy Multiplier**: If verification accuracy > 90%, multiply total by 1.2
- **Diversity Bonus**: Claims across many organizations (+10% per 10 unique orgs)
- **Ecosystem Breadth**: Claims across multiple tech categories (+5% per category)
- **Age Discount**: Older contributions decay slightly (5% per year, capped at 25%)

### Trust Levels & Unlocks

#### Level 1: New (0-100 reputation)

**Criteria**: Account created, <7 days old

**Badges**: None

**Privileges**: Submit claims only

#### Level 2: Basic (100-500 reputation)

**Criteria**:
- Account age > 7 days
- 5+ claims submitted
- No moderation strikes

**Badges**: "Contributor" badge

**Privileges**:
- Flag claims for review
- Declare organization affiliations

#### Level 3: Established (500-2000 reputation)

**Criteria**:
- Account age > 30 days
- 20+ claims submitted
- 5+ verifications OR 10+ verified claims submitted
- <20% challenge rate on verifications

**Badges**: "Established Contributor" badge

**Privileges**:
- Unlock reviewer status (if eligible)
- Access to contributor leaderboard
- Profile appears in "Notable Contributors" section

#### Level 4: Trusted (2000-5000 reputation)

**Criteria**:
- Account age > 90 days
- 50+ claims submitted
- 20+ accurate verifications
- <10% challenge rate
- Verification accuracy > 80%

**Badges**: "Trusted Reviewer" badge

**Privileges**:
- Weighted votes in conflict resolution (future feature)
- Moderator nomination pool invitation
- Access to beta features

#### Level 5: Expert (5000+ reputation)

**Criteria**:
- Account age > 180 days
- 100+ claims submitted
- 50+ accurate verifications
- <5% challenge rate
- Verification accuracy > 90%
- Active across multiple ecosystems

**Badges**: "Expert" badge (top tier)

**Privileges**:
- Recognition on homepage
- Quarterly contributor spotlight
- Input on platform roadmap
- Priority support

### Leaderboards & Visibility

**Public Leaderboards**:

1. **Top Contributors (All Time)**
   - Ranked by reputation score
   - Shows: username, badge, total contributions, join date

2. **Top Reviewers (Last 90 Days)**
   - Ranked by accurate verifications
   - Shows: username, verifications performed, accuracy rate

3. **Most Active (Last 30 Days)**
   - Ranked by recent contributions
   - Encourages ongoing engagement

4. **Rising Stars (New Users)**
   - Users at trust level 1-2 with high activity
   - Encourages newcomers

**Profile Visibility**:
- Badges displayed prominently
- Contribution statistics (public by default, can be hidden)
- Recent activity feed
- Technology expertise areas (inferred from claims)
- Organization affiliations (if marked public)

### Anti-Gaming Safeguards

**Volume Limits**:
- Max 10 claims per day (prevents spam)
- Max 5 verifications per day (prevents rubber-stamping)
- Self-verified claims capped at 50% of total (prevents conflict of interest abuse)

**Quality Gates**:
- Verified claims weighted higher than unverified
- Challenged verifications penalize heavily
- Moderation strikes have severe impact

**Conflict of Interest Detection**:
- Cannot verify claims about affiliated organizations
- System flags potential conflicts based on affiliations
- High concentration of claims to one org triggers review

**Pattern Detection**:
- Flag suspicious patterns (all claims to same org, rapid submissions)
- Sudden reputation spikes trigger manual review
- Cross-reference with moderation reports

**Cooldown Periods**:
- After moderation strike: 30-day probation (limited actions)
- After privilege revocation: 90-day wait before re-evaluation

**Community Oversight**:
- Verification challenges visible to all reviewers
- Community can upvote challenges, triggering mod review
- Moderators review users with high challenge rates

---

## State Transition Diagrams

### Claim Status Flow

```
[NEW SUBMISSION]
      |
      ├─→ No source provided
      |   └─→ Status: Claimed
      |       ├─→ Later: Add source → Sourced (awaits review)
      |       └─→ Stay: Remains Claimed (lowest credibility)
      |
      ├─→ Source URL provided
      |   └─→ Status: Sourced
      |       ├─→ Reviewer: Credible → Verified
      |       └─→ Reviewer: Not Credible → Remains Sourced
      |
      └─→ "I have direct knowledge" checked
          └─→ Status: Self-Verified
              ├─→ Later: Source found → upgrade to Sourced → Verified
              ├─→ Community challenge → Flagged for review
              └─→ Conflicting insider claim → Dispute resolution
```

### User Trust Progression

```
New (0-100 rep)
  ↓ (7 days + 5 claims)
Basic (100-500 rep)
  ↓ (30 days + 20 claims + 5 verifications)
Established (500-2000 rep) → Unlock: Reviewer privilege
  ↓ (90 days + 50 claims + 20 verifications + <10% challenge rate)
Trusted (2000-5000 rep) → Unlock: Moderator nomination
  ↓ (180 days + 100 claims + 50 verifications + <5% challenge rate)
Expert (5000+ rep) → Unlock: Public recognition
```

### Verification Workflow

```
Claim with Status: Sourced
  ↓
Enters Verification Queue (visible to reviewers)
  ↓
Reviewer (no COI) assesses source
  ↓
  ├─→ Decision: Credible
  |   ├─→ Update: Status → Verified
  |   ├─→ Audit: Log reviewer, timestamp
  |   └─→ Reputation: Reviewer +5 points
  |
  └─→ Decision: Not Credible
      ├─→ Update: Verification note added
      ├─→ Status: Remains Sourced (or flag for review)
      └─→ Reputation: No penalty to submitter
```

---

## Enhanced Edge Cases & Solutions

### Conflicting Claims

**Scenario**: Two claims for Company X + Technology Y with different statuses/contexts

**Solution for v1**:
1. **Display All Claims**: Show both with distinct labels
   - "Verified (Production Use)" vs "Claimed (Experimental)"
   - Let users see multiple perspectives
2. **Conflict Flagging**: If claims contradict, flag as disputed
3. **Moderator Resolution**: Moderators can:
   - Mark one as superseded (if timeline-based)
   - Request additional context from submitters
   - Create composite view ("Production 2020-2023, now deprecated")

**Future v2**:
- Community voting system
- Weighted by trust level

### Outdated Information

**Scenario**: Company used Elixir in 2018, source accurate but outdated

**Solution**:
1. **Time Decay**: Claims >2 years without updates flagged for review
2. **Re-verification Prompt**: Ask original submitter or insiders to update
3. **Usage Context Update**: Set usage_context to `deprecated` or `legacy`
4. **Submitter Update**: Allow claim creators to mark "No longer in use"

**Future**:
- Timeline view showing tech stack evolution over time

### Source Quality Boundaries (Expanded)

**Credible Sources** (high confidence for Sourced status):
- Official company engineering blogs
- Company careers/jobs pages listing tech requirements
- Official conference talks (YouTube, InfoQ)
- GitHub repos with organization name in owner
- Official product documentation
- Technical case studies

**Questionable Sources** (flag for manual review):
- Reddit posts (unless from verified employee)
- Twitter/X posts (unless verified account)
- StackOverflow posts
- Aggregator sites (BuiltWith, StackShare - often outdated)
- Tech news articles without direct quotes

**Not Credible** (auto-reject):
- Personal blogs without evidence
- Competitor sites making claims
- Scraped/aggregated data without primary source
- Promotional content without verification

**For v1**: Manual reviewer assessment with guidelines
**Future v2**: Domain allowlist automation

### Self-Verification Abuse Prevention

**Risk**: Users falsely claim to work at companies

**Mitigations**:

1. **Distinct Labeling**: Self-verified clearly marked as "Insider Knowledge, Unverified"
2. **Visual Differentiation**: Different badge/color than third-party verified
3. **Statistical Limits**: 50% cap on self-verified claims per user
4. **Community Challenge**: Easy "Flag" button with "I work here, this is incorrect" option
5. **Reputation Impact**: Self-verified worth less reputation than externally verified
6. **Conflicting Insider Detection**: Multiple insiders with contradicting claims trigger mod review

**Future Verification**:
- Email domain verification (@company.com)
- LinkedIn integration
- GitHub organization membership

### Duplicate Detection

**Organizations**:
- Normalized name matching (lowercase, strip whitespace)
- Website domain comparison
- Stock ticker matching (for public companies)
- Community flagging ("This is a duplicate of...")
- Moderator merge workflow with audit trail

**Technologies**:
- Normalized name + ecosystem matching
- Hex package name as canonical identifier
- Aliases field for common alternatives
- Community flagging
- Moderator merge capability

**Merge Process**:
1. Community flags potential duplicate
2. Moderator reviews evidence
3. If confirmed, mark as duplicate
4. Redirect all claims to canonical version
5. Create audit trail of merge
6. Update UI to show "Merged with X"

---

## Ash Framework Alignment

This section provides conceptual mapping to Ash Framework patterns (not implementation details).

### Resources

Each entity maps to an Ash resource:
- `User` (with AshAuthentication for OIDC)
- `Organization`
- `Technology`
- `Claim`
- `OrganizationAffiliation` (join table)
- `ClaimRelationship` (join table)

### Key Actions

**User Actions**:
- `read` (public profile view)
- `create` (from OIDC first login)
- `update` (profile editing)
- `calculate_reputation` (custom action)
- `unlock_reviewer_privilege` (custom action)

**Organization Actions**:
- `read` (public directory)
- `create` (community-submitted, moderated)
- `update` (moderator edits)
- `merge_duplicate` (moderator custom action)

**Technology Actions**:
- `read` (public directory)
- `create` (community-submitted, moderated)
- `update` (moderator edits)
- `merge_duplicate` (moderator custom action)

**Claim Actions**:
- `read` (all users, filtered by status in UI)
- `create` (authenticated users)
- `update` (submitter only, if unverified)
- `verify` (reviewers only, custom action)
- `challenge` (community flagging)
- `resolve_conflict` (moderators)

### Policies (Authorization)

**Transparency Principle**:
- Anyone can read all resources (public data)

**Actor-Based Authorization**:
- User can update own profile
- User can update own unverified claims
- User can delete own unverified claims

**Role-Based Authorization**:
- Reviewer can verify claims (with COI checks)
- Moderator can resolve conflicts
- Admin can perform any action

**Conflict-of-Interest Detection**:
- Check OrganizationAffiliation before allowing verification
- Block verification if reviewer affiliated with organization

### Aggregates & Calculations

**User**:
- `reputation_score`: Complex calculation from contribution metrics
- `trust_level`: Derived from reputation + account age
- `can_verify`: Boolean eligibility check

**Organization**:
- `tech_stack_count`: Count of related claims
- `verified_stack_count`: Count where status = `verified`
- `profile_completeness_score`: Percentage of filled fields

**Technology**:
- `claims_count`: Total usage claims
- `verified_usage_count`: Claims with status = `verified`
- `organizations_using_count`: Distinct organization count

**Claim**:
- `credibility_score`: Calculation based on status + source quality + verifications + challenges

---

## Resolution of Open Questions

The original document posed 8 open questions. Here are the resolutions:

1. **Conflicting claims handling**: Display all with distinct labels, flag contradictions, moderator resolution (v1); community voting (v2)

2. **Deprecation workflow**: Usage context field (`deprecated`/`legacy`), re-verification prompts, submitter can update status

3. **Reviewer permissions**: Automatic unlock based on clear criteria (30 days + 10 claims + quality metrics); no manual approval needed

4. **Source quality automation**: Manual reviewer assessment with guidelines (v1); domain allowlist automation (v2)

5. **Upgrade paths**: Defined in state diagrams (Claimed → add source → Sourced → review → Verified)

6. **Display logic**: Show all non-duplicate claims with clear status labels and visual differentiation

7. **Challenge mechanism**: Flag button → community can upvote challenges → moderator review at threshold

8. **Self-verification abuse**: Distinct labels + 50% cap + community challenges + future email/LinkedIn verification

---

## Next Steps for Implementation

When ready to build (post-design phase):

1. **Backend Setup**:
   - Create Ash resources for each entity
   - Define actions and policies per role affordances
   - Implement reputation calculation as scheduled job
   - Build reviewer eligibility as calculated attribute
   - Create verification queue filtered view
   - Implement conflict-of-interest detection in verify action

2. **Frontend Development**:
   - User authentication flow (Zitadel OIDC)
   - Claim submission forms (all paths)
   - Verification queue UI (for reviewers)
   - Leaderboards and profile pages
   - Organization and technology directories
   - Search and filter interfaces

3. **Testing**:
   - Unit tests for reputation calculations
   - Integration tests for verification workflows
   - E2E tests for user journeys
   - Test conflict-of-interest detection
   - Test anti-gaming safeguards

4. **Launch Strategy**:
   - Seed initial organizations and technologies (Erlang/Elixir/Gleam ecosystem)
   - Invite beta users from BEAM community
   - Monitor for gaming attempts
   - Iterate on reputation formula based on real data
   - Gather feedback on verification process

---

## Summary

This design specification provides a comprehensive domain model for a crowdsourcing platform focused on BEAM ecosystem (Erlang/Elixir/Gleam) tech usage data:

**Core Entities**: 6 entities (User, Organization, Technology, Claim, OrganizationAffiliation, ClaimRelationship) with detailed properties and relationships

**User Roles**: 5 roles (Anonymous, Registered, Reviewer, Moderator, Admin) with clear affordances and progression paths

**Recognition System**: Meritocratic reputation scoring, 5 trust levels, public leaderboards, anti-gaming safeguards

**Verification Workflow**: Multi-path submission (claimed/sourced/self-verified), binary review decisions, audit trails

**Design Principles Maintained**:
- **Minimize Subjectivity**: Binary decisions, clear criteria
- **Transparency**: All claims visible, complete audit trails
- **Low Friction**: Simple submission, auto-unlock privileges
- **Defer Complexity**: Start simple, add features as needed

The platform enables developers to sell BEAM technologies better while providing CTOs/CEOs with trustworthy usage data, all while recognizing and rewarding active community contributors.