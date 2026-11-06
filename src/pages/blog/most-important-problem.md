---
layout: ../../layouts/BlogPostLayout.astro
title: "The most important problem you've never heard of"
description: "Compute verification is the linchpin of pacing agreements... and only around 25 people are working on it full-time."
date: "2026-09-15"
updated: "2026-11-06"
author: "Daniel Parshall, Ph.D."
area: "compute-verification"
---

*Compute verification is the linchpin of pacing agreements... and only around 25 people are working on it full-time.*

*In alignment with our [AI Usage policy](https://canaryinstitute.ai/about#ai-usage), the Pangram score of [this piece](https://www.pangram.com/history/fa687b98-a828-4dbf-b0e1-75e18dea8bbe): **100% human**.*

---

When you first read about AI risk, it sounds like science fiction, and I'm used to slowly working my way around to the topic, so that I don't sound like a lunatic. But the past week has really changed the conversation!  Some of the highlights:

- [Coxon](https://x.com/hilbertspaess/status/2097476196791709843) triggered [a preference cascade](https://thezvi.substack.com/p/the-extinction-risk-preference-cascade) and discussion about existential risk
- UN [tweeted](https://x.com/UN/status/2099514004368667128) "We may be the last generation able to set the terms on which humanity and machines coexist"
- Anthropic pledged [unilateral commitment to external auditors](https://darioamodei.com/post/we-must-pace-the-frontier)
- OpenAI [agreed to follow suit](https://x.com/sama/status/2098811563415150910)

The profile and commitment to "pacing the frontier" has dramatically risen in the past few days! But note that we only **can** make a deal if we can **verify** that the deal is being kept.  Which, to me, makes it obvious that "compute verification" is the most important problem on Earth, even if you've never heard of it[^trust].

Don't feel bad; hardly anyone has. I dug through [all of the research papers that I could find on it](https://canaryinstitute.ai/research/verification-community/), amounting to ~60 papers total (i.e. you could read literally all accumulated knowledge of the field in a week or so).  Depending on how you slice the numbers, there are about 72 researchers actively working on the problem, and most aren't full-time; I estimate that the global population of folks answering the Most Important Question On Earth is around 25 FTE (well, I got serious about it last month, now it's up to 26).  

I hope you join our ranks!  If you, personally, work on a Verification problem for the next 6 months, you could increase what we know and/or have solved by a couple percentage points; that's HUGE!

---

*Updated November 2026: this post is now the starting point for my work on compute verification. The links below go to everything else.*

## Start here

- **[Open problems in AI compute verification](https://canaryinstitute.ai/research/open-problems/)**: 127 open problems, each traced to the paper or report that posed it, with its current status, sub-questions, and related papers. All of it downloadable as CSV.
- **[The verification community](https://canaryinstitute.ai/research/verification-community/)**: who is working on compute verification, and how they are connected.

## Posts

- [If you can't trust, then verify!](https://canaryinstitute.ai/blog/cant-trust-then-verify/): a walkthrough of what looks like the strongest near-term proposal.
- [Gaming (out) the system](https://canaryinstitute.ai/blog/gaming-the-system/): how verification changes the stampede dynamics of an AI race, with an [interactive model](https://canaryinstitute.ai/research/stampede/) to play with.

## Other resources

The resources below were compiled by Fable, based upon my findings in September 2026.

Sign up for the [Lens Academy course](https://lensacademy.org/courses/compute-verification) — free, five units, weekly small groups. (Full disclosure: I facilitated the September 2026 cohort.)

**Living project lists** — the closest thing the field has to a maintained to-do list:

- [Proofworks — Living Docs](https://proofworks.cc/living-docs/) — Harack's hub of "Concrete Verification Projects" and "Engineering Problem Statements," continually updated.
- [AI-2040 Verification Plan — Get Involved](https://ai-2040.com/supplements/verification-plan/get-involved) — the most explicit "here is what to work on" page in the field: phases, dollar figures, named openings.
- [Amodo Design — Plan A Recommendations](https://amododesign.com/ai-verification/plan-a-recommendations/) and their running [Sitrep](https://amododesign.com/ai-verification/plan-a-sitrep/) — which items are on track, which aren't, at the level of individual work items. Their notes cover the details, e.g. [optical tapping](https://amododesign.com/notes/2026-05-03-network-tapping/), [memory wiping](https://amododesign.com/notes/2026-07-01-memory-wiping/), and [line-rate packet hashing](https://amododesign.com/notes/2026-07-03-network-traffic-hashing/).

**Orientations for the newcomer:**

- [Hausenloy & Li — "The compute verification post"](https://firstscattering.com/p/the-compute-verification-post) — a readable single-post introduction. "Maybe 60 people in the world think about compute verification full-time."
- [Cankaya — Compute Verification FAQ](https://nacicankaya.substack.com/p/compute-verification-faqs) — a field veteran's short answers to the questions everyone asks.

**If you're ready to build:**

- [Coefficient Giving — Project Tailwind](https://coefficientgiving.org/tailwind/) — "Agreement verification technology" is one of their featured founder tracks. $200k–$2M pre-seed, open to individuals.
- [AI Security Forum — Requests for Designs](https://projects.aisecurity.forum/) — 20+ scoped design problems for hardware- and system-level verification, with named contacts.
- [Compute Verification Project](https://github.com/compute-verification) — an open-source codebase (a ZK-proof harness and a deterministic-inference server); useful for seeing what real work looks like today.
- [Side Channel Cloud](https://sidechannel.cloud/) — a 32-GPU instrumented cluster open to researchers who want to measure real workloads.

If you're interested in discussing any of this, please reach out to me!

[^trust]: For a more detailed walkthrough of what looks like the strongest near-term proposal, see my earlier ["If you can't trust, then verify!"](https://canaryinstitute.substack.com/p/cant-trust-then-verify).

---

*Daniel Parshall, Ph.D., is a former physicist and data scientist working on AI policy. He can be reached at dan@canaryinstitute.ai*
