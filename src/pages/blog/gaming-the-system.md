---
layout: ../../layouts/BlogPostLayout.astro
title: "Gaming (out) the system"
description: "Verification changes the stampede dynamics."
date: "2026-11-01"
author: "Daniel Parshall, Ph.D."
area: "compute-verification"
---

*Verification changes the stampede dynamics.*

*In alignment with our [AI Usage policy](https://canaryinstitute.ai/about#ai-usage), the Pangram score of [this piece](https://www.pangram.com/history/93181b45-b903-43f9-a40d-5b0e1903dacb): **100% human**.*

---

I'm currently at [FASR](https://securefrontier.ai) in the UK, it's an 8-week program dedicated to "compute verification".  That's the not-quite-here-yet technology that would allow us to make agreements about how AI is being used, without leaking any closely-held secrets.  You can think of it as "arms control for AI".

Part of what I'm working on is the game theory of an agreement.  This can get quite detailed (in terms of defining how often and how detailed an inspection should be) in order to make cooperation the best overall choice.  But in this post I want to provide a high-level look at how verification would change the dynamics from "stampede" to "cooperate".  Below I've got a map which allows us to use a player's value for Hazard (x-axis) and their value about how bad that incident might be (y-axis) as inputs, to see what their optimal strategy should be.  Hazard here is the baseline chance that a project loses control of its ASI, even if they could take their time and think things through carefully.  

But, sadly, we don't live in a sane world.  In our world, everyone is rushing to get ahead of everyone else[^race], which adds additional danger. Here I've set the baseline chance of an incident at about 12%, and set the "reckless rush" danger at another 25% of that, so the overall risk is about 15% (for the nerds: that total is the usual `p(doom|ASI)`), which is a typical number amongst the folks who are building AI.  Depending on how high you think the Hazard is, the best option is to stampede (the red region), cooperate if you can (the blue region), or quit unilaterally (the green region).  Someone who thinks H is this high should already be open to cooperation, if they weight the downside of loss-of-control more than about 7x what they weight the benefits we might get.

*Without verification.*

![The stampede map without verification](https://canaryinstitute.ai/images/stampede_map_verification_off.png)

But let's look at what happens if you *could* provide reliable information that each was cooperating.  If a cheater reneges on the deal, and the betrayed party can figure it out quickly, then the betrayed party will hurry to build their own.  Since the cheater isn't sure if they would reach ASI first, they can only cheat if they're **very** sure that they would win.  In this figure, the cheater would have about a 75% chance of finishing first.  But even in that scenario, cooperation becomes the preferred strategy, for both players.  The better the verification tech, the wider the cooperative region becomes.[^inspection]  And the optimal choice depends on how confident you are that your rival cooperates, which is made much stronger by verification itself.

*With verification.*

![The stampede map with verification](https://canaryinstitute.ai/images/stampede_map_verification_on.png)

This is why I think verification is ["the most important problem on Earth"](https://canaryinstitute.ai/blog/most-important-problem/): it turns a near-impossibility into a no-brainer.  If you're interested, reach out.  I've got a list of specific problems that need attention.  If you want to play around with the tool yourself, a preview version is at: [canaryinstitute.ai/research/stampede](https://canaryinstitute.ai/research/stampede/)

[^race]: As though there's a "race" which implies a "winner" (spoiler: in an AI race, the only winner is AI).

[^inspection]: Which is why I'm also working on the details of inspection games; designing a system that is very likely to catch evaders in time to prevent accumulating any compute is important!

Related:

- Scott Alexander, [Against SURA](https://www.lesswrong.com/posts/xikGZ8fuhdG6DApAo/against-sura) (LessWrong, 2026)
- Papenhausen, [The AI Race is Not a Prisoner's Dilemma](https://www.lesswrong.com/posts/hc4DbmhdzZpSLMQ9Y/the-ai-race-is-not-a-prisoner-s-dilemma) (LessWrong, 2026)

---

*Daniel Parshall, Ph.D., is a former physicist and data scientist working on AI policy. He can be reached at dan@canaryinstitute.ai*
