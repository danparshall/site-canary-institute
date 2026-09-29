---
layout: ../../layouts/BlogPostLayout.astro
title: "If you can't trust, then verify!"
description: "How the \"Glass Perimeter\" could enable AI treaties"
date: "2026-08-28"
author: "Daniel Parshall, Ph.D."
area: "compute-verification"
---

*How the "Glass Perimeter" could enable AI treaties*

---

*Thanks to Naci Cankaya for reviewing an earlier draft of this post; I'm deliberately simplifying many aspects for conceptual clarity, and any mistakes are mine.  He also asked me to emphasize that this is a proposal, and many pieces still need extensive work.  If you're interested in helping, see [proofworks.cc/living-docs](https://proofworks.cc/living-docs/) and the AI-2040 [Get Involved in Verification](https://ai-2040.com/supplements/verification-plan/get-involved) page.*

Imagine that you would like to make a deal with a powerful adversary; maybe China, maybe Russia, whomever. And imagine further that they also would like to make a deal with you.  But if you absolutely don't trust each other, is it even _possible_ to make a deal?

Surprisingly, *YES*, and we did it for decades with the Russians and nuclear weapons... but the lack of trust has to be built in from the bottom up.  That is exactly what Cankaya advances in his draft proposal[^cankaya], which allows adversaries to perform "verification" of what's going on inside a data center, which could enable enforceable deals regarding AI use and development (because who wants a deal based on a pinkie-promise?). I reframe that draft here[^elide], partly for my own edification, and partly so I have an easy place to point at and say **we could stop racing ahead, any time we wanted to**.

The analogy between nuclear arms control and computer verification has been around for a few years, and is based primarily in the understanding that tracking a single scarce resource (fissile material, compute chips)[^asml] largely accounts for all of the risks associated with the technology.  So we could theoretically stop all AGI development, at any time, by seizing or destroying all chips capable of training.  But like nuclear power, AI is a "dual use" technology, capable of great benefits as well as great risks, so a more nuanced take allows us to have *some* uses of AI, while restricting others.

So we'd like to have an agreement that says "we can each use our racks of computers to do *A* and *B*, but not *C* and *D*"[^treatyscope]; in order to enforce that, the first step is to even be able to check if someone is keeping their end of the deal.  The less you trust your adversary, the more you need verification.  In the nuclear context we did that by having American inspectors outside a Russian missile factory for two decades, doing an x-ray of any container that was big enough to hold a banned missile (and likewise, Russian inspectors checking American outputs in Utah).  Precisely *because* we could verify, we were able to keep a treaty in the absence of trust.

So we did it for nukes, but could we do it for computer systems?  It could be tricky: even over decades of arms-control talks between the USA and Russia, we never achieved an agreement on a chip design that both sides could trust.  Both sides were just too worried that the other side's spy agency would sneak in something that compromised the design, and that having our networks connected could leak important secrets[^rowhammer].  But each side felt it was safe enough to trust their own domestic chips.  So even though we might *like* to make treaties about AI usage, it's going to be very difficult to have "mutually trusted" silicon... and that's where the Glass Perimeter comes in.


## Details of the Glass Perimeter

Primarily it's built on an understanding of three core principles:

- nobody wants to risk their models or data getting stolen
- adversaries CAN agree to physical inspection
- mutually-trusted silicon is (likely) a non-starter

That last point is a big challenge with many of our current hardware-verification proposals, and Cankaya's workaround is that anytime you want to share data, you use an optical splitter, which has no electronics and can't *do* anything to change the signal. When you want to send a signal, you use a pulsed LED.  When you want to receive one, you use a photosensor.  Your electronics never touch theirs (and even the NSA finds it difficult to pull shenanigans through an air-gapped computer).  Once those are in place, almost everything else follows naturally.  Data requests come in to the building on a fiber-optic cable, the signal gets split, and both parties process the data on their separate computers.  The data exiting the building also goes through a splitter, so both parties can see what left.  Because the approach relies on transparency, and because the boundary between the two parties is literally glass, I suggest "Glass Perimeter" as a good name for this approach.

To be clear, the Glass Perimeter is still in early development stages, and there are several things that need to happen; but they mostly seem to be *engineering* tasks that consist of putting together existing technologies in a cost-effective manner, rather than anything relying on a *fundamental* breakthrough.  

In the Glass Perimeter, the owner of the datacenter is called the Operator (called Prover in Cankaya's proposal), and the adversarial counterparty who confirms that the computer racks are doing what they claim is called the Verifier.  Each output data file (typically a single LLM response) leaving the building runs through the optical splitter and one copy is sent to a computer owned by the Verifier (let's call it the "Hasher computer"), which calculates the hash of the output file[^hashing]. The Hasher is allowed to _see_ everything exiting the building (it has to, in order to calculate the hashes).  This would probably make the Operator really nervous, that's all *kinds* of sensitive data!  But the Hasher is only allowed to _send_ three things out of the building:

- a counter identifying the output number[^slices]
- a hash of the output data file
- a signature[^signing]

<figure>

![Normal operation: fingerprint everything, reveal nothing. Prompts and responses cross an optical boundary; the Verifier's Hasher is dumb by design and emits only hashes; the Operator's gateway recomputes every hash before it leaves the building.](https://canaryinstitute.ai/images/fig1_normal_operation.png)

<figcaption>
Normal operation. Every prompt and response crosses an optical boundary; the Verifier's Hasher emits only hashes, and every hash is cross-checked by the Operator before leaving the building.
</figcaption>

</figure>

The Hasher's outbound message is passed to the Operator (over optical airgap, to avoid funny business), which relays it back to the Verifier's home base.  The Operator can see the hash and signature, so they know that no secrets are being exfiltrated, and they can calculate the hash of the output file on their own, to confirm that the Verifier didn't sneak anything in there either.  The Operator keeps a copy of the input data file (typically a single user prompt) on-site for a time period determined by agreement, and provides a "manifest" which is a high-level description of what each particular input file contains.

Thousands of times each day, the Verifier's home base will send in a message saying "We want to audit Output #123, which had a hash value of 0xD34DBE3F"; note it's always the Verifier who decides which outputs to audit, and that decision could be based on the Operator's manifest, or by coin flip, or anything else the Verifier feels like.  In any case, the Operator sends a copy of the data needed to reproduce the audited calculation to a dedicated and secure "Audit Environment", located within the datacenter[^physsec].  The only input and output lines are optical (as described above) which enables the Operator to share even very sensitive data with the Verifier's auditing computer (let's call it the "Auditor computer").  This might include:

- the manifest
- the original input file
- the model weights

The Auditor computer and the Operator's audit computer then each get a copy of the files needed to confirm that the calculation itself was allowed, and that the output does what it says (confirmed by running the calculation again, and comparing the resulting hash to what was found initially).  Unlike the Hasher (which reviews *all* output files, but can only calculate hashes), the Auditor computer can do any analysis it wants to at this point (e.g. confirming that there are no instructions for making bombs or novel viruses).  This is permissible to the Operator because the Verifier is only doing deeper analysis on a small fraction of all traffic, and because the auditing itself happens inside a secure environment.

Assuming that everything checks out, the Auditor computer will only output a signed message saying:

- this question/response was within-treaty
- the input files were able to reproduce the output hash

<figure>

![The audit: reproduce the math, screen the content, disclose one verdict. The Operator hands manifest, input, and weights across an optical splitter into an air-gapped Audit Environment; both parties' computers replay the calculation and hash-match; a single signed verdict returns to Verifier HQ.](https://canaryinstitute.ai/images/fig2_audit.png)

<figcaption>
Audit path. Model weights and user data enter the sealed room; only a signed verdict leaves. Zero failures in <em>n</em> random audits gives 95% confidence that under <em>3/n</em> of traffic is dirty.
</figcaption>

</figure>

This means that the Verifier isn't able to steal any secrets; because the Operator can check all of the Verifier's output, they know that it's safe to share anything needed to reproduce the original results.  And fun statistics fact: the number of spot-checks needed doesn't depend on the number of computing racks in the datacenter, it only depends on how much cheating you want to rule out. With zero failures in _n_ random checks, you can be 95% sure that less than _3/n_ of the traffic is dirty.  Just three hundred checks a day bounds cheating below 1% of the workload; ten thousand checks gets you below 0.03%.  At that point, cheating becomes almost impossible to hide, which means that both sides can indeed trust the treaty.

In the event that the Verifier is *not* able to reproduce the results, or that the input/output pair doesn't comply with the usage treaty, then the next step depends on treaty details[^treaty].  One likely solution is that the inputs and outputs are then given to another computer (also inside the secure Audit Environment) maintained by a neutral third party, which could potentially adjudicate how serious the apparent violation is; alternatively the treaty might require that a team of humans arrive in person to perform analysis on the data. Those are (important!) political decisions, but we have solved these kinds of things before; the overall point is that the treaty enforcement can be done automatically and at-scale.

## A new hope
One interesting thing about this scheme is that it was designed by Cankaya primarily for *inference*, i.e. an already-trained model which is loaded into production and answers queries coming from the outside world.  It might prove more challenging during *training*, because typically, the process requires every computer to talk to every other computer, so after each batch of data that's processed, every machine must wait until ALL results have been processed. This is why current systems take place in enormous datacenters with special chips: we need to have them close together to cut down on wait time.  We also don't have a clean input/output file setup: training starts from a checkpoint, and there can be long stretches of processing before the next checkpoint.

Using the Glass Perimeter Audit step under typical conditions would require turning the entire datacenter over to training configuration and re-running it from the last checkpoint, up to whichever output the Verifier had issued an audit for.  But there are new methods of distributed training[^diloco] that allow each island of computers to process an isolated shard of data, and then only need to exchange outputs occasionally.  While the Verification community has largely seen this as a threat to datacenter-based verification schemes[^rahman], I speculate this might allow Cankaya's proposal to be adapted for use during training as well: instead of massive checkpoints that have to be distributed across the entire datacenter, audits could be run on a single island of computers, starting from a single shard, if we can produce bitwise determinism during training.

## Conclusion

Overall I think this says that we *can* do it, if we want to!  We wanted it badly enough for nuclear weapons, and our adversaries wanted the same. So even though we didn't trust each other, we found a way to work together *anyway* for something that was mutually beneficial.  We now have the same option for AI development, and the primary question is: do we think it's worth it?

If we want to stop the "AI race" dynamics, we can.

----

[^cankaya]: Naci Cankaya, ["A system overview for near-term, low-trust AI compute verification,"](https://www.lesswrong.com/posts/fgvmKqRGvBteKeDoc/a-system-overview-for-near-term-low-trust-ai-compute) LessWrong, June 23, 2026.

[^elide]: I'm eliding a few technical issues to focus on the key concepts and/or because they're unresolved.

[^hashing]: A hash is a short, fixed-length fingerprint of a file: change even one bit of the file and the fingerprint changes completely, but the fingerprint reveals nothing about the contents.  This lets the Verifier commit to a record of what the traffic *was*, without anyone revealing what it *said* (and once committed, history can't be rewritten).

[^signing]: The signature is computed over the hash (not the file) using the Hasher's private key, and anyone holding the public key can confirm it.  It proves which device produced each fingerprint, so neither side can later forge a record the Hasher never made, or disown one it did.

[^slices]: Strictly, Cankaya's Hasher fingerprints fixed slices of the raw traffic stream (say, everything in a given time interval) rather than one response at a time; spotting where one response ends and the next begins would require smarter (and therefore less trustworthy) hardware.  The Operator's manifest provides the mapping from traffic slices to individual responses.  I use the per-response framing because it's easier to follow.

[^physsec]: Obviously the physical security of all parts of the system is important, so tamper-evident housings, video cameras, etc. would all be used to ensure it.

[^diloco]: The method family is DiLoCo (Distributed Low-Communication training): "islands" of workers take many local training steps and synchronize only occasionally.  The variant that matters here is Streaming DiLoCo ([Douillard et al., arXiv:2501.18512](https://arxiv.org/abs/2501.18512), 2025), which syncs one fragment of the weights at a time on a fixed schedule and overlaps that communication with continued training, cutting inter-datacenter bandwidth by orders of magnitude while matching fully-synchronous training.  The sync schedule is also deterministic: each island's update is a pure function of its starting weights and its data shard, which is exactly the property a replay-based audit needs.  (Newer asynchronous descendants push scale and fault-tolerance further, but their straggler-skipping merges are runtime events an auditor would also need logged.)

[^rahman]: e.g. Robi Rahman, ["Catching illicit distributed training operations during an AI pause,"](https://www.lesswrong.com/posts/35yyWJnXvC2ae6NKH/catching-illicit-distributed-training-operations-during-an) LessWrong, April 11, 2026.

[^asml]: The supply chain for AI-grade chips has absurdly few chokepoints: every leading-edge chip is patterned by EUV lithography machines that only one company on Earth (ASML, in the Netherlands) can build, and nearly all such chips are fabricated in a handful of facilities, mostly TSMC's.  Fissile material has mines and enrichment halls; compute has ASML and a handful of chip factories.  Export controls already exploit this funnel, so the tracking machinery is half-built before any treaty is signed.

[^rowhammer]: The paranoia is justified.  On the supply-chain side, researchers demonstrated hardware trojans implanted by tweaking dopant concentrations during chip fabrication: no added circuitry, no changed layout, nothing that standard optical inspection would find.  On the runtime side, Rowhammer showed that merely *reading* memory rows in the right rhythm flips bits in neighboring rows; pure physics, no software bug required, and with careful profiling an attacker can choose *which* bits to flip.  After decades of this, there is still no accepted method for proving an electronic system free of hidden functionality.

[^treaty]: Note that while the scenario covers a worst-case of two adversarial great powers, it can easily be used between rival frontier labs, or by a government agency to enforce compliance without risking intellectual property secrets.

[^treatyscope]: e.g. which models can be updated, how much training compute can be used in total, which data must be excluded from training (e.g. biowarfare or nuclear topics).

---

*Daniel Parshall, Ph.D., is a former physicist and data scientist working on AI policy. He can be reached at dan@canaryinstitute.ai*
