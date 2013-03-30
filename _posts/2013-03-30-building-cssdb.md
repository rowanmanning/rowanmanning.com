---
title: Building CSSDB
date: 2013-03-30 00:38
description: How I tackled the build of CSSDB over a weekend. Outlining my technological decisions, and how the site kept nice and snappy under heavy load.
tags: [CSS, Express, JS, Node]
layout: post
---

Last weekend I built [CSSDB][cssdb], a curated collection of great CSS, Sass, LESS and Stylus libraries. It was primarily an excercise in learning, but it was also a site which I could have made excellent use of (especially in the early stages of my development career).

I launched on Monday to little fanfare, but on Tuesday the site suddenly seemed to explode in popularity. This was quite unexpected, but I was excited to see my technical decisions come under some strain – it was addictive to watch my metrics and see how the site performed under load.

After a couple more days, I thought it might be interesting to write up my decisions. So here we are.


On Paper {.topper}
--------

Before jumping into development work, there were a few decisions I'm glad I made before touching a line of code. I wanted the site to be as automated as possible. I couldn't have known it at the time, but this turned out to be one of the best decisions I made considering the traffic and volume of submissions I started to get.

There were two tasks which stood out to me as painful to complete manually. The first: handling and adding submissions; the second: keeping repository stats (stars, forks, etc.) up to date.

To get an initial prototype out the door, [GitHub][github] seemed an absolute no-brainer. The GitHub API is stable and well-documented – it could give me all the information I needed and had sensible rate limiting. Once this decision was made, a lot of the automation work just fell into place.


The Server Stack {.topper}
----------------

Having experimented a lot in [Node.js][node], it seemed a logical choice to me. I love writing JavaScript, and Node is extremely performant.

I'd also been keen to work with a document store, which also makes sense for the site if you consider each library to be a document – there are no relations needed. For this, I chose [MongoDB][mongo].

Once I'd made some choices on my development stack, I had to consider hosting. Here I'll come clean: I can hack my way around server-side code just fine, but I have to draw the line at sysadmin work. Quite frankly it doesn't excite me that much, and I normally end up frustrated. For this reason, I started looking at cloud hosting platforms.

I've used Nodejitsu before, but one of my bugbears there is that database hosting has to be purchased through a third-party. I ideally wanted a single service rather than cobbling together my app with server resources from a few different companies; this could get pricey quite quickly.

In the end, I discovered (and decided on) [Modulus][modulus]. Their focus is on Node.js and MongoDB (at the moment) and it just seemed to fit perfectly with what I was trying to achieve. After a week, I'm so glad I made this decision. Modulus' service is excellent, it's reliable under load and I found their customer service outstanding; I'm impressed.


Building The Node App {.topper}
---------------------

I immediately started development with [Express][express], a beautifully simple web framework. I used the [native MongoDB wrapper for Node][node-mongo] over bloated ODM libraries, as I wasn't doing anything particularly complex with storage. The all-important task scheduling was built with [node-cron][node-cron].

I won't go into too much technical detail here, but what I ended up with was a flow as outlined below. I'm quite pleased with how little manual work is involved:

1. Somebody submits a library on the site
2. The new library is stored in the database and marked as inactive.
3. Every 30 minutes, an email is sent to me outlining any new inactive libraries. Each library has a unique activation link as well as a link for me to look at the library on GitHub.
4. When I click on an activation link, the repository details for that library are fetched from GitHub, and it becomes visible on the site.
5. From this point on, every 20 minutes, any libraries which have not been updated in the last two days are re-fetched from GitHub. This keeps the stats nice and fresh.

All of this gives me a lot of flexibility – I can (and do) process new libraries happily on my morning commute!


Designing The Site {.topper}
------------------

I'm not a designer, as may be evident, so I elected to go with a very simple minimalist design. Afterwards I found out that I'd inadvertently done "Flat Design", apparently it's a trend.

After sending an early version of the site out to some friends for feedback, the talented [Bevan Stephens][bevan] went above-and-beyond the call of duty and gave me some excellent advice which helped me tighten up the design.


Building The Front-End {.topper}
----------------------

The last part of the build was the front-end. There's no client-side JavaScript whatsoever (except some tracking nonsense) so framework-wise that was an easy decision to make.

In terms of CSS, I used a couple of my own libraries. This is mainly because I wanted to give them a bit of use, and they're actually well suited to a small website. Also, I'm quite familiar with them!

* [Pigeon][pigeon]: *"An OOCSS framework for rapid prototyping and building smart, scalable sites"*
* [Frag][frag]: *"A fluid, responsive, simple grid system for CSS"*


Conclusion {.topper}
----------

I had a lot of fun building [CSSDB][cssdb]. As well as being well suited to building performant sites, the technologies I chose are enjoyable to work with.

All-in-all, I haven't regretted any of my choices (yet). The site's remained fast and responsive under a moderate (but increasing) load, and I'm getting a steady flow of submissions.

It's my intention to open-source the code behind the site at some point soon – I'd like to have some more people's eyes on it and get some community participation going. Before I do that, though, some house-keeping is in order: CSSDB was built over a weekend, with little consideration for maintainability and ease-of-understanding for anyone other than me :)

Anyway, I hope you've enjoyed my ramblings! Maybe you learned something, or have something to teach me? I'd love to get some feedback on my approach to this build or the site itself.

Thanks for reading,  
Rowan.


[bevan]: http://bevanstephens.com/
[cssdb]: http://cssdb.co/
[express]: http://expressjs.com/
[frag]: http://fragcss.com/
[github]: http://github.com/
[modulus]: https://modulus.io/
[mongo]: http://www.mongodb.org/
[node]: http://nodejs.org/
[node-cron]: https://github.com/ncb000gt/node-cron
[node-mongo]: https://github.com/mongodb/node-mongodb-native
[pigeon]: http://pigeoncss.com/
