# Verification — structural sketch

**Venue:** The Overhang 2026, Washington DC (Sept 19–20, 2026), AGU Conference Center
**Audience:** Forecasters, rationalists, futurists, optimists — technically literate, AI-safety-adjacent, contains *potential recruits* to the compute-verification community, not just abstract policy sympathizers
**Format:** Standalone conference talk, ~11–12 slides at ~60–90s each ≈ 12–18 min
**Style:** Light theme, Canary brand palette, voice-track-driven, modeled on `slides/hallucination/hallucination.html`
**Source material:**
- `src/pages/blog/cant-trust-then-verify.md` — the *mechanism* piece (Glass Perimeter walkthrough)
- `src/pages/blog/most-important-problem.md` — the *urgency* piece (~25 FTE globally, 6 problem areas)

**Status:** Draft — structural sketch pending Dan's sign-off before HTML build. See "Notes" and "Beats I'm least sure about" at the end.

---

## Deck-topic header (constant across slides)

`COMPUTE VERIFICATION` (spec explicit) or `VERIFICATION` (punchier). Dan to choose.

---

## Slide 1 — Cover / hook

- **Cluster name:** "If you can't trust, then verify"
- **Subtitle:** The Overhang · Sept 19, 2026
- **Layout:** one-concept centered, icon TBD (Glass Perimeter / optical splitter motif)
- **Beats:** none — pure title slide
- **Flag:** Mini-deck design doc says no title slide, but that's for random-access mini-decks. For a standalone talk, keep unless Dan says drop it.

## Slide 2 — The week that shifted the frame

- **Cluster:** "The frame has moved"
- **Beats:**
  - Coxon → preference cascade on x-risk
  - UN: "the last generation able to set the terms"
  - Anthropic: unilateral external audits
  - OpenAI: agreed to follow
  - **A deal you can't verify is a deal you can't keep.**
- **Icons:** news-headline row — four small icons (X, UN, Anthropic mark, OpenAI mark)

## Slide 3 — We've done this without trust before

- **Cluster:** "American inspectors, Soviet gates"
- **Beats:**
  - Two decades of on-site inspection, USA ↔ USSR
  - X-rayed any container big enough to hide a banned missile
  - No trust required — only verification
  - **Verification is what makes cooperation possible in the absence of trust.**
- **Icon:** shipping container + X-ray / factory gate

## Slide 4 — Compute has the same shape

- **Cluster:** "One chokepoint, one field"
- **Beats:**
  - Fissile material ↔ leading-edge chips
  - EUV lithography = ASML, one company on Earth
  - Fabrication = TSMC + a handful of others
  - Dual-use → verification, not seizure
  - **The tracking machinery is half-built before any treaty is signed.**
- **Icon:** stylized ASML/TSMC lockup or global chokepoint diagram

## Slide 5 — The one thing we could never agree on

- **Cluster:** "Silicon we both trust doesn't exist"
- **Beats:**
  - Hardware trojans in dopants — invisible to optical inspection
  - Rowhammer: reading memory rows flips bits in others
  - Decades of talks, no shared chip design
  - **Any regime has to work without mutually-trusted silicon.**
- **Icon:** chip with red X / warning glyph

## Slide 6 — The Glass Perimeter

- **Cluster:** "Photons can't be programmed"
- **Beats:**
  - Optical splitter: dumb hardware, physically can't lie
  - Fiber in → both parties process on their own kit → hashes out
  - The boundary between adversaries is literally glass
  - **Your electronics never touch theirs.**
- **Icon:** prism/splitter diagram — load-bearing visual, worth a real illustration
- **Attribution:** Credit Cankaya inline in voice track; probably also a small "after Cankaya, 2026" tag on-slide

## Slide 7 — The audit loop

- **Cluster:** "Enter the sealed room"
- **Beats:**
  - Verifier picks output at random — coin flip is fine
  - Weights + input + manifest enter an air-gapped audit environment
  - Both sides replay the calculation, compare hashes
  - **Model weights go in. Only a signed verdict comes out.**
- **Icon:** two-computer air-gap sketch, or fig2 audit illustration from the blog

## Slide 8 — The statistics that make it work

