---
layout: ../../layouts/BlogPostLayout.astro
title: "The most important problem you've never heard of"
description: "Compute verification is the linchpin of pacing agreements... and only around 25 people are working on it full-time."
date: "2026-09-15"
author: "Daniel Parshall, Ph.D."
area: "ai-governance"
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

## Where you could help

The remainder of the post is a list of resources, compiled by Fable, and based upon my findings of the past month.  These are six areas where new hands could shift the field. Each links down to specifics:

- **[Hardware, electronics, optics](#hardware-electronics-optics)** — the physical layer: taps that see 800Gbps traffic, probes for memory, tamper-evident enclosures.
- **[Networking and systems](#networking-and-systems)** — reading a cluster from the wire, and catching distributed training that's trying to look like ordinary internet traffic.
- **[Cryptography and formal methods](#cryptography-and-formal-methods)** — proving what a chip did, or that two chips got the same answer, without leaking the answer.
- **[Security and red-teaming](#security-and-red-teaming)** — nobody is red-teaming the whole verification regime yet.
- **[Physical-world evidence](#physical-world-evidence)** — the grid the datacenter draws from, the heat it puts out, the satellite image of its roof.
- **[Game theory, policy, and institutions](#game-theory-policy-and-institutions)** — attribution ladders, deal stability, and the international body that would actually run any of this.


## Additional resources

Sign up for the [Lens Academy course](https://lensacademy.org/courses/compute-verification) — free, five units, weekly small groups. (Full disclosure: I facilitated the September 2026 cohort.) Or just start reading — the field's entire body of knowledge is about 60 papers, and you could get up to speed in two weeks.  Here's a set of links to other resources I found; many are also linked to via the specific problem areas below, but they're useful on their own too.

**Living project lists** — the closest thing the field has to a maintained to-do list:

- [Proofworks — Living Docs](https://proofworks.cc/living-docs/) — Harack's hub of "Concrete Verification Projects" and "Engineering Problem Statements," continually updated.
- [AI-2040 Verification Plan — Get Involved](https://ai-2040.com/supplements/verification-plan/get-involved) — the most explicit "here is what to work on" page in the field: phases, dollar figures, named openings.
- [Amodo Design — Plan A Recommendations](https://amododesign.com/ai-verification/plan-a-recommendations/) and their running [Sitrep](https://amododesign.com/ai-verification/plan-a-sitrep/) — which items are on track, which aren't, at the level of individual work items. Their notes cover the details, e.g. [optical tapping](https://amododesign.com/notes/2026-05-03-network-tapping/), [memory wiping](https://amododesign.com/notes/2026-07-01-memory-wiping/), and [line-rate packet hashing](https://amododesign.com/notes/2026-07-03-network-traffic-hashing/).

**Orientations for the newcomer:**

- [Hausenloy & Li — "The compute verification post"](https://firstscattering.com/p/the-compute-verification-post) — a readable single-post introduction. "Maybe 60 people in the world think about compute verification full-time."
- [Cankaya — Compute Verification FAQ](https://nacicankaya.substack.com/p/compute-verification-faqs) — a field veteran's short answers to the questions everyone asks.

**If you're ready to build:**

- [Coefficient Giving — Project Tailwind](https://coefficientgiving.org/tailwind/) — "Agreement verification technology" is one of their featured founder tracks. $200k–$2M pre-seed, open to individuals. (More on this at the bottom of the piece.)
- [AI Security Forum — Requests for Designs](https://projects.aisecurity.forum/) — 20+ scoped design problems for hardware- and system-level verification, with named contacts.
- [Compute Verification Project](https://github.com/compute-verification) — an open-source codebase (a ZK-proof harness and a deterministic-inference server); useful for seeing what real work looks like today.
- [Side Channel Cloud](https://sidechannel.cloud/) — a 32-GPU instrumented cluster open to researchers who want to measure real workloads.



## Specific problem areas

### Hardware, electronics, optics

The physical layer has to exist for anything else to work. Right now it doesn't.

- **Passive optical taps at 800G and up** (53–106 GBaud per lane). Taps are demonstrated at 400G (26 GBaud lanes); the 53 GBaud lanes of 800G-DR8 are believed feasible but undemonstrated, and AI-2040 calls this "probably the most time-sensitive hardware problem in the field." ([Amodo](https://amododesign.com/notes/2026-05-03-network-tapping/); [AI-2040 Get Involved](https://ai-2040.com/supplements/verification-plan/get-involved))
- **Tamper-evident, retrofittable enclosures for existing racks.** FlexHEG estimates 2–10 person-years; some IAEA seals in the nuclear world "have reportedly been compromised." ([FlexHEG II](https://arxiv.org/abs/2506.03409))
- **Fast, provable memory wiping.** HBM takes minutes; NVMe takes hours; one demo left more than 100TB of memory unwiped. ([Amodo](https://amododesign.com/notes/2026-07-01-memory-wiping/))
- **Hardware design attestation** — matching a scanned chip to its HDL, verifiable fabrication, vetted open-source secure boot. RAND: "no single technique provides sufficient protection." ([Ilhan et al., Apr 2026](https://aigi.ox.ac.uk/publications/verifiable-semiconductor-manufacturing/))

### Networking and systems

If you can read what leaves a datacenter, you can tell a lot about what happened inside — but not enough, yet.

- **Detecting low-communication distributed training from network traffic.** DiLoCo can reach 10²⁵ FLOP at under 40 Mbps of traffic — below a household upload. Whether any traffic-based detection is feasible at all is an open question. ([Rahman on LW](https://www.lesswrong.com/posts/35yyWJnXvC2ae6NKH/); [Kryś, Sharma, Egan](https://arxiv.org/abs/2507.07765))
- **Line-rate packet hashing on CPU, NIC, or FPGA.** And the batching heuristic — how many packets per hash? ([Amodo](https://amododesign.com/notes/2026-07-03-network-traffic-hashing/))
- **Reproducible inference packets** — testing whether a machine really ran the model it says it did, without recomputing from scratch. Current schemes (TOPLOC, Token-DiFR) only tested to 30B parameters. ([Rinberg et al.](https://arxiv.org/abs/2511.02620))
- **Standardized logging protocols for AI clusters.** They don't exist. ([Hausenloy & Li](https://firstscattering.com/p/the-compute-verification-post))

### Cryptography and formal methods

Making math prove that a computation happened, and that two machines running the same code agree byte-for-byte.

- **ZK proofs of inference and training competitive with recompute above 30B parameters.** Currently orders of magnitude too slow for frontier scale. ([Hausenloy & Li](https://firstscattering.com/p/the-compute-verification-post))
- **Provably-secure Proof-of-Training-Transcript.** Shavit: "we leave the problem of finding provably secure, efficient methods... as an important avenue for future work." Existing heuristics have been broken. ([Shavit 2023](https://arxiv.org/abs/2303.11341))
- **Bit-exact reproduction across GPU generations, and for training rather than just inference.** NVIDIA GPUs one generation apart currently agree only ~85% of the time. Recent work extends to single-GPU FP32 training only; multi-GPU is explicitly future work. ([Cankaya et al.](https://arxiv.org/abs/2606.00279))
- **Anti-steganography for declared workloads and model I/O.** Currently "largely unexplored." ([Rinberg et al.](https://arxiv.org/abs/2511.02620))

### Security and red-teaming

The verification regime itself has to survive a determined attacker with nation-state resources.

- **Red-team the whole regime.** Every major source asks for it; no standing red team exists anywhere.
- **TEE/HEM resilience under physical possession.** Live exploits already this year — TEE.Fail, GPUBreach. Defense side wide open. ([CNAS primer](https://www.cnas.org/publications/reports/technology-to-secure-the-ai-chip-supply-chain-a-primer))
- **Detecting code designed to spoof partial re-execution** — a whole class of attacks on any recompute-based scheme.
- **Distillation detection, sandbagging, and dangerous-research detection.** Verifying model behavior, not just compute. Scher (Jun 2026) surveys 28 mechanisms, "some not yet implementation-ready." ([Scher](https://arxiv.org/abs/2606.28694))

### Physical-world evidence

Everything a datacenter can't hide from a sensor: the grid it draws from, the heat it puts out, the satellite image of its roof.

- **Training-vs-inference classification from power traces**, hardened against evasion. 97% accuracy on H200s in the lab, but only 48–88% once the workload uses LoRA to look like something else. ([Gargiulo & Kulp](https://arxiv.org/abs/2609.00309); [Rahman & Tajdari](https://arxiv.org/abs/2606.19262))
- **Grid-level power accounting and privacy-preserving grid declarations** — proving "no hidden data centers" without revealing the grid's actual load pattern.
- **Thermal and waste-heat signatures.** Infrared looks "particularly promising"; no dedicated calorimetry-as-compute-proxy paper exists yet.
- **Finding undeclared datacenters from satellite imagery.** EO imagery "cannot identify datacenters from scratch without prior location knowledge"; automated detection is "primarily conceptual." Epoch's current hub covers ~46% of global capacity. ([FAS](https://fas.org/publication/tracking-hyperscale/); [Epoch](https://epoch.ai/data/ai-data-centers))
- **Electricity-theft detection as an analog for hidden compute.** Active research on both sides — power-industry ML for non-technical losses, and training's distinctive grid-frequency signature — but no bridging paper. ([Choukse et al.](https://arxiv.org/abs/2508.14318); [Glauner et al.](https://arxiv.org/abs/1606.00626))

### Game theory, policy, and institutions

The technology decides what's provable. The treaty decides what to prove. Both need people.

- **Attribution and escalation ladders** — telling technical failure from deliberate violation, and pre-agreeing what happens next. ([Cankaya FAQ](https://nacicankaya.substack.com/p/compute-verification-faqs))
- **Deal-stability mechanisms** — stockpile sizing, cold-storage of weights, disadvantaging pre-deal compute. ([AI-2040](https://ai-2040.com/supplements/verification-plan/get-involved))
- **A joint international verification experiment**, modeled on the nuclear test verification track. ([Scher et al. 2025](https://arxiv.org/abs/2511.10783))
- **Design of the international verification institution itself.** ([Wasil et al.](https://arxiv.org/abs/2408.16074))
- **Thresholds that decay with algorithmic progress.** Compute efficiency doubles every 5–14 months (Epoch), or much faster once you count catch-up progress. Any static compute threshold hits a moving-target problem, and nobody has treated it with inspection-game math. ([Ho et al. / Epoch](https://arxiv.org/abs/2403.05812))

I'm currently working on that final problem, regarding the game theory analysis in the scenario where algorithmic progress makes the total amount of compute required lower over time.  If you're interested in discussing, please reach out to me!

[^trust]: For a more detailed walkthrough of what looks like the strongest near-term proposal, see my earlier ["If you can't trust, then verify!"](https://canaryinstitute.substack.com/p/cant-trust-then-verify).

---

*Daniel Parshall, Ph.D., is a former physicist and data scientist working on AI policy. He can be reached at dan@canaryinstitute.ai*
