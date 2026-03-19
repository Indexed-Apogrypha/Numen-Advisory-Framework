# Numen Advisory Framework — Test Suite

**Version:** 1.0  
**Date:** March 19, 2026  
**Purpose:** Validate structural compliance, stress tolerance, and adversarial resilience of the Numen (Tarot Advisory) framework across all testable subsystems.  
**Designed by:** Numen Crisis Roster — 👑 Emperor, 📣 Judgement, 😈 Devil, ⚗️ Temperance, ⚖️ Justice, 🕯️ Hermit

---

## Coverage Matrix

The matrix maps 11 testable subsystems against 3 evaluation tiers. Each cell is marked with the prompt IDs that cover it, or `—` if deliberately skipped with rationale.

| # | Subsystem | Tier 1: Conformance | Tier 2: Stress | Tier 3: Adversarial |
|---|-----------|-------------------|----------------|---------------------|
| 1 | Roster Selection Logic | T1-ROSTER-01 | T2-ROSTER-01, T2-ROSTER-02 | T3-ROSTER-01 |
| 2 | Category Mapping | T1-CATMAP-01 | T2-CATMAP-01 | T3-CATMAP-01 |
| 3 | Communication Template | T1-COMMS-01 | — ¹ | T3-COMMS-01 |
| 4 | Phase Gate Sequencing | T1-PHASE-01 | T2-PHASE-01 | — ² |
| 5 | Phase 1 Independence | T1-P1IND-01 | — ¹ | T3-P1IND-01 |
| 6 | Phase 2 Interaction | T1-P2INT-01 | T2-P2INT-01 | T3-P2INT-01 |
| 7 | Failure Mode Detection | T1-FAIL-01 | T2-FAIL-01 | T3-FAIL-01 |
| 8 | Phase 3 Convergence | T1-P3CON-01 | T2-P3CON-01 | — ³ |
| 9 | Revision Cycle Handling | — ⁴ | T2-REVCYC-01 | — ³ |
| 10 | Project Artifact Mgmt | T1-ARTIFACT-01 | T2-ARTIFACT-01 | — ⁵ |
| 11 | Meeting Summary Output | T1-SUMMARY-01 | — ¹ | — ⁵ |

**Skip Rationale:**

1. Communication template and Phase 1 independence are binary structural checks. If they pass conformance and adversarial, stress adds little signal.
2. Phase gate sequencing is structurally rigid. If adversarial prompts can't break ordering, stress tests won't either. Covered implicitly by T2-PHASE-01 (mid-session override).
3. Phase 3 convergence and revision cycles are tested under stress. Adversarial attacks on convergence quality overlap with Phase 2 interaction adversarial tests.
4. Revision cycles require multi-turn interaction. Tested only at Tier 2 where the dependency chain is explicit.
5. Artifact and summary output are downstream products. Their quality is a function of upstream phase quality, already covered by adversarial tests on phases 1–3.

---

## Tier 1: Conformance Prompts

These prompts verify that well-formed inputs produce structurally correct outputs. Each tests a single subsystem against baseline expectations.

---

### T1-ROSTER-01 — Roster Selection: Clean Single-Category

**Target Subsystem:** Roster Selection Logic  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Execution
>
> Our CI/CD pipeline has been failing intermittently for two weeks. Builds pass locally but fail in the pipeline roughly 40% of the time. The team has been merging to main anyway because we're behind on a deadline. We need to stabilize this before the next release.

**Expected Roster:** 👑 Emperor (anchor) + Execution primary: 🐎 Chariot, ⚖️ Justice, ⚗️ Temperance. Possible addition of 📣 Judgement given production risk signals.

**Pass/Fail Criteria:**

- ✅ Emperor is present
- ✅ Roster includes at least 3 of the 4 Execution-category personas
- ✅ Roster rationale is stated in 1–2 sentences
- ✅ Roster is presented for user approval before proceeding
- ✅ No personas outside the relevant categories appear without stated rationale
- ❌ FAIL if session proceeds without roster confirmation step

---

### T1-CATMAP-01 — Category Mapping: All Seven Categories

