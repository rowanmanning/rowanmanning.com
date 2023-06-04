---
# Weeknote title and metadata
# ---------------------------
title: "Week 136: This Land"
date: 2023-06-04T20:18:00+01:00
description: "A week of smashing it at work, smashing it at board games, smashing it at server admin, and trying to get a handle on my health."
tags: ["Work", "Games", "Health", "Board games", "Minecraft", "Side Projects"]

# Weeknote display
# ----------------
highlight: "orange"

# Images and resources
# --------------------
mainImage: "world-altar.jpg"
resources:
  - src: "world-altar.jpg"
    title: "A pyramid in Minecraft with a cyan fountain of particles at the top. There's a Verified True Fact badge on the side."
---

  * I kinda smashed it at work this week. We've been overhauling the alerting for FT.com and I'm _so_ proud of what the team has come up with. We'll find it far easier to dig into which systems are failing and why during an incident. We'll also have far more reliable data to check whether we're meeting our service-level objectives. I'm aiming to write a public blog post about it at some point soon.

  * My board game group started a [Clank!: Legacy](https://boardgamegeek.com/boardgame/266507/clank-legacy-acquisitions-incorporated) campaign this week. It's fun! I won the first game by a decent margin, still feeling smug about it.

  * Get ready for some over-sharing: I finally got my ass in gear and have a blood test and a stool sample collection coming up. Best case, I have a food intolerance or vitamin deficiency. Worst case, I have a horrible life-altering illness. Time will tell! Interestingly it's quite possible that my psoriasis flare-ups are also gut-related, who knew?

  * {{< pin right >}}{{< image "world-altar.jpg" >}}{{< /pin >}}

      My over-engineering of Minecraft is almost complete. Indulge me in talking about the new setup for our shared server.

    * I ditched the idea of using AWS, because it turns out it's way cheaper to run an old-school dedicated server. It's been super fun setting it up, I haven't done something like this in ages.

    * I have a beefy Ubuntu server running [AMP](https://cubecoders.com/AMP) – a super cool piece of software that can set up and run different game servers with an easy-to-use and web-based admin interface.

    * Outside of the game servers we have a basic static website hosted on GitHub. Of course, all of this needed a domain, nobody wants to be passing IP addresses around right? https://thisland.space/

    * I gave a few of our group some server admin capabilities so that I'm not a single-person dependency. [Rowan](https://github.com/rowanbeentje) has done a bunch of this stuff before so I'm hoping he can help me with a few networking issues :eyes:

    * I'm really pleased with some of the automation. We run a Vanilla server but we use a few [data packs](https://github.com/this-land-server/minecraft-vanilla-data-packs) and a [custom resource pack](https://github.com/this-land-server/minecraft-vanilla-resource-pack) (yes yes maybe a GitHub org is overkill). The resource pack is made public via GitHub pages so that a download can be prompted when someone joins the server. The data packs get uploaded via SFTP every time the `main` branch changes. Anyone on the server can PR changes.

    * _Writing_ data packs is fun and slightly addictive.

    * If I know you (like actually know you) and you fancy playing on a chill server with some nice people then let me know! We'll be kicking off properly on Wednesday 7th June.
