---
# Weeknote title and metadata
# ---------------------------
title: "Week 63: Wordle"
date: 2022-01-09T18:18:00Z
description: "A week of Wordle, ideal starting words, kitchen upgrades, bedroom upgrades, worrying about the trial, a slightly different role, and a lot of Minecraft."
tags: ["Games", "House", "Work", "Health", "Sleep", "Wordle", "Minecraft"]

# Weeknote display
# ----------------
highlight: "lime"

# Images and resources
# --------------------
mainImage: "wordle.png"
resources:
  - src: "wordle.png"
    title: "A grid of coloured squares indicating a Wordle score. Guess 1: unused, wrong place, correct, unused, unused. Guess 2: unused, correct, correct, wrong place, unused. Guess 3: unused, correct, correct, unused, correct. Guess 4: unused, correct, correct, correct, correct. Guess 5: won!"
  - src: "base-before.png"
    title: "An empty badlands biome in Minecraft"
  - src: "base-after.png"
    title: "The same badlands biome but with clay houses build into the cliffs"

# Links
# -----
syndication:
  links:
    - url: "https://twitter.com/rowanmanning/status/1480244890462269443"
      name: "Twitter"
---

  * I've been playing Wordle every day for the last week. It's pretty addictive and I've managed to stay at a 100% solve rate.

    * Of course, there's already a Slack channel for it at the FT.
  
    * I did some research to work out what the ideal starting word is. Previously I was using `STALE` or `STARE`. Based on the Wikipedia entry for [letter frequency](https://en.wikipedia.org/wiki/Letter_frequency) these words aren’t amazing, I just added up the percentage frequencies of each letter (based on dictionary frequency rather than text frequency):

      ```
      STARE = 8.7 + 6.7 + 7.8 + 7.3 + 11 = 41.5
      STALE = 8.7 + 6.7 + 7.8 + 5.3 + 11 = 39.5
      ```

      I wanted something better, the top letters are `ESIAR`, which isn't a word. Immediately I thought of `RAISE` which is pretty good:

      ```
      RAISE = 11 + 8.7 + 8.2 + 7.8 + 7.3 = 43
      ```
    
      However, when you look at the frequency of the first letter in a word, it’s `S` by a pretty huge margin. A quick anagram search and I think [`SERAI`](https://en.wiktionary.org/wiki/serai#English) might be the best starting word.

  * I finally bought a kitchen bin, no more bin sack hanging from the door handle! The kitchen is looking great now. I used a little bit of my [bonus](/weeknotes/60/) to buy new crockery which I didn't _need_ but it's so much nicer than the "temporary" IKEA set I've had for years.

  * I also spent a lot of money on a new bed frame and mattress, which is probably the final step in my [sleep investment](/weeknotes/13/). We've upgraded to a king-size (our room won't _quite_ fit a super king), and got some pillows thrown in with the mattress because of the January sales :tada:

  * I'm sleeping terribly. I hope the bed helps fix it but [maybe I should follow Lee's lead](https://leemoody.co.uk/blog/weeknotes/66/).

  * I'm isolating now ahead of being a witness in a trial, I really don't want to catch COVID and not be able to go to court. It's gonna be stressful, but I'll be happy when it's over – it's been already been delayed ~2 years which has felt like an eternity.

  * Next week I'm starting a slightly different role for a while. I'm going to be embedding in our support team and getting more hands-on with the code. I'd like to use the time to help us improve the monitoring and observability of FT.com. I think it'll be fun and I'm looking forward to a change of pace.

  * Maybe I'm playing too much Minecraft? It's just such a nice way to escape from everything. Gallal and I have moved into a Badlands biome and we're building a slightly Petra-inspired base. I've been enjoying terraforming to make some more dramatic rock formations and most of the buildings hide automated farms. Here's a before/after of my little area:

    {{< image "base-before.jpg" >}}
    {{< image "base-after.jpg" >}}