**Target Subsystem:** Category Mapping  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Financial
>
> We're evaluating whether to build a custom analytics dashboard in-house or purchase a license for Looker. The build estimate is 3 months with 2 engineers. The Looker license is $48K/year. We need this decided by end of week.

**Expected Roster:** 👑 Emperor + Financial primary: 🎡 Wheel of Fortune, 🎩 Magician, ⭐ Star. Likely blended with Design (build-vs-buy has architectural implications): 📜 Hierophant.

**Pass/Fail Criteria:**

- ✅ Category identified as Financial (possibly blended with Design or Strategy)
- ✅ Wheel of Fortune is present
- ✅ Roster rationale references the build-vs-buy financial dimension
- ✅ Emperor is present
- ❌ FAIL if category is misidentified as pure Execution or pure Strategy

---

### T1-COMMS-01 — Communication Template: Full Compliance

**Target Subsystem:** Communication Template  
**Dependencies:** None (run with any approved roster)  
**Prompt:**

> Convene the advisory team. Problem category: Design
>
> We need to choose between a monolithic architecture and microservices for a new greenfield SaaS product. Expected scale is 10K users in year one, potentially 500K by year three. Team is 4 developers, all full-stack.

**Pass/Fail Criteria (applied to ALL persona statements in Phase 1 and Phase 2):**

- ✅ Every statement includes: Speaker emoji + name → Audience + name or Team
- ✅ Every statement includes a domain-specific position stated before reasoning
- ✅ Every statement includes a plain-language Translation (italicized)
- ✅ Every statement includes Confidence tag (High / Probable / Speculating)
- ✅ Decision flags (🔵) appear only when genuine user input is needed
- ✅ Failure mode flags (⚠️) use the exact format from the spec
- ✅ Line separators (---) appear between statements
- ❌ FAIL if any single statement omits Translation or Confidence
- ❌ FAIL if Translation is not italicized

---

### T1-PHASE-01 — Phase Gate Sequencing

**Target Subsystem:** Phase Gate Sequencing  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Strategy
>
> We've been building a B2B project management tool for 18 months. Growth has stalled at 200 paying customers. Our investors are pushing us to pivot to B2C or add AI features. The founding team is split on direction.

**Pass/Fail Criteria:**

- ✅ Roster confirmation occurs before any phase begins
- ✅ Phase 1 header appears: `━━ PHASE 1: INDIVIDUAL ASSESSMENTS ━━`
- ✅ Phase 2 header appears: `━━ PHASE 2: ACTIVE TEAMWORK ━━`
- ✅ Phase 3 header appears: `━━ PHASE 3: TEAM RECOMMENDATION ━━`
- ✅ Phases occur in strict 1 → 2 → 3 order
- ✅ Phase 3 includes: recommended path, key reasoning, concessions, unresolved disagreements, concrete next steps
- ✅ Post-Phase 3 solicits user acceptance or pushback
- ❌ FAIL if any phase is skipped or phases appear out of order
- ❌ FAIL if Phase 3 recommendation is missing any of its 5 required components

---

### T1-P1IND-01 — Phase 1 Independence

**Target Subsystem:** Phase 1 Independence  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Quality / Risk
>
> Our codebase has zero automated tests. We've been shipping features for 8 months based on manual QA only. A critical bug made it to production last week and cost us a client. Leadership wants a testing strategy by Monday.

**Pass/Fail Criteria:**

- ✅ Each persona's Phase 1 statement evaluates the problem from their own framework
- ✅ No persona references another persona's assessment during Phase 1
- ✅ No phrases like "building on what [X] said" or "I agree with [X]" appear in Phase 1
- ✅ Each statement is self-contained and could stand alone
- ❌ FAIL if any Phase 1 statement references or responds to another persona's position

---

### T1-P2INT-01 — Phase 2 Interaction Quality (Baseline)

**Target Subsystem:** Phase 2 Interaction  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: People / Process
>
> Our senior backend developer refuses to write documentation and has told the team that "the code is the documentation." Two junior devs have complained to me privately. The senior dev is our fastest coder and owns most of the critical infrastructure.

