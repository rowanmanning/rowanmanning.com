---
# Weeknote title and metadata
# ---------------------------
title: "Week 70: 🇺🇦"
date: 2022-02-27T12:15:00Z
description: "A week of doom-scrolling, office conversations, friends moving away, raw throats, naked mouths, open-source software, and a new mattress."
tags: ["Social", "Sleep", "Open Source", "Side Projects", "Work", "JavaScript"]

# Weeknote display
# ----------------
highlight: "blue"

# Links
# -----
syndication:
  links:
    - url: "https://twitter.com/rowanmanning/status/1497945255110340617"
      name: "Twitter"
---

  * I don't know what to say about Ukraine. I'm flitting between avoiding news, just to be able to get things done, and doom-scrolling. [Alex covered this better than I could](https://alexwilson.tech/content/256730a2-c09e-4319-ae77-239d05eaf15a). I try to keep these weeknotes relatively news-light because they're mostly there to help me process what's going on in my life, but it'd be weird not to highlight the impact this is having. As with [Alice's note](https://alicebartlett.co.uk/blog/weaknotes-182), there's a definite vibe shift below.

  * I'm enjoying the office. A couple of times recently I've had excellent work and personal chats with colleagues that just would never happen fully remote. I might try switching to twice a week soon.

  * Nobody's masking up anymore, apart from in the office. Still feels very weird seeing naked mouths everywhere.

  * Our friend Andy is moving to Finland in March _very_ close to the border with Russia :grimacing: we went to Birmingham for the weekend to see him off. I love a night out in a city where everything's closer together, we pub crawled and then did karaoke until 3 am. I managed not to pull my usual stunt of falling asleep in the pub because I need my beauty sleep. The train journey home was not good.

  * What was good was coming home to our new mattress being set up (well done past Rowan and Charlotte). We both quite like a firm mattress and we splashed out on a [Simba Hybrid® Luxe](https://simbasleep.com/products/simba-hybrid-luxe-mattress), I had the best night's sleep since I can remember. Turns out all I needed was ten layers of patented Simba technology.

  * I spent a lot of my free time this week revamping some of my open-source libraries. Most of them were kind of in a state of abandonment, with hundreds of Dependabot PRs open and upgrading everything felt like a monumental task. I also wanted to simplify my build setup by retiring my old shared Makefile and moving everything from a mix of Travis CI and CircleCI to GitHub Actions.

    * In this case, the solution to having too much open-source was obvious to me: create a new open-source tool. I spent a bit of time working out what standards I wanted for my Node.js libraries and codified them into a [simple command-line tool](https://github.com/rowanmanning/validate-project#readme) that I can run in a repo to validate and then auto-fix a lot of issues.

    * I'm super pleased with it, and the little bit of up-front investment means that 16/34 of my Node.js projects have been overhauled with relative ease, and 6 more have been archived because I don't need them anymore. I'm still at ~220 Dependabot PRs, but that's down from 500 :muscle:

    * I'm really happy with the improvements to my standard way of writing open source JS projects:

      * Everything has a contributing guide and code of conduct

      * Everything uses `main` instead of `master` as a default branch

      * My published npm packages are smaller because I have a far better `.npmignore`

      * I've switched away from `Make` in favour of `npm.scripts`

      * I've disallowed a bunch of dependencies that I either no longer know how to use, or they're owned by Facebook (bye Jest)

      * Everything has consistent and well thought out GitHub Actions
    
    * Interestingly, now that I look back over the week, knuckling down and churning through a lot of repetitive and well-defined work was _100%_ me trying to cope with the news.
