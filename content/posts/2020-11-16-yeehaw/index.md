---
title: "Yeehaw!"
date: 2020-11-16 18:30:00
description: "Way back in March this year, early on in lockdown, I had a burst of inspiration and built a silly game which you can play on Slack. I wanted to talk through the process I go through on the rare occasion when I start a side project."
cta: "Saddle up"
highlight: "pink"
tags: ["Side Projects"]
draft: true
draftFeedback: https://docs.google.com/document/d/1zCBwqtUecREn71eYqmJc5DUSGXHGikdIC4UuUJvtwAU/edit
reviewers:
  - name: Jennifer Johnson
    website: https://medium.com/@jkerr321
  - name: Sam Parkinson
    website: https://uncomplicated.systems/
---


Way back in March this year, early on in lockdown, I had a burst of inspiration and a desire to build something silly. I don't really build serious open source things any more because tbh it's a pretty thankless task and my free time is too valuable. However when there's an opportunity to get a quick laugh from a friend by spending several solid evenings coding, sign me up!

This idea came out of a Slack conversation with [Leaf](https://twitter.com/keirog), I don't remember why or which channel, but for some reason it made sense for two horse emoji to race across the screen which Leaf did by repeatedly editing a message until they reached the finish line. It was _gripping_, and while I was watching the two little :horse_racing: step along my Slack window I made a mental note that this joy could be replicated using computers.

[I got it finished](https://github.com/rowanmanning/yeehaw#readme), which isn't the actual point of this post (though you should definitely go and try it if you use Slack). This post explores the process I go through when I'm attempting a fun side project; I've outlined several tips which have helped me to make sure:

  1. I finish the project (because otherwise how will I make my friends laugh?)
  2. I actually enjoy building it (because otherwise why bother?)

{{< image src="/posts/yeehaw/demo.gif" alt="Four horse racing emoji race across the screen from right to left, reaching the finish line in turn" link="https://github.com/rowanmanning/yeehaw#readme" >}}


## Tip #1: Define Goals

I find it really easy to go off on tangents when I'm building something in my spare time. In my day job it's easier to stay focused, because a company is paying for my time and I don't want to waste it; also I'm normally working alongside people in dedicated product and delivery roles. On side projects, I'm a bad product person, a bad delivery manager, and I find it very easy to waste _my_ time.

Defining a clear end goal helps me here, something short like: _"Make it so that people can easily race horses in Slack"_.

I try to periodically check that whatever I'm working on moves me closer to that goal, and if the answer is no then I drop what I'm doing and refocus. This can be easier said than done, so I find setting an actual reminder every hour or so is a good shout, or having a post-it displayed clearly nearby.

You don't need to drop the extra things _forever_, if you think the idea you got side-tracked on is worth adding later then write it down and add it after you've shipped a version 1.

Another thing I find useful when setting my goal is to give myself an explicit list of limitations – things that my project definitely will not do. Sometimes these are things that I suspect I'll get stuck on, for example many of my projects get abandoned mid-way through trying to create my own user system. Other times these are things that I think will make the project less fun or useful. It helps me to write these down, for Yeehaw they were:

  - It will not have a racing interface other than Slack (it was tempting to also build a web version at first)
  - It will not waste the productive time of my colleagues too much (I don't like getting in trouble)
  - It will not ask for permission to read Slack messages (I didn't want to have to deal with potential privacy/security issues)


## Tip #2: Use Familiar Technology

Something I used to say a lot is "I'm going to use this side project to learn X new technology". This is fine and might work well for you, but for me it has resulted in a vast graveyard of abandoned projects. If learning is part of the _end goal_ you defined above then definitely make learning a priority, but for Yeehaw my priority was to get it finished and make some people laugh.

I have a list of go-to technologies when it comes to getting a project built quickly. I have my own reasoning for each of these which may apply to you, but it's best to stick with what you're comfortable using if you just want to get the thing finished. If you're not a big side-project person then this might be the same stack you use at work.

Server-side Languages: JavaScript via [Node.js](https://nodejs.org/)
: I write JavaScript faster than I write any other programming language; it's familiar and I know how to get things done using it. In comparison if I'm writing in something typed then I get really caught up in defining everything perfectly.

Server-side Frameworks: [Express](https://expressjs.com/)
: I've been using Express for years, so again it's really familiar. It's also so commonplace that you can find the answer to almost any question quickly. I appreciate the flexibility of being able to dump everything in one file or split it up as appropriate. I don't have a templating engine I use commonly, though I enjoyed using [htm](https://github.com/developit/htm) with [Hyperons](https://github.com/i-like-robots/hyperons) recently.

Database: [MongoDB](https://www.mongodb.com/)
: Tech bros on the internet seem to _hate_ MongoDB. I've never bothered to find out why, but that alone is a great reason to use it for every project. I find MongoDB to be super quick to get set up in comparison to other databases. I can't be bothered with migrations for a side project, and mine are never going to be high traffic enough to warrant worrying about performance or anything.

Client-side Languages: JavaScript and [Sass](https://sass-lang.com/)
: I avoid client-side JavaScript as much as possible; normally I build something with progressive enhancement in mind and then when it comes to the "enhance with JavaScript" bit I just can't be bothered. I still use Sass, but it feels like I'm getting closer to a time where I don't need a preprocessor for most things.

Client-side Frameworks:
: I still haven't learned how to do a React because who needs more Facebook in their life? See above note on progressive enhancement and client-side JavaScript, but I'm sure at some point I'll learn something and update the way I do things.

Hosting:
: I use [Heroku](https://www.heroku.com/) as a starting point for most projects because it doesn't require me to do anything very ops-like. Heroku means I can have something deployed early, the free tier is fine for most things, and $7 per month isn't _prohibitively_ expensive if I need to have something running more reliably.


## Tip #3: Get it in Production Early

I try to get something running in production as quickly as possible (normally a page that only says "Hello World") and have the pipeline from development to production set up immediately so that my changes are live almost as soon as I've pushed them.

This isn't a concept I made up, lots of engineering teams use [Continuous Deployment](https://en.wikipedia.org/wiki/Continuous_deployment), but why only reap the benefits on work projects?

For most of my Heroku-based projects, my process is:

  1. Create an empty repo on GitHub (normally private to start with) and push my starting-point "Hello World" code
  2. Create a Heroku app and [connect it to the repo](https://devcenter.heroku.com/articles/github-integration), automatically deploying whenever a commit is pushed to the `main` branch

I do this because I've been burned _a lot of times_ by getting a project most of the way done and then realising that I've gone down a rabbit-hole that makes production a pain in the ass to set up. Also, if every commit you push ends up on a public URL then you know that your project will work when you're finally ready to go live; the final fun step of showing people what you built is so much easier, as is getting early feedback.


## Tip #4: Write Documentation

I will die on this hill. The smallest side project deserves some documentation, at least on how to get it running locally. Trust me, if you take a pause and come back to your project a week or month later you're going to love your past self if you left instructions. A [README](/posts/writing-a-friendly-readme/) will do most of the time.

Yeehaw requires a lot of fiddly setup, including having to create your own distributed Slack app if you want to run it locally. With some [clear documentation](https://github.com/rowanmanning/yeehaw#slack-app-setup) on this, I know that next time I want to work on the project I won't spend hours trying to remember how it works.


## Tip #5: When the Fun Stops, Stop

If I'm spending my precious spare time writing code, I sure as hell better be enjoying myself. It's not worth the hit to your mental health to try and push through when you're no longer enjoying working on a side project. I've only got good at taking this advice from myself relatively recently; I used to force myself to continue working on things because of the sunk cost.

Now if I sense that a side project has become a grind, perhaps I've bitten off more than I chew or my original idea just doesn't strike me as fun any more, I just stop. It's not a waste of time if you learned even a small thing, and maybe a bit of code you wrote somewhere in the project will be useful another time.


## Recap

So to recap, when I decide a side project is worthy of my precious free time, I use the following tips to help me either get it finished or avoid burning out:

  1. I **define some goals** to keep me focused

  2. I **use familiar technology** so that I can work faster and reduce the chance of abandoning my project

  3. I use **Continuous Deployment** so that I know my project works in production

  4. I **write documentation** so that I can pick up the project after a break

  5. If I'm not enjoying working on a project any more, I **just stop**

I'm sure mine isn't a comprehensive list of ways to manage side projects, I'm really interested in hearing yours. Tweet me about it below, or share your own tips. Also, [go and try out Yeehaw](https://github.com/rowanmanning/yeehaw#readme)!