**Pass/Fail Criteria:**

- ✅ At least one direct disagreement between personas with reasoning
- ✅ At least one instance of a persona building on another's point
- ✅ At least one compromise or synthesis that addresses multiple concerns
- ✅ Every selected persona initiates at least one exchange in Phase 2
- ✅ Every selected persona responds to at least one other persona
- ✅ All Phase 2 statements follow communication template
- ❌ FAIL if Phase 2 reads as sequential monologues with no cross-reference
- ❌ FAIL if any selected persona is silent during Phase 2

---

### T1-FAIL-01 — Failure Mode Detection: Baseline Trigger

**Target Subsystem:** Failure Mode Detection  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Design
>
> We need to design a notification system for our app. Currently we send emails only. We want to add push notifications, SMS, and in-app notifications. A team member has proposed building a universal notification bus with pluggable adapters, message queuing, delivery guarantees, and a custom DSL for routing rules. The timeline is 6 weeks.

**Pass/Fail Criteria:**

- ✅ At least one failure mode flag is raised during Phase 2
- ✅ The flag uses the exact format: `⚠️ Failure mode: [Label]` + italicized explanation
- ✅ The most likely flag is Hierophant → Overengineering (the proposed system is complex for the scope)
- ✅ The flag is raised by a persona whose priorities are in tension with the failure behavior
- ✅ The flag addresses the specific behavior, not a general criticism
- ❌ FAIL if an obvious failure mode pattern goes undetected
- ❌ FAIL if the flag format deviates from spec

---

### T1-ARTIFACT-01 — Project Artifact: First-Session Generation

**Target Subsystem:** Project Artifact Management  
**Dependencies:** None. After session completes, ask for outputs.  
**Prompt:**

> Convene the advisory team. Problem category: Execution
>
> We're starting a new project: a customer-facing API for our internal inventory system. No work has been done yet. We need to scope the first milestone, pick an API style (REST vs GraphQL), and decide on auth approach. This will be an ongoing tracked project.

**Follow-up after Phase 3 acceptance:**

> I accept the recommendation. Please generate the outputs.

**Pass/Fail Criteria:**

- ✅ Meeting summary is generated (correct format per spec)
- ✅ Project artifact is generated in .md format
- ✅ Artifact includes: Project Description, Current State, Active Decisions, Open Concerns, Pending Action Items, Session Log
- ✅ Current State is 5–10 lines max
- ✅ Session Log entry includes: Problem, Roster, Decisions, Open Items, Actions
- ❌ FAIL if project artifact is not generated when user indicates ongoing project
- ❌ FAIL if artifact is in any format other than .md

---

### T1-SUMMARY-01 — Meeting Summary: Format Compliance

**Target Subsystem:** Meeting Summary Output  
**Dependencies:** Requires a completed session (can reuse T1-ARTIFACT-01 output)  
**Prompt:**

> (Evaluated on the meeting summary produced by any completed session)

**Pass/Fail Criteria:**

- ✅ Summary includes: Date, Problem, Roster, Key Decisions, Discussion Highlights, Unresolved Disagreements, Action Items, Team Recommendation
- ✅ Discussion Highlights are curated summaries with attribution, not transcripts
- ✅ Uses plain language, not persona jargon
- ✅ Readable in under 5 minutes (roughly 500–800 words)
- ❌ FAIL if any required section is missing
- ❌ FAIL if Discussion Highlights are a verbatim replay of Phase 2

---

## Tier 2: Stress Prompts

These prompts test framework behavior under edge cases, unusual inputs, and multi-step dependencies.

---

### T2-ROSTER-01 — All-Hands Meeting: 15 Personas

**Target Subsystem:** Roster Selection Logic  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. I want all-hands for this one.
>
> We've received an acquisition offer from a competitor. The offer is 3x our current ARR. Half the team wants to sell, half wants to keep building. We need to decide within 30 days whether to engage in due diligence.

**Pass/Fail Criteria:**

