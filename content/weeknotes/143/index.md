---
# Weeknote title and metadata
# ---------------------------
title: "Week 143: Terraforming"
date: 2023-07-23T22:35:00+01:00
description: "A week of broken feed readers, strategic quacks, drawing on post-it notes, learning Terraform, automating my GitHub, and some chilled cocktails."
tags: ["Side Projects", "Games", "Work", "Social", "Board Games"]

# Weeknote display
# ----------------
highlight: "lime"

# Images and resources
# --------------------
mainImage: "post-its.jpg"
resources:
  - src: "post-its.jpg"
    title: "A whiteboard covered in post-it notes, each showing a different way to visualise data"
---

  * Hello friends! I've just spent two hours trying to work out why my self-hosted RSS reader couldn't connect to my database so that was fun. So here I am starting my weeknotes at 10 pm :tada:

  * I fixed it by deleting the entire database cluster and building a new one. I think I was never closing the database connection and so they just built and built until somehow made my free tier MongoDB Atlas completely fall over. Like I couldn't even connect to it through their own interface?? I have no idea what I'm doing.

  * I forgot how much I enjoy [The Quacks of Quedlinburg](https://boardgamegeek.com/boardgame/244521/quacks-quedlinburg) (board game). It probably helps that I was just really on the ball this week, top strats.

  * {{< pin right >}}{{< image "post-its.jpg" >}}{{< /pin >}}

    Jeison (my Product Manager) ran a couple of design workshops this week, it was great to get together in person and draw on post-its instead of digitally. It aligned us all on what the new dashboards we're building will look like, and we came up with some really neat ideas by smushing our drawings together. Fun!

  * On Saturday I decided I fancied properly learning [Terraform](https://www.terraform.io/), it's been a while since I did a deep dive into a new language/technology. We use Terraform at work and I've kind of muddled through small changes but now I feel like I grasp a lot of the concepts.

    Obvs I'm not just doing this for work, though it's useful; I decided to automate something real. It's been super fun! I now have [a GitHub repo](https://github.com/rowanmanning/terraform-github) set up that orchestrates the settings for my other GitHub repos (no _you're_ over-engineering).

    It's quite basic at the moment, but I've handed over control of `CODEOWNERS` and `LICENSE` files to Terraform, as well as core repo settings like the default branch and which kind of merge commits are enabled. Many more things will follow!

    I suspect that, for a while, every problem I encounter will look very much like it could be solved with Terraform :eyes:

    **Alex M:** maybe it's time for that "automate our Heroku apps" side project? :grin:

  * In the evening we popped over to see Jenn and Chris and make some cocktails for Chris' birthday. It was a success, though towards the end everything just tasted like the cherry wine we were trying to use up. I can still make a great Old Fashioned.
