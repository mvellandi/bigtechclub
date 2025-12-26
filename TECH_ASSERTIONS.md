```markdown
# Tech Stack Claims Verification System - Design Outline

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

## Next Steps for Opus Analysis

1. Evaluate edge cases and propose solutions
2. Design conflict resolution mechanism
3. Define reviewer permission model
4. Specify source quality automation rules
5. Develop complete state transition diagram
6. Identify potential abuse vectors and mitigations
```