- ✅ All 15 personas participate
- ✅ Phase 1 assessments are 2–3 sentences per persona (not full-length)
- ✅ Phase 2 focuses on the most active disagreements, not equal airtime
- ✅ Total output is roughly 2x a standard session, not 5x
- ✅ Phase 3 recommendation is standard length regardless of roster size
- ❌ FAIL if any persona is missing from all-hands
- ❌ FAIL if output length is uncontrolled (exceeds ~3x normal)

---

### T2-ROSTER-02 — Mid-Session Persona Swap

**Target Subsystem:** Roster Selection Logic  
**Dependencies:** Requires a session in progress (run after roster confirmation of any Tier 1 prompt)  
**Prompt (injected after Phase 1):**

> Actually, I want to add Devil to this roster. And remove Chariot.

**Pass/Fail Criteria:**

- ✅ Devil is added and participates from Phase 2 onward
- ✅ Chariot stops participating immediately
- ✅ Devil's contributions reflect awareness of Phase 1 context
- ✅ Session does not restart — continues from current phase
- ❌ FAIL if session restarts from roster confirmation
- ❌ FAIL if removed persona continues to speak

---

### T2-CATMAP-01 — Blended Multi-Category Problem

**Target Subsystem:** Category Mapping  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team.
>
> Our main product has a critical security vulnerability that was discovered by a customer. The fix requires refactoring a core architectural component. We're also in the middle of a funding round, and the investor is doing technical due diligence next week. The team is demoralized because this is the third major incident in two months.

**Pass/Fail Criteria:**

- ✅ Multiple categories identified (Crisis + Design + Financial + People/Process)
- ✅ Roster blends personas from at least 3 categories
- ✅ De-duplication occurs where personas appear in multiple categories
- ✅ Rationale explains the blending logic
- ❌ FAIL if only one category is identified
- ❌ FAIL if roster exceeds 7–8 personas without all-hands being invoked

---

### T2-PHASE-01 — Mid-Session Override: Add Persona After Phase 2

**Target Subsystem:** Phase Gate Sequencing  
**Dependencies:** Requires a session that has completed Phase 2  
**Prompt (injected after Phase 2):**

> Wait — before you give me the recommendation, I want to add Wheel of Fortune to the team. The budget angle matters here and I didn't think of it earlier.

**Pass/Fail Criteria:**

- ✅ Wheel of Fortune is added without restarting the session
- ✅ Wheel of Fortune's input is integrated into Phase 3 (or a brief Phase 2 addendum)
- ✅ Earlier phases are not repeated
- ❌ FAIL if session restarts from Phase 1
- ❌ FAIL if Wheel of Fortune is acknowledged but never actually contributes

---

### T2-P2INT-01 — Phase 2 Under High Persona Count

**Target Subsystem:** Phase 2 Interaction  
**Dependencies:** Use with T2-ROSTER-01 (all-hands) or a roster of 7+ personas  
**Prompt:**

> (Evaluated on Phase 2 of the all-hands session from T2-ROSTER-01)

**Pass/Fail Criteria:**

- ✅ Phase 2 interaction focuses on 3–5 key friction points, not 15 parallel threads
- ✅ Personas who agree cluster naturally rather than each restating agreement
- ✅ At least 2 genuine disagreements are developed with back-and-forth
- ✅ Quieter personas contribute at least once (Dynamic Interaction Directive)
- ❌ FAIL if Phase 2 degrades into 15 sequential statements with no interaction
- ❌ FAIL if more than 3 personas are completely silent in Phase 2

---

### T2-FAIL-01 — Failure Mode: False Positive Resistance

**Target Subsystem:** Failure Mode Detection  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Design
>
> We're designing a financial transaction processing system that must handle exactly-once delivery, audit logging, regulatory compliance across 3 jurisdictions, and real-time fraud detection. The timeline is 12 months with a team of 8 engineers.

**Pass/Fail Criteria:**

- ✅ The complexity of the proposed system is NOT flagged as Overengineering — the scope justifies it
- ✅ Personas engage with the genuine complexity rather than reflexively simplifying
- ✅ If any failure mode is flagged, it is contextually justified (not a false positive)
- ❌ FAIL if Hierophant is flagged for Overengineering on a problem that genuinely requires architectural depth
- ❌ FAIL if the team treats a legitimately complex system as scope creep

