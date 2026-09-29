---
layout: ../../layouts/BlogPostLayout.astro
title: "Industrializing a small field: Lessons from Vannevar"
description: "AI Safety needs to quickly transform from a \"community\" to an \"industry\"; the Manhattan Project is a good example!"
date: "2026-08-02"
author: "Daniel Parshall, Ph.D."
area: "compute-verification"
---

*AI Safety needs to quickly transform from a "community" to an "industry"; the Manhattan Project is a good example!*

---

Many folks know about the "Einstein letter"[^einstein] which was dated 87 years ago today.  As legend has it, this led to the formation of the Manhattan Project.  But actually this is only half the story: the original forays were plagued by institutional apathy, with multiple occasions when key scientific reports just didn't move.  

In one famed instance, the Brits realized that the bomb would only require a few kilograms of uranium (instead of tons from earlier estimates), and sent a report to the head of the American uranium committee... who put it in his safe and didn't tell a soul.[^briggs]  Eventually Mark Oliphant realized "somebody has to, and no one else will", so he got on a military transport plane heading to the USA, and started personally pounding on doors until the analysis got the attention it needed.

What probably was the biggest unlocking of the whole wartime research effort was Vannevar Bush walking into FDR's office to gain the institutional authority (and money), and then personally recruiting a handful of academics[^ndrc] to mobilize the rest of the physicists into working on key problems (of which the Manhattan Project was ultimately the most significant).

I bring this up because from what I've found, the AI Safety community hasn't done a lot of active recruitment of senior key personnel.  As just one example, I'm reviewing materials related to the [FASR](https://www.securefrontier.ai/) program today, and while the small AI-verification literature has adopted the "covert adversary" framework[^covert], I can't find any public indication that any of the AI Safety funders have gone to Aumann or Lindell and said "hey, you know that great paper y'all wrote?  Could you take this pile of money and do some more?"[^alignment]

I suggest that folks worried about AI Safety should change from a "pull" mindset of "Fill out a grant application on our website", to a "push" mindset of "we know we need more of X, let's find folks working on closely-related Y and see what they need to pivot".  We do have RFPs, but it looks like there's a terrible lack of active recruitment.  The urgency comes from what [others are already noting](https://counterfactual.blog/p/how-to-actually-spend-billions-on): a big funding wave is heading toward AI Safety, and the existing pull-model machinery won't absorb it at scale.  Different scale of funding requires different scale of influence.

To their credit, it looks like Palisade has been doing great work in the past year with making AI timelines legible to policymakers (dare I say that there's an Oliphant loose in the China hawks?).  But we need folks doing the same thing on the academic side, and right now it looks like we're recruiting individual residents for small programs, instead of showing up with grants and getting entire CS research groups to change their focus.


[^briggs]: Richard Rhodes, *The Making of the Atomic Bomb* (1986), pp. 372-374: Briggs "had put the reports in his safe and had not shown them to members of his committee."  Summarized at the [Atomic Heritage Foundation, "The S-1 Committee"](https://ahf.nuclearmuseum.org/ahf/history/s-1-committee/).

[^ndrc]: Karl T. Compton (president, MIT), James B. Conant (president, Harvard), Frank B. Jewett (president, National Academy of Sciences and chairman of the board, Bell Labs), and Richard C. Tolman (dean of the graduate school, Caltech).  Irvin Stewart, *Organizing Scientific Research for War* (1948); full roster at the [Library of Congress OSRD collection guide](https://guides.loc.gov/technical-reports/osrd).

[^covert]: Yonatan Aumann and Yehuda Lindell, "Security Against Covert Adversaries: Efficient Protocols for Realistic Adversaries," *Journal of Cryptology* 23(2):281-343 (2010), [doi:10.1007/s00145-009-9040-7](https://doi.org/10.1007/s00145-009-9040-7); extended abstract at TCC 2007.  For its adoption as the threat model of AI-verification work, see e.g. [Cankaya 2026, arXiv:2606.00279](https://arxiv.org/abs/2606.00279).

[^alignment]: The UK's [Alignment Project](https://alignmentproject.aisi.gov.uk/) does fund cryptographers (Vaikuntanathan, Zamir, Guruswami), mostly for watermarks, backdoors, and hardness results; only one grant (Vaikuntanathan's "Verification, Robustness and Alignment through a Cryptographic Lens") is explicitly for verification.

[^einstein]: Full text at [Wikisource](https://en.wikisource.org/wiki/Albert_Einstein_to_Franklin_D._Roosevelt_-_August_2,_1939); scan of the original in the [FDR Presidential Library's documents collection](http://www.fdrlibrary.marist.edu/archives/pdfs/docsworldwar.pdf).  Largely drafted by Leo Szilard; August 2 is the date on the letter, and Alexander Sachs delivered it to Roosevelt on October 11, 1939 ([drafting history](https://www.dannen.com/ae-fdr.html)).

---

*Daniel Parshall, Ph.D., is a former physicist and data scientist working on AI policy. He can be reached at dan@canaryinstitute.ai*
