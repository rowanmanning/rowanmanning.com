---
# Weeknote title and metadata
# ---------------------------
title: "Week 106: Champagne Show"
date: 2022-11-06T23:00:00Z
description: "A week of useful npm features, going cold turkey on Twitter, enjoying Mastodon, drinking a lot of champagne, and dancing to 2000's bangers until 4 am."
tags: ["Work", "Social", "Champagne", "TV"]

# Weeknote display
# ----------------
highlight: "yellow"

# Links
# -----
syndication:
  links:
    - url: "https://mastodon.social/@rowanmanning/109302911847923924"
      name: "Mastodon"
    - url: "https://twitter.com/rowanmanning/status/1589620843671605248"
      name: "Twitter"
---

  * [Kara](https://ghost.computer/) introduced me to an npm feature this week that I had absolutely no clue existed: the [`overrides` property](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) of `package.json`. My team was puzzling over how to trial switching out our logging library _and_ how we might be able to easily experiment with the [Express v5 beta](https://expressjs.com/en/guide/migrating-5.html), this is the answer to both!

    We can add the following to any of our Express-based apps to just force them into the v5 beta without having to roll out beta versions of our Express wrapping software. Amazing :clap:

    ```json
    {
        "overrides": {
            "express": "npm:express@5.0.0-beta.1"
        }
    }
    ```

  * I think I'm very much a [Mastodon](https://joinmastodon.org/) convert now, and I've noticed my anxiety and stress levels have been lower after going cold turkey on Twitter. I decided that Twitter is just for broadcasting and ignoring, and all my actual social interactions will be on Mastodon which is so much more chill. [Say hi if you're on there](https://hachyderm.io/@rowan).

    I fully removed Twitter from my home screen, it took a little bit of effort not to return to doom-scrolling but I think the habit's gone. I've also moved Twitter notifications into my scheduled summary.

    If I automate posting my weeknotes there, then I maybe never have to go on that website again. :thinking:

  * On Saturday we went to [The Champagne Show](https://champagneshow.com/london/) and tried a stupid amount of champagne. [We did  this last year too](/weeknotes/53/)) so I think it's an annual tradition now.

  * Afterwards, we went to [Oslo](https://www.oslohackney.com/) for their [2000's bangers night](https://www.oslohackney.com/club-nights/shameless/). It was great, as always, but I really need to stop having 4 am bedtimes at the weekend :weary:

  * I've been really enjoying watching Andor. I wasn't such a huge fan of the earlier Star Wars series but this and Obi-Wan Kenobi really gripped me.
