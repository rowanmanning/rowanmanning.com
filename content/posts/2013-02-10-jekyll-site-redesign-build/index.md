---
title: "Jekyll Site Redesign/Build"
slug: jekyll-site-redesign-build
aliases:
  - /posts/jekyll-site-redesign/build/
date: 2013-02-11 00:16:00
description: "I rebuilt my site with Jekyll, along with a small design refresh; it went so smoothly I thought I'd blog about it. Definitely something to consider if you're building a small site."
cta: "Read about my site rebuild"
highlight: "orange"
tags: ["Design", "Jekyll"]
---


It's been about 9 months since my last site design/refresh, and the code was starting to show it's age (that's got to be a separate post – just how quickly standards change). I recently built a couple of small sites with [Jekyll][jekyll] and decided to port by existing blog over to it.

Jekyll is a beautifully simple static site generator. The ease-of-use with this tool is crazy, I had so much fun with the rewrite just because Jekyll works in exactly the way you'd expect it to.


My Previous Site
----------------

My site was originally built using [DocPad][docpad], another static site generator, but where Jekyll comes out on top for me is it's simplicity. For some people, I'm sure the massive flexibility of DocPad would be a must-have – you can change nearly everything about it – however I'd started to find this more of a hindrance than anything. The complexity of my site was starting to get in the way of me actually publishing anything.

My second bugbear with my previous site was that I had to generate it locally in order to publish to GitHub Pages. This didn't seem like an issue at first, but having to keep a source and output branch on GitHub was becoming a pain. Jekyll, on the other hand, is running on GitHub pages allowing me to just make my changes and push once.

Spurred on by the [success others had with moving to Jekyll][csswizardry-jekyll], I decided this was the way to go.


Transitioning
-------------

Luckily, having come from another static site generator, a lot of my content was already in Markdown format. This meant I didn't have to mess around with outputting from a database, or work with a bunch of generated files.

As porting blog posts was actually pretty easy, the bulk of the work involved moving my templates and partials from Eco to Liquid. This took a while because I'd customised quite a lot in my previous site to allow nicely formatted dates and the like. All in all, the initial port took a couple of hours.


Rebuild
-------

Once I had my site ported over to Jekyll, it was time for a redesign. As is always the case, I'd neglected the code quality of my own site far more than I would any work or freelance project.

I made the move from LESS to Sass, which I've been meaning to do for a while, and have used {{< abbr "Object-Oriented CSS" >}}OOCSS{{< /abbr >}} wherever possible. The site's code is now a much better representation of my abilities (at least for the next month or two&hellip;).

I'm now also using an excellent [icon font from Icomoon][icomoon]. This has reduced the number of images used for styling to only one – the background noise. I'm really pleased with this! I'd recommend Icomoon to anyone wanting to start out with icon fonts.


Open-Source
-----------

Lastly, I'm a huge lover of open-source; it seemed a bit hypocritical of me to keep my personal site in a private repository as it has been for the last year. I decided to open-source the code to my site, and it's now [available on GitHub][repo]. Feel free to peruse, learn and teach!

If you spot anything that I've missed out, please let me know (or open a pull-request).


Your Site?
----------

If you're in need of a small site or blog, I can't recommend Jekyll enough. Transitioning was relatively simple, it's very powerful, and can be hosted for free on GitHub!

Thanks for reading,  
Rowan


For further reading on this subject, see:

  * [Jekyll documentation][jekyll]
  * [This site on GitHub][repo]



[csswizardry-jekyll]: http://csswizardry.com/2012/12/a-new-css-wizardry/
[docpad]: http://docpad.org/
[icomoon]: http://icomoon.io/
[jekyll]: https://jekyllrb.com/
[repo]: https://github.com/rowanmanning/rowanmanning.github.io