- **Cluster:** "Random beats exhaustive"
- **Beats:**
  - Zero failures in *n* random audits → 95% confidence <3/*n* dirty
  - 300 audits/day → cheating bounded below **1%**
  - 10,000 audits/day → bounded below **0.03%**
  - Doesn't depend on datacenter size
  - **Cheating becomes almost impossible to hide.**
- **Icon:** dice or lottery-ball with hash symbol
- **Note:** This is the "wow" slide — the number people don't expect

## Slide 9 — The hard part: training

- **Cluster:** "Inference is easy. Training is the frontier."
- **Beats:**
  - Training = every chip talks to every chip = no clean I/O
  - DiLoCo / Streaming DiLoCo: islands sync occasionally, deterministically
  - Bit-exact replay across GPU generations: ~85% today, needs 100%
  - **The engineering is hard. None of it needs a fundamental breakthrough.**
- **Icon:** cluster diagram — many chips, mesh topology

## Slide 10 — The state of the field

- **Cluster:** "Twenty-five people"
- **Beats:**
  - ~60 papers total in the field
  - ~72 researchers, ~25 FTE globally
  - The entire body of knowledge = one week of reading
  - **Twenty-five people stand between us and enforceable AI treaties.**
- **Icon:** silhouette of ~25 figures, or an empty auditorium
- **Note:** This is the emotional pivot — from "here's a plan" to "here's the gap"

## Slide 11 — Where you could help

- **Cluster:** "Six problem areas, all open"
- **Layout:** two-concept split, six items in two columns of three
- **Beats — left column:**
  - Hardware & optics
  - Networking & systems
  - Cryptography & formal methods
- **Beats — right column:**
  - Security & red-teaming
  - Physical-world evidence
  - Policy & institutions
- **Callout row:** Living project lists — Proofworks · AI-2040 · Amodo · Compute Verification Project
- **Punchline:** **Six months of your work = a couple percentage points of the field. That's HUGE.**
- **Icon:** none — the two columns *are* the visual

## Slide 12 (optional close) — The choice

- **Cluster:** "If we want to, we can"
- **Beats:**
  - We paced nuclear weapons because we wanted to badly enough
  - The technology is 80% engineering, 20% politics
  - Nothing here requires a scientific breakthrough
  - **Whether we pace the frontier isn't a technology question. It's a question of whether we want to.**
- **Contact:** dan@canaryinstitute.ai · canaryinstitute.ai
- **Flag:** Could cut and end on slide 11 to leave the call-to-action as the last thing on screen. But slide 12's closing line is the strongest soundbite in the deck.

---

## Notes / decisions I made silently that Dan should push back on

1. **Kept a title slide (Slide 1)** — mini-deck design doc says no title slide, but that's for random-access mini-decks embedded in a larger deck. For a standalone talk you probably want one; drop it if Dan wants a cold open.
2. **11 vs 12 slides** — Slide 12 is a genuine coda. Lean toward keeping because the last line is the strongest soundbite. Cutting makes slide 11's call-to-action the last thing on screen.
3. **Beat count creeping past 3** — Slides 4, 6, 8, 9, 10 have 4 beats. Mini-deck sweet spot is 3, but for a talk (voice is longer) 4–5 beats reads as generous scaffolding, not clutter. Compress to 3 if Dan wants tighter.
4. **Deck topic header** — `COMPUTE VERIFICATION` (spec explicit) vs `VERIFICATION` (punchier). Dan to choose.

## Beats I'm least sure about

- **Slide 2's four-headline row** — Coxon "preference cascade" framing is more speculative than the Anthropic/OpenAI/UN items. If the room includes people skeptical of the cascade framing, that slide could invite pushback in Q&A. Options: keep as-is, replace Coxon with something concrete, or drop to 3 headlines.
- **Slide 5** — "Any regime has to work without mutually-trusted silicon" is a strong claim. If someone in the room is working on hardware attestation (RAND, FlexHEG folks), this reads as a jab. Soft version — "shouldn't depend on it" — loses punch. Dan to decide.
- **Slide 10's "25 people"** — Compressed from "72 researchers, ~25 FTE." Punchier but the room may fact-check. Worth a caveat in voice ("call it 25 full-time equivalents"), keep the number bold on the slide.

## Things I still want to know before HTML

- **Talk length?** 11–12 slides at 60–90 seconds each ≈ 12–18 min. Fits a plenary slot. If this is a lightning talk (~5 min), we cut hard — probably to slides 2, 6, 8, 10, 11.
- **Specific attendees to speak past?** If Cankaya is in the room, credit him more visibly on slide 6 (on-slide, not just voice).
- **Handout HTML companion?** Per design doc — slides on left, compressed voice on right. Deferring unless Dan says yes.
