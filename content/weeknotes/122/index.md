---
# Weeknote title and metadata
# ---------------------------
title: "Week 122: Goblincore"
date: 2023-02-26T20:35:00Z
description: "A week of interesting playlists, neatly folded jumpers, carpenters, a refreshingly tidy house, evenings coding, reading technical specs, and delicious kimchi."
tags: ["Music", "House", "Side Projects", "Food", "RSS", "Node.js"]

# Weeknote display
# ----------------
highlight: "lime"

# Images and resources
# --------------------
mainImage: "jumpers.jpg"
resources:
  - src: "jumpers.jpg"
    title: "My full range of knitwear neatly folded and organised into cubby holes in a navy blue wardrobe"
---

  * Did you know that if you search Spotify for "mix" then it gives you a huge long list of very specific playlists created just for you? There are a lot. I've been listening to my personal [Goblincore Mix](https://open.spotify.com/playlist/37i9dQZF1EIhJY1EuDgoyf). I didn't know what Goblincore or [Angry Tuna](https://open.spotify.com/playlist/37i9dQZF1EIcPhil8OjV5P) was but I'm happy that I do now. Thanks, random TikTok user who I can no longer find.

  * {{< pin right >}}{{< image "jumpers.jpg" >}}{{</ pin >}}

    It was a very long week, we were sleeping in the living room surrounded by all our vacuum-packed clothes while a carpenter fitted wardrobes in our bedroom. I'm really pleased with them now that it's done though! We have way more storage space than we need, which is my preferred option.

    Finally, my full range of knitwear is neatly folded and available to wear.

  * This means our office is so much more clear too and we can think about painting and finishing that room with even more storage :eyes: I already cleared out our third and final KALLAX. Does anyone in London want a free white 8-holed KALLAX?

  * I spent a bunch of evening time working on [my Node.js RSS/Atom feed parser](https://github.com/rowanmanning/feed-parser#readme). It's a really fun little project and I'm doing some really deep learning about both the specifications _and_ how many real-world feeds don't adhere to them in various interesting ways.

    There's a lovely mix of "build the thing to the spec" and then "run tests against a lot of real feeds and see what isn't correct". I'm erring on the side of _trying_ to populate feed data even for feeds that kind of messily bridge several specs ([RSS](https://www.rssboard.org/rss-specification), [Atom](https://www.rfc-editor.org/rfc/rfc4287)) or use namespaced elements from other specs (e.g. the [iTunes podcast extension](https://podcasters.apple.com/support/823-podcast-requirements)).

    I'm also getting to build and run a suite of compatibility tests, which is a thing I just love. I'm trying to maintain rough compatibility with the Node.js feed parser I currently use ([feedparser](https://github.com/danmactough/node-feedparser#readme)) but with the slightly closer spec-compliance and more in-depth parsing of author/category data that [gofeed](https://github.com/mmcdole/gofeed#readme) provides.

    I intend on migrating [my personal feed reader](/posts/i-like-rss/) to use this once it's done. I read feeds via my reader daily, and [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) will help me uncover bugs.

  * I made kimchi fried rice for the first time in many months and it was so delicious, I need to make it a regular meal again. Gut health FTW!
