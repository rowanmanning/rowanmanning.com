---
title: "Organising a virtual treasure hunt as a team social"
date: 2021-05-10 14:00:00
description: "The real treasures were the friends we made along the way"
crossPost:
  siteName: "FT Product & Technology"
  siteUrl: "https://medium.com/ft-product-technology"
  url: "https://medium.com/ft-product-technology/organising-a-virtual-treasure-hunt-as-a-team-social-ab689e700fc"
cta: "Read about how we built a fun virtual treasure hunt"
highlight: "yellow"
tags: ["Social", "Team Building", "Treasure"]
mainImage: "treasure-hunt-slide.png"
resources:
  - src: "hype-01.png"
    title: "A Slack message containing a lot of “hype” emoji, and the words “FRIDAY HYPE BUILDING - WFH TREASURE HUNT"
  - src: "hype-02.png"
    title: "A Slack message containing a lot of “treasure chest” emoji, and the words “WFH TREASURE HUNT - TEAMS"
  - src: "hype-03.png"
    title: "A Slack message containing a lot of “hype” and “treasure chest” emoji, and the words “MORE FRIDAY HYPE BUILDING - WFH TREASURE HUNT"
  - src: "hype-04.png"
    title: "A Slack message which contains only 240 “hype” emoji, posted by a colleague in Slack"
  - src: "planning-spreadsheet.png"
    title: "A Google Spreadsheet containing columns for clue, answer, hint, where it’s found, and where does it lead. The clues are linked to from this document"
  - src: "find-jk.png"
    title: "A large crowd of people watching the horse race at Cheltenham. Two of the faces have been replaced with our CPO and Donald Trump"
  - src: "maths-quiz.png"
    title: "A screenshot of a Zoom chat window, which features Albert Einstein, Ada Lovelace, Alan Turing, and David Blackwell. Einstein is introducing a maths quiz via a drawn on speech bubble"
  - src: "donald-and-joe.png"
    title: "A screenshot of a fake Slack conversation between Donald Trump and Joe Exotic"
  - src: "joe-exotic-myspace.png"
    title: "A fake MySpace page for Joe Exotic. The background is a tiger print pattern, and there’s a word-search to one side"
    params:
      caption: "I think the result was beautiful"
  - src: "sms-flow.png"
    title: "A screenshot of a Twilio Studio, with lines connecting an incoming SMS trigger to various automated responses"
  - src: "treasure-hunt-slide.png"
    title: "A slide from our presentation, it contains an image of a treasure chest and the words “We’re going to take you on a treasure hunt to commemorate a pretty tough 365 days”"
reviewers:
  - name: Emma Lewis
    website: https://www.ft.com/emma-lewis
  - name: Glynn Phillips
    website: http://www.glynnphillips.co.uk/
  - name: Caroline Handley
    website: https://medium.com/@carolinej.is
  - name: Sarah Wells
    website: https://twitter.com/sarahjwells
---

On the 12th March 2020, we got an email from Cait, our head of department, which explained that we’d be working remotely for the foreseeable future. At the time we had no idea how long it would last. The months dragged on, and in February 2021 we realised that the anniversary of remote working was rapidly approaching.

