---
# Weeknote title and metadata
# ---------------------------
title: "Week 34: £137,000"
date: 2021-06-19T10:00:00+01:00
description: "A week of thinking about dad, second flat viewings, paying London rent for 7 years, and making my static website searchable."
tags: ["Family", "House", "Side Projects", "Games", "Social", "Champagne", "Board Games", "Catan", "Writing", "13.7"]

# Weeknote display
# ----------------
highlight: "lime"

# Images and resources
# --------------------
resources:
  - src: "dad.jpg"
    title: "My dad standing amongst trees and holding me as a baby"
    params:
      caption: Dad and me back in 1988

# Links
# -----
syndication:
  links:
    - url: "https://twitter.com/rowanmanning/status/1406180396988051467"
      name: "Twitter"
---

  * I'm posting this early because it's Charlotte's birthday on Sunday and I'm gonna be pretty busy all weekend. Today (Saturday) we're going to see her dad and brother for a meal, and then tomorrow we'll be drinking a lot of Champagne and playing mini-golf.

  * {{< pin right >}}{{< image "dad.jpg" >}}{{< /pin >}}
  
    Wednesday marked 15 years since my dad died. We're rapidly approaching the point where I'll only have known him for half of my life, which is wild. Becky (sister) and I had a nice phone call and chatted about it, it definitely impacts us less year on year which feels sad somehow.

  * I went to view my flat a second time, and have renewed excitement about the whole process (it's lovely). I have a solicitor, mortgage application stuff is happening, I was very happy until my first mortgage application got rejected due to Halifax's maximum borrowing amount. Oh well, onto the next lender!
  
  * Since I moved to London 7 years ago I've paid ~£137,000 in rent. Trying not to get too annoyed about that.

  * I played [Catan](https://boardgamegeek.com/boardgame/13/catan) for the first time in years, I forgot how unbalanced it can be (especially with 5 players). I came second, which I'm happy with.

  * My [website tweaking](/weeknotes/33/) continues, this week I spent a few evenings on and off implementing search! It was a fun challenge because this is a static [Hugo](https://gohugo.io/) website; I had to get creative.

    * I decided an acceptable fallback for my site's core experience was a Google site search, so if JavaScript doesn't load for whatever reason you can still find stuff relatively easily. The search box (in the header up there :point_up:) by default sends your query off to Google with a `sitesearch=rowanmanning.com` parameter.

    * For the enhanced search, I decided to try out [Lunr](https://lunrjs.com/) to index and search my content. Hugo is super powerful, I hacked together a [JSON content type for my home page](/index.lunr.json) which is just a dump of all my site content. I lazy-load this JSON when someone uses search to keep the initial page weight down and create an index with Lunr.

    * For the displaying of search results, I used the Government Digital Service [Accessible autocomplete](https://github.com/alphagov/accessible-autocomplete), it's so well put together and I found it painless to set up (well done GDS team). I custom styled it to fit in better with the rest of this website.

    * I set up a couple of keyboard shortcuts (try typing `/` or `cmd+k`) using [Hotkeys.js](https://wangchujiang.com/hotkeys/) – I initially tried building something myself but then realised something stable and well tested made more sense.

    * All of this is the first JavaScript I've added to this website, and everything still works without it :thumbs_up:

  * I started working on a longer-form blog post about implementing [Webmention](https://indieweb.org/Webmention), it's going to be quite a big read I think :grimacing: - [hopefully chee is OK waiting for a while](https://chee.party/2021/06/15/1328/).
