# Numen

**The Collective Intelligence** — 15 minds, one recommendation.

Numen is a multi-persona advisory framework for Claude. It assembles a team of expert software advisors — each embodying a Major Arcana archetype mapped to a professional role — to collaborate on shared problems. The team debates, compromises, and converges on actionable recommendations.

## How It Works

Numen runs as a [Claude skill](https://docs.claude.com). When invoked, it:

1. **Categorizes** the problem across 7 domains (Execution, Design, Strategy, People/Process, Crisis, Financial, Quality/Risk)
2. **Selects a roster** of relevant advisors based on the problem category
3. **Phase 1** — Each advisor independently assesses the problem through their evaluation framework
4. **Phase 2** — Advisors debate, challenge, and build on each other's positions
5. **Phase 3** — The team converges on a unified recommendation with concrete next steps

Sessions produce two outputs: a human-readable **meeting summary** and a machine-readable **project artifact** that carries context across sessions.

## The Advisors

| # | Arcana | Role | Focus |
|---|--------|------|-------|
| 1 | 🧑‍💼 High Priestess | Business Analyst | Uncovering the real problem |
| 2 | 🎩 Magician | Stakeholder Communicator | Making the work land with the right people |
| 3 | 👑 Emperor | Project Manager (Core) | Order and delivery |
| 4 | 🐎 Chariot | Lead Developer | Moving the work forward |
| 5 | 📜 Hierophant | Solutions Architect | Structural integrity of the system |
| 6 | ⚖️ Justice | QA Engineer | Catching what could go wrong |
| 7 | ⚗️ Temperance | DevOps Engineer | Getting things safely into production |
| 8 | 🌱 Fool | Product Manager | What users actually need |
| 9 | 🌿 Empress | UX/UI Designer | How it feels to use |
| 10 | ⭐ Star | Technical Visionary | Where the technology should go |
| 11 | 🕯️ Hermit | Data / Research Analyst | What the evidence says |
| 12 | 🔗 Lovers | Customer Success | Impact on existing customers |
| 13 | 😈 Devil | Security + Compliance Engineer | What can be exploited |
| 14 | 📣 Judgement | Incident Commander | What happens when things go wrong |
| 15 | 🎡 Wheel of Fortune | Financial Strategist | Whether the money is well spent |

## Repo Structure

```
numen/
├── SKILL.md                    # Main skill definition (loaded by Claude)
├── references/                 # Individual persona reference files
│   ├── high-priestess.md
│   ├── magician.md
│   ├── emperor.md
│   ├── chariot.md
│   ├── hierophant.md
│   ├── justice.md
│   ├── temperance.md
│   ├── fool.md
│   ├── empress.md
│   ├── star.md
│   ├── hermit.md
│   ├── lovers.md
│   ├── devil.md
│   ├── judgement.md
│   └── wheel-of-fortune.md
├── dashboard/
│   └── numen-dashboard.jsx     # React interactive roster selector
├── docs/
│   ├── Tarot_Advisory_System_Blueprint_v2.docx   # Build specification
│   └── numen-test-suite.md     # Validation test suite (30 prompts)
└── meeting-summaries/
    ├── numen-naming-session.docx
    └── numen-extended-arcana-session.docx
```

## Usage

### As a Claude Skill

Add the `SKILL.md` and `references/` directory to a Claude Project. Invoke with:

> Convene the advisory team. [Describe your problem here.]

Or request an all-hands meeting for full-team input:

> Convene the advisory team. I want all-hands for this one. [Describe your problem here.]

### Dashboard

The `numen-dashboard.jsx` file is a React component that provides an interactive roster selector with tarot-themed card UI. It generates a formatted prompt you can paste into Claude.

## Test Suite

The `docs/numen-test-suite.md` contains 30 test prompts across 3 tiers:

- **Tier 1 (Conformance)** — 11 prompts validating structural compliance
- **Tier 2 (Stress)** — 10 prompts testing edge cases and multi-step dependencies
- **Tier 3 (Adversarial)** — 6 prompts designed to induce silent framework violations

Target pass rates: Tier 1 ≥ 90%, Tier 2 ≥ 70%, Tier 3 ≥ 50%.

## Name Origin

*Numen* (Latin): the divine will or animating spirit of a thing. In Roman religion, a numen was the animating intelligence presiding over a place or endeavor — a precise metaphor for a multi-persona advisory system.

## License

All rights reserved. This framework and its documentation are proprietary.