Working remotely has been tough, and many of us really miss the social aspect of being in an office – going for team lunches or just chatting while making tea. On top of this, [we’ve hired a lot of new people since the pandemic began](https://medium.com/ft-product-technology/one-year-later-lessons-learned-from-remote-onboarding-122142e0173c), many of whom haven't had a chance to meet their colleagues in less formal settings.

We attempted to combat this throughout 2020 by running remote social events, at a team level and department level. We’ve lost count of the number of quizzes, virtual pictionaries, quizzes, Among Us games, and quizzes attended! We hosted [radio shows](https://medium.com/ft-product-technology/beyond-quizzes-making-and-streaming-a-radio-show-for-your-team-remote-social-1a061bde47f4), we [booked goats](https://www.cronkshawfoldfarm.co.uk/goatsonzoom), and in June 2020 [Alice Bartlett](https://alicebartlett.co.uk/) ran a virtual treasure hunt to say goodbye before her shared parental leave.

When we ([Glynn Phillips](http://www.glynnphillips.co.uk/) and I) realised that a year of remote working was approaching, we decided to shamelessly steal Alice’s fun treasure hunt idea and expand it to work for the whole department. Once we had Alice’s blessing, we got to organising.

This post tells the story of how much two engineers can overcommit to an idea. It explores the process we went through to create a fun virtual treasure hunt, and some lessons learned along the way.


## Planning

Once we’d decided to do the treasure hunt, we were bursting with ideas. The first step was to get all these ideas down on paper and work out which things were achievable within a month, considering that we both had other work to do too. The brief we’d set ourselves of “virtual treasure hunt” is fairly open and could be interpreted in a bunch of different ways. Alice’s treasure hunt hid clues in Google docs and Slack mostly, and we both knew that we wanted a trail of clues through various virtual spaces like this. The first thing we did was write down a list of all the places we could possibly hide clues that would be accessible to anyone in the department. Our rough list was:

  * Google docs
  * Old emails
  * Slack channels/bots
  * Build a website
  * Youtube video
  * Google hangouts
  * SMS

We had more ideas initially but trimmed them down a lot to make sure we would have time to execute everything well. We decided against trying to get a real FT article published containing a clue or secretly committing code to the FT.com codebase because it felt a little risky. We also cut out things that wouldn’t work for everyone in the department, for example, clues hidden in GitHub issues would only be accessible to engineers.

The next thing we needed was some inspiration to start producing clues to add to our hunt. We wanted to use things that were vaguely themed around our year working from home and news events from during the pandemic. We spent some time listing all the possible themes, facts, and figures that we could use in our clues and ended up with a long list of things to draw on.

We had a list of around 30 ideas/themes. We adapted our initial list a little to make sure that we were not excluding our colleagues from Manila or Sofia – being too UK-centric would have made it more difficult for them.

Lastly on planning, we needed to decide on the length of the hunt and how we wanted to structure the teams. We wanted teams of around four people, as this would make it harder to accidentally exclude a team member, and for the hunt to last 30–60 minutes so it was a reasonable thing to do in the middle of the day. We thought 10–15 clues should be enough to get started and do a test run.


## Hype

One of the earliest decisions we made was that we needed to build hype for our treasure hunt. Department socials are optional attendance, and we knew we wanted a good number of people to get excited about it and attend. The very first thing we did was to get something in the calendar a good month in advance. Then we started the hype train with weekly announcements in Slack.

{{< image "hype-01.png" >}}

{{< image "hype-02.png" >}}

{{< image "hype-03.png" >}}

I think this helped build excitement, and on the day we had pretty good attendance as a result. By the week of the treasure hunt, we even had some of the participants hyping it for us.

{{< image "hype-04.png" >}}


## Executing the plan

Once we had the hype train well and truly running, we started working on the clues. We put together a spreadsheet for planning out the flow between clues. We worked separately on a few clues each so that they could be done in parallel, and then slowly started tying them together with quick Slack discussions.

{{< image "planning-spreadsheet.png" >}}

We wanted to make sure that there was variety in the clues, for example, we didn’t want people to go through a long series of Google Docs in a row, so we tried to evenly distribute the format of the clues. This meant that we were constantly reshuffling and reworking things for a while.

We also wrote down predetermined hints for each of the clues. We knew that people would get stuck occasionally and having a consistent and fair way to offer help would make things run smoother on the day.

### Google Docs

Our Google Docs clues were a sight to behold if I say so myself. Google Slides allowed us to be quite visual and prevented the treasure hunt from becoming a prolonged trivia quiz.
One example is: “Who is [JK](https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F001e0936-9cd9-11e9-b8ce-8b459ed04726?fit=scale-down&source=next&width=700) (our CPO) hanging out with at Cheltenham? Find a Slack channel with the full initials of JK’s companion. The next clue awaits you.”

{{< image "find-jk.png" >}}

We decided that even if a Google Doc _is_ essentially a quiz, then we should make it more engaging by using visual elements that nod to our time in lockdown. For example, the Zoom Maths Quiz asked participants to add up key pandemic statistic, but it was run by famous people in STEM:

{{< image "maths-quiz.png" >}}

We had great feedback on these more visual clues, and people stayed engaged for longer because of them.

### Slack

We knew we wanted to have some secret Slack channels and messages as part of the hunt, and we were originally thinking of writing a Slack bot that posed questions for people to answer. However, we realised that we may not have enough time for that. We didn’t want to just post messages from me or Glynn, and we wanted them to be obviously part of the treasure hunt, so we opted for setting up a Slack webhook and posting messages as various people via the API.

The results were fun, and they made the Slack parts of the hunt a bit more interesting than just a written clue from one of the organisers.

{{< image "donald-and-joe.png" >}}

To simplify things, we ran the scripts locally on our machines using a Slack API token. For anyone interested in doing something similar, there’s a quick set of scripts [in this repo](https://github.com/rowanmanning/treasurebot).

### Website

With Glynn and I rarely getting a chance to work on a brand new website, we knew we had to build one as part of the treasure hunt. It gave us a chance to do things that were a bit more interactive than a Google Doc or Slack message. Glynn did an amazing job of setting this up and he hosted it on Netlify.

To direct people to the website we used a mix of links in Google Docs or Slack, but we also used it as a way to verify answers. For example, the maths quiz included the instruction: “Go to `https://our.domain/X` where `X` is the solution to our maths problem.”

{{< image "joe-exotic-myspace.png" >}}

### Video

One of the more time-consuming clues we decided to work on was a video. In 2019, the FT’s London office moved from One Southwark Bridge to Bracken House, a 10-minute walk. We decided to film the journey between the offices and asked participants to count things that they saw on the journey.

We thought this would also pad the time a little bit as it required people to watch the same video multiple times to come up with an answer. This mix of short and longer clues worked well for us.

You can [watch the video here](https://www.youtube.com/watch?v=cFXNSm4ja_4) but be warned there’s a guest appearance in the middle.

{{< video "cFXNSm4ja_4" >}}

### SMS

I’ve been looking for a reason to play with SMS, and this seemed like a good opportunity to do so. We signed up for the [Twilio](https://www.twilio.com/) API. I expected this part of the treasure hunt to take forever, but it was really quick using Studio which requires no code.

We went for a simple `Text <value> to <number>` approach, and then the next clue was delivered back in an SMS response. It worked well and added a new format to reduce repetitive Google Docs and Slack channels.

{{< image "sms-flow.png" >}}


## Playtesting

Once we’d reached 12 clues, we decided it was time to playtest the treasure hunt. We had several willing volunteers thanks to our hype-laden Slack messages, and we invited them to a run-through.

On the day of the hunt we knew we wouldn’t be able to sit with each of the teams and watch them run through, so this was our only valuable opportunity to watch some people work through the clues. We couldn’t have asked for a better group of play-testers, it was a joy to watch [Emma Lewis](https://www.ft.com/emma-lewis), [Jennifer Johnson](https://jenjohnson.dev/), and [Jennifer Shepherd](https://twitter.com/teachlearncode) work together and we were super thankful for their time.

We learned a lot from the playtest and made a lot of improvements. For a start, it took them half of their time to work out the first clue, which indicated to us that it was way too difficult. They also breezed through some of the other clues that we thought were much harder. If we’d had more time we would have had several more playtests with different groups, and I don’t recommend building a treasure hunt without at least one trial run.


## The day of the hunt

When the day of the treasure hunt arrived, we posted a few more hype messages and did some final preparations. We made the Google Docs publicly searchable for FT employees and pinned various Slack messages which were required for the clues to work.

We did a final run-through of our introductory slides making sure we knew what we wanted to say, and then sat waiting for people to arrive. We were thrilled when 80 people ended up joining the Google Meet – our hype-building was successful.

{{< image "treasure-hunt-slide.png" >}}

We ran through some guidelines in a presentation, people left to join their own team hangouts, and we posted the first clue on Slack.

The next hour was adrenaline-fueled. We divided up helping any teams who were struggling, and we sat in the winners’ video chat which the last clue pointed to, waiting for the first people to arrive. We got ready to record finishing times so that people would know how they did and watched Google Docs to see how far each team had got.

Watching all the treasure hunters trickle into the winners’ chat was super rewarding – everyone seemed to have a lot of fun, and nobody was too angry that we Rick Rolled them in the video clue.

### What went well

  * Everyone arrived between 20 minutes and an hour from the start, and the number of hints we gave out was pretty even, so I think we gauged the difficulty well

  * None of the clues had technical issues (we were worried about SMS for a while)

  * The social encouraged people to interact a lot in their small teams and work together on the clues, so it didn’t feel like a passive activity

  * People had a lot of fun and we got some lovely feedback, and people noticed the amount of effort we put in. Cait, our CPIO, said: “That was the most fun I have had at work in about a year”


### What went less well

  * We had some issues with breakout rooms in Google Hangouts which delayed the start of the quiz by a panicked 5 minutes. We probably could have tested this part of the hunt a bit more thoroughly

  * We didn’t prepare what we were going to do in the winners chat, and we didn’t communicate that teams can leave once we’ve recorded their time. This meant that we had to awkwardly make small talk while trying to monitor the remaining teams


## Wrapping up

Once the last team had checked in and left, we breathed a sigh of relief. It was a super fun and rewarding experience, but also exhausting. I thoroughly recommend running something like this if your team or company is working remotely and hope you get some inspiration from this post.

If you do so, we recommend:

  * Be inclusive - only hide clues in places that everyone will have access to, and think about different backgrounds and cultures when putting together clues. For us, this meant not being too London or Sofia centric

  * Go overboard - adding fun details to your clues is really worth the extra work, people will enjoy your treasure hunt that much more

  * Playtest as much as you can - just like user testing your website, this is invaluable and gives you a lot of insight into any changes you might need to make

Thanks for reading, happy treasure hunting!
