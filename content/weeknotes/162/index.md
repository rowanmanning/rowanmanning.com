---
# Weeknote title and metadata
# ---------------------------
title: "Week 162: Rustration"
date: 2023-12-03T21:40:00Z
description: "A week of long walks, outdoor art, docklands, escape rooms, drinks, Christmas pizza, fairy lights, advent calendars, and Rust-based tooling."
tags: ["Walking", "Social", "Christmas", "Open Source", "Node.js"]

# Weeknote display
# ----------------
highlight: "lime"

# Images and resources
# --------------------
mainImage: "dome.jpg"
resources:
  - src: "dome.jpg"
    title: "A view of the Thames and the O2 from above"
---

  * {{< pin right >}}{{< image "dome.jpg" >}}{{< /pin >}}

    The highlight of the week was Friday – we'd taken the day off work to head out of London but the trains were fucked so we cancelled the trip. Instead, we walked over to the Olympic Park and then followed [The Line](https://the-line.org/). It's a really nice walk through the docklands but _possibly_ has an ulterior motive of trying to make people cross the Thames via cable car. We did, and it was novel.

  * On Saturday we did an escape room and then had drinks with Tammy, Marcus, and Alison. We came quite close to the record for the room :eyes:

  * We've started putting up Christmas decorations, we have fairy lights lining the living room and it looks lovely and cosy. I think we'll leave them up permanently like we did in our old flat. Maybe I'll connect them up to Home Assistant so I can automate away the big light.

  * It's [Advent of Code](https://adventofcode.com/2023) time again! Let's see if I can be bothered past day 8 this year eh? I started doing it in Rust, got frustrated, and then switched back to JavaScript. [Here are my solutions](https://github.com/rowanmanning/adventofcode-2023).

    I've made a few changes though so that I learn something. I've ditched mocha in favour of the [built-in Node.js test runner](https://nodejs.org/api/test.html). I've also switched out ESLint and Prettier and I'm giving [Biome](https://biomejs.dev/) a go instead. It's written in Rust and it's _so_ fast that I might move my open source stuff over at some point.