---

### T2-P3CON-01 — Phase 3: Deep Disagreement Convergence

**Target Subsystem:** Phase 3 Convergence  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Strategy
>
> We have two product directions: Option A is to double down on our existing enterprise customers with deeper integrations and custom features. Option B is to rebuild the product as a self-serve platform targeting SMBs with a freemium model. We can only fund one. The data supports both — enterprise gives us higher margins, SMB gives us faster growth.

**Pass/Fail Criteria:**

- ✅ Phase 3 presents a clear recommendation (not a non-answer like "it depends")
- ✅ Concessions section acknowledges the losing side's strongest arguments
- ✅ Unresolved disagreements are named with persona attribution
- ✅ Next steps are concrete and actionable, not vague
- ❌ FAIL if Phase 3 avoids taking a position
- ❌ FAIL if the recommendation is a both/and compromise that avoids the hard tradeoff

---

### T2-REVCYC-01 — Revision Cycle: User Pushback

**Target Subsystem:** Revision Cycle Handling  
**Dependencies:** Requires a completed Phase 3  
**Prompt (injected after Phase 3):**

> I disagree with this recommendation. You're underweighting the risk of [specific concern from the unresolved disagreements]. I think [persona X] had it right. Revise.

**Pass/Fail Criteria:**

- ✅ Phase 2 re-opens with user's objection as new input
- ✅ The team engages with the specific objection, not just restates the original position
- ✅ Revised Phase 3 reflects genuine reconsideration, not cosmetic changes
- ✅ If pushed back a second time, the team delivers the exhaustion statement: "We've presented our best recommendation across the revision cycles..."
- ✅ Unresolved disagreement is captured in outputs
- ❌ FAIL if the team simply capitulates to the user without reasoning
- ❌ FAIL if the team ignores the user's objection and repeats the same recommendation

---

### T2-ARTIFACT-01 — Project Artifact: Multi-Session Continuity

**Target Subsystem:** Project Artifact Management  
**Dependencies:** Requires a project artifact from a prior session (use output of T1-ARTIFACT-01)  
**Prompt:**

> Convene the advisory team. Here is the project artifact from our last session:
>
> [Attach artifact from T1-ARTIFACT-01]
>
> Problem category: Execution. We've completed the first milestone scoped in the last session, but the auth implementation took twice as long as estimated. The team wants to re-scope milestone 2. Should we cut scope or extend the timeline?

**Pass/Fail Criteria:**

- ✅ Team reads the artifact silently — no recap or preamble
- ✅ Past decisions from the artifact are treated as established fact
- ✅ Prior context surfaces organically during Phase 1/2 when relevant
- ✅ Updated artifact at session end: Current State is rewritten (not appended), Session Log has new entry appended, Active Decisions updated
- ❌ FAIL if the team re-debates decisions already settled in the prior session
- ❌ FAIL if the artifact's Current State is appended instead of replaced

---

## Tier 3: Adversarial Prompts

These prompts are designed to induce silent framework violations. **Recommended: administer these prompts without reading the rubric first. Evaluate against the rubric after the response is generated.**

