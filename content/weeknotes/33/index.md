---
title: "Week 33: Fire Safety"
date: 2021-06-13T14:10:00+0100
tags: ["House", "Games", "Social", "Work", "Side Projects", "Tootsie", "TV", "Cladding", "Board Games", "Gloomhaven", "Champagne", "Lucifer", "Webmentions"]
highlight: "red"
description: "A week of house buying progress, new characters, sun and champagne with friends, and a lot of time spent learning how webmentions work."
resources:
  - src: "webmentions.png"
    title: "A screenshot of the \"Responses\" section of one of my blog posts, showing social interactions with the post and a form to submit your own mentions of the page."
---

  * I'm applying for a mortgage! I never thought I'd be so happy to see a fire safety form, but the flat I'd like to buy now has an EWS1 form and I might print it and frame it. I've instructed a solicitor and I'm finally beginning the long process of handing over all my personal details ready to be scrutinised.

    I suddenly feel guilty about perfectly ordinary things in my bank statements :grimacing:

  * I unlocked a new character in [Gloomhaven](https://boardgamegeek.com/boardgame/174430/gloomhaven)! Both of my previous characters have been ranged spellcasters, and this one is all about melee combat and it's _really_ difficult. I nearly died instantly but it was fun. My board game group only really have time to play once a month at the moment so I find myself looking forward to our sessions a lot more.

  * It's still a bit tough getting excited about work, but I've pushed myself to be a bit more technical over the last week or so and I think it's helping (slowly).

  * Hasn't the sun been amazing? We went and drank champagne on [Jenn](https://twitter.com/teachlearncode) and [Chris](https://twitter.com/mowjj)'s balcony and it was delightful.

  * We finished watching Lucifer because of sunk cost. It was predictably cringey.

  * I've had a whale of a time implementing [Webmentions](https://indieweb.org/Webmention) on this website. Thank you [chee](https://chee.snoot.club/) for introducing me to them! So far I've only implemented _receiving_ mentions, but publishing is on its way. Here are some dull technical details (I might write a long-form post later):

    * This is a static site built with [Hugo](https://gohugo.io/) and hosted on GitHub Pages, so it'd be difficult to implement my own `/webmention` endpoint. I set up [Webmention.io](https://webmention.io/) as a receiver for now.

    * Most of the interactions on the stuff I write comes from Twitter, so I set up [Bridgy](https://brid.gy/) to listen for any tweets mentioning this website, or likes and retweets on my tweets about this website.

    * For displaying webmentions on my site, I took some inspiration from [this guide](https://sebastiandedeyne.com/webmentions-on-a-static-site-with-github-actions/) which outlines how to use GitHub actions to poll for new mentions. I now have [an action](https://github.com/rowanmanning/rowanmanning.com/blob/main/.github/workflows/fetch-webmentions.yml) that runs every 30 minutes to fetch new mentions from the Webmention.io API and save them as JSON in the repo. [My script](https://github.com/rowanmanning/rowanmanning.com/blob/main/scripts/fetch-webmentions.js) isn't pretty but it works :slightly_smiling_face:

    * My page templates now look for a matching JSON file and render webmentions beneath the content. You can see this on any of my blog posts or weeknotes (see [Writing a Friendly Readme](/writing-a-friendly-readme/#responses)). I'm excited about it:

      {{< image "webmentions.png" >}}

  * OK, that's enough weeknoting. We're going to take [Tootsie](/tags/tootsie/) to the park on his harness for the first time :pleading_face::heart::wave:
