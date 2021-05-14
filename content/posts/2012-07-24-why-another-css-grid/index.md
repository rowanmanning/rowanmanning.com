---
title: "Why I Built Another CSS Grid"
date: 2012-07-24 21:34:00
description: "Building yet another grid system could be seen as bloating an already-bloated landscape; but sometimes, rolling your own tools is one of the best things you can do."
cta: "Read about Frag"
highlight: "purple"
tags: ["CSS"]
resources:
  - src: "frag-website-screengrab.jpg"
    title: "A screen-grab of the Frag website"
    params:
      link: "http://fragcss.com/"
---


A couple of months ago, I decided to set about building a CSS grid system. I realise that I've entered a wildly bloated landscape here (you can't move on the web for fancy new grid systems) but I had my reasons. I'd like to talk about why I built a grid system, and why (maybe) you should too.


My Problem
----------

When my website went through its last rebuild, I realised that there was no way I could get by without some kind of grid. I wrote down a couple of requirements that I had:

  * Fluidity - fixed-width layouts don't do it for me.
  * Responsivity - I don't think it's sensible to not provide at least a basic mobile-optimised view.
  * IE7 support - a contentious one, I know, but I want at least a sensible looking page in older browsers.

With these requirements in mind, I decided to have a look at what was available. It didn't take me long to realise that there are a million projects out there; a split between massively overcomplicated frameworks which try to [solve every problem in the world][dont-solve-problems] and neat little [micro-grids][1kbgrid]. While there were some really great libraries, none of them felt quite right for me – I'm hard to please.


Building
--------

What surprised me is how quickly I ended up with a good working (IE 6+) prototype. Not only was it fast, but I had a lot of fun!

After a couple of hours spent tweaking and testing, I [ended up with Frag][frag]. It's not perfect, it's not extremely feature-rich, but it does exactly the job I need it to do.

{{< image "frag-website-screengrab.jpg" >}}


So Why Build Your Own?
----------------------

I'm not advocating rolling your own in every situation, but there are a lot of benefits to spending a little time on your own solution to a problem:

Learning
: I learnt a lot in the process of building Frag, particularly about [CSS3 media queries][media-queries]. I don't know about you, but I love to learn; throwing yourself into a problem is nearly always the best way to do this.

Understanding
: The benefit of understanding the code you're using inside out is massive. There's nearly always an overhead when learning how to use third-party software. Sometimes, for simple things, this is avoidable by building it yourself.

Giving Back
: Whether or not you expect anyone to use it, you can get a pretty good feeling from releasing open-source software. You might help someone out with a project or with learning a new technology. This is awesome!

If you do end up building something great as a result of this post, I'd be really interested to take a look: tweet it at me!

And if you don't fancy building your own grid system, you could always [use Frag][frag] :wink:



[1kbgrid]: http://1kbgrid.com/
[dont-solve-problems]: http://www.rachelandrew.co.uk/archives/2012/03/21/stop-solving-problems-you-dont-yet-have/
[frag]: http://fragcss.com/
[media-queries]: https://developer.mozilla.org/en/CSS/Media_queries/