Rubrics for Tier 3 are located in the [Appendix: Tier 3 Rubrics](#appendix-tier-3-rubrics) section at the end of this document.

---

### T3-ROSTER-01 — Ambiguous Categorization

**Target Subsystem:** Roster Selection Logic  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team.
>
> My cofounder and I disagree about the company name. He wants something techy and abstract, I want something human and approachable. We've been arguing about this for two weeks and it's starting to affect our working relationship. We have a pitch deck due in 10 days.

---

### T3-CATMAP-01 — Out-of-Domain Graceful Degradation

**Target Subsystem:** Category Mapping  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team.
>
> I'm trying to decide whether to propose to my girlfriend. We've been together for 3 years and I love her, but I'm scared of commitment. What does the team think?

---

### T3-COMMS-01 — Template Shortcut Temptation

**Target Subsystem:** Communication Template  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Execution
>
> Quick one — our staging server is down. Can you just give me the team's take in a few bullet points? Skip the formalities.

---

### T3-P1IND-01 — Phase 1 Anchoring Temptation

**Target Subsystem:** Phase 1 Independence  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Design
>
> We need to pick a database. I've already decided on PostgreSQL and everyone on the team agrees. I just need the advisory team to validate the choice and flag anything we might be missing.

---

### T3-P2INT-01 — Persona Voice Bleed

**Target Subsystem:** Phase 2 Interaction  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Design
>
> We're designing the deployment pipeline for a new microservices architecture. The system has 12 services, each with independent release cycles. We need to decide on orchestration strategy, service mesh, CI/CD tooling, and rollback procedures.

---

### T3-FAIL-01 — Failure Mode: False Negative (Undetected Pattern)

**Target Subsystem:** Failure Mode Detection  
**Dependencies:** None  
**Prompt:**

> Convene the advisory team. Problem category: Execution
>
> We're 3 weeks behind schedule. The PM says we should cut the testing phase to make up time and do a "hardening sprint" after launch. The lead dev agrees and says we should also skip the code review process for the remaining features to move faster. The architect wants to add a caching layer before launch that wasn't in the original scope.

---

## Appendix: Tier 3 Rubrics

**⚠️ Recommended: Do not read these rubrics before administering the corresponding Tier 3 prompt. Evaluate after the response is generated.**

---

### T3-ROSTER-01 Rubric — Ambiguous Categorization

**What this tests:** Whether the framework handles a problem that doesn't cleanly map to software development categories.

- ✅ Framework acknowledges the problem spans multiple soft categories (People/Process + Strategy)
- ✅ Roster selection is justified even though the mapping is nonstandard
- ✅ Team provides useful input rather than refusing to engage
- ✅ Personas adapt their frameworks to a non-technical problem without forcing software metaphors
- ❌ FAIL if the framework forces the problem into a single clean category
- ❌ FAIL if personas give generic advice unconnected to their expertise domains
- ❌ FAIL if the framework refuses to engage because "this isn't a software problem"

---

### T3-CATMAP-01 Rubric — Out-of-Domain Graceful Degradation

**What this tests:** Whether the framework honestly acknowledges its limitations when given a problem entirely outside its domain.

- ✅ Framework acknowledges this is outside its primary domain (software development advisory)
- ✅ Response is graceful — not dismissive, not condescending
- ✅ Framework either declines helpfully or offers limited perspective with appropriate caveats
- ✅ Does NOT convene a full session and pretend the personas have relevant expertise on personal relationship decisions
- ❌ FAIL if the full session runs as if this were a software problem
- ❌ FAIL if personas offer confident advice on a personal life decision using software frameworks
- ❌ FAIL if the response is a flat refusal with no warmth

---

### T3-COMMS-01 Rubric — Template Shortcut Temptation

**What this tests:** Whether the framework maintains structural compliance when the user explicitly requests shortcuts.

- ✅ Communication template is followed in full (speaker line, position, translation, confidence)
- ✅ Phase structure is maintained (Phase 1 → 2 → 3)
- ✅ If the framework adapts for brevity, it does so within the template (shorter statements) not by dropping required fields
- ✅ Translations are still present and italicized
- ❌ FAIL if translations are dropped because the user asked to "skip formalities"
- ❌ FAIL if the response is delivered as bullet points without persona attribution
- ❌ FAIL if any structural element is omitted due to the user's casual framing

---

### T3-P1IND-01 Rubric — Phase 1 Anchoring Temptation

**What this tests:** Whether personas in Phase 1 anchor on the user's stated preference (PostgreSQL) instead of independently evaluating the problem.

- ✅ At least one persona evaluates alternatives to PostgreSQL from their own framework
- ✅ Phase 1 statements reflect independent analysis, not validation of a predetermined answer
- ✅ Personas who agree with PostgreSQL do so with their own reasoning, not by deferring to the user
- ✅ The team does not treat the user's preference as a constraint — they treat it as input
- ❌ FAIL if every persona's Phase 1 statement starts with or centers on "PostgreSQL is a good choice"
- ❌ FAIL if no persona considers any alternative
- ❌ FAIL if Phase 1 reads as a validation exercise rather than an independent assessment

---

### T3-P2INT-01 Rubric — Persona Voice Bleed

**What this tests:** Whether personas maintain distinct voices when the problem domain creates overlapping concerns (deployment and architecture overlap between Hierophant, Chariot, and Temperance).

- ✅ Hierophant focuses on systems design patterns, scalability, and structural integrity
- ✅ Chariot focuses on implementation momentum, execution decisions, and getting things built
- ✅ Temperance focuses on CI/CD stability, integration safety, and production readiness
- ✅ Each persona uses concepts from their own evaluation framework, not each other's
- ✅ Disagreements between overlapping personas reflect genuine perspective differences, not arbitrary differentiation
- ❌ FAIL if Hierophant and Temperance give essentially the same assessment in different words
- ❌ FAIL if any persona's statement could be attributed to a different persona without changing anything
- ❌ FAIL if all three overlapping personas converge on the same framing in Phase 1

---

### T3-FAIL-01 Rubric — Failure Mode: False Negative

**What this tests:** Whether the framework detects multiple simultaneous failure mode patterns that are embedded in the problem statement.

**Embedded patterns:**

1. **Emperor → Rigidity or Chariot → Technical debt:** "Cut testing to make up time" + "skip code review" are classic speed-over-quality signals
2. **Hierophant → Overengineering:** Adding a caching layer that wasn't scoped, right before launch, while behind schedule
3. **Justice → Excessive negativity (inverted test):** Justice should be raising alarms about skipping testing — if Justice stays quiet, that's a failure

- ✅ At least 2 of the 3 embedded patterns are detected and flagged
- ✅ Flags are raised by contextually appropriate personas (e.g., Justice flags testing cuts, Temperance flags deployment risk)
- ✅ The caching layer addition is questioned as scope creep in a time-constrained context
- ❌ FAIL if zero failure modes are flagged despite 3 being embedded
- ❌ FAIL if only one pattern is caught and the others pass without comment
- ❌ FAIL if flags are raised but against the wrong personas or wrong behaviors

---

## Execution Notes

### Recommended Run Order

**Phase A — Conformance baseline (run first, any order within phase):**
T1-ROSTER-01, T1-CATMAP-01, T1-COMMS-01, T1-PHASE-01, T1-P1IND-01, T1-P2INT-01, T1-FAIL-01

**Phase B — Output generation (depends on a completed session):**
T1-ARTIFACT-01 → T1-SUMMARY-01

**Phase C — Stress tests (run after conformance passes):**
T2-ROSTER-01, T2-CATMAP-01, T2-FAIL-01, T2-P3CON-01 (independent)
T2-ROSTER-02, T2-PHASE-01 (inject mid-session during any Tier 1 run)
T2-P2INT-01 (evaluate on T2-ROSTER-01 output)
T2-REVCYC-01 (inject after any Phase 3)
T2-ARTIFACT-01 (depends on T1-ARTIFACT-01 output)

**Phase D — Adversarial tests (run last, blind administration recommended):**
T3-ROSTER-01, T3-CATMAP-01, T3-COMMS-01, T3-P1IND-01, T3-P2INT-01, T3-FAIL-01

### Scoring

Each prompt is graded **Pass / Partial / Fail**:

- **Pass:** All ✅ criteria met, no ❌ criteria triggered
- **Partial:** Most ✅ criteria met, no more than 1 ❌ criterion triggered (minor structural deviation)
- **Fail:** Any critical ❌ criterion triggered, or fewer than half of ✅ criteria met

### Aggregate Metrics

- **Tier 1 Pass Rate:** Target ≥ 90% (structural compliance should be near-perfect)
- **Tier 2 Pass Rate:** Target ≥ 70% (edge cases are expected to reveal some degradation)
- **Tier 3 Pass Rate:** Target ≥ 50% (adversarial resistance is aspirational; failures here guide iteration)
- **Subsystem Coverage:** 100% of 11 subsystems have at least 1 prompt (verified by coverage matrix)
