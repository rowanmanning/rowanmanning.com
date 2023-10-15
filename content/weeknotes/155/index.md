---
# Weeknote title and metadata
# ---------------------------
title: "Week 155: 414 URI Too Long"
date: 2023-10-16T09:15:00+11:00
description: "A week of smashing it at work, bad URL-encoding, meeting family, falafel wraps, pints with friends, not thinking about computers, and super long flights."
tags: ["Holiday", "Social", "Family", "Work", "Food"]

# Weeknote display
# ----------------
highlight: "lime"
---

  * Hi from a Melbourne airport hotel :wave: this weeknote's mostly gonna be about other stuff because we only got here last night. I stayed awake for most of 30 hours and I woke up feeling pretty normal which is promising. Today we check into our Airbnb and don't commit to doing too much.

  * Earlier this week we had Charlotte's dad and step-mum round for dinner which turned into a few drinks. Mostly trying to catch up with people before disappearing for a month.

  * In the same vein, I met my sister for lunch on Wednesday because I haven't had any other chances to see her. We got great falafel wraps from Leather Lane Market and caught up. It's nice to see her hating her job less and I should make the most of her being in London every couple of weeks.

  * On Thursday I met Andrew & Ed for a little pub trip, love these two. We had a nice gentle catch-up, stuck to a single round, and parted ways.

  * I walked past the sea horse on the way home and work people were still there. I should have stuck to the three drinks because Friday was a struggle.

  * I feel like I smashed it at work this week, albeit in quite a manic rushed manner as I tried to finish some things off. I did lots of digging into our router and CDN layer and have fixed a couple of issues which were causing a decent number of `5xx` on FT.com for, oh, 7+ years:

    * URLs with bad percent-encoding used to hang until you got a client timeout, e.g. `https://www.ft.com/stream/%`. This is a common(ish) attack vector so we were seeing a lot of errors. They now `400` so our availability metrics should improve :chart_with_upwards_trend:

    * URLs which exceed 2,000 characters now get served a `414` at the CDN level. These were frequently erroring because of a few suspected [ReDoS](https://en.wikipedia.org/wiki/ReDoS) issues in our apps. I did an audit of long URLs and this seems to be the sweet spot where we catch a lot of malicious requests early but don't block legitimate traffic.

    * I'm looking forward to coming back to work and seeing whether this has impacted our availability metrics :tada:

    * With that brain dump done, I get to not think about computers for 29 days.

  * OK gotta get up and explore Melbourne :wave: