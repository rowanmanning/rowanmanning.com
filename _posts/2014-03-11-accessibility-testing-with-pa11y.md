---
title: Accessibility Testing with pa11y
date: 2014-03-11 09:10
description: An overview of using the pa11y accessibility testing tool to find issues with your web pages.
crossPost:
  siteName: Cruft
  siteUrl: http://cruft.io/
  url: http://cruft.io/posts/accessibility-testing-with-pa11y/
cta: Learn how to use pa11y
subject: a11y
tags: [Accessibility]
layout: post
---


[pa11y][pa11y] is a command-line tool used to find accessibility issues in web pages. Nature built and released pa11y to address a short-fall in automatable accessibility testing; it uses [HTML CodeSniffer][htmlcs] in [PhantomJS][phantom] to raise common issues and reports them in both human and machine readable formats. This post assumes that you've installed pa11y ([requirements and instructions][pa11y-requirements]).

pa11y is most useful when it's used almost like a linter – the numbers of errors, warnings, and notices are probably some of the most useful statistics, especially when plotted on a graph over time.

Due to the fact that pa11y is a command-line tool, we can report the errors found but we can't, for example, highlight elements in the DOM to illustrate these errors. However it does report a snippet of HTML for context as well as a CSS selector which you can use in-browser to find the relevant element.

It's also important to note that *pa11y is not a replacement for regular accessibility testing*. It's not a magic bullet, and won't catch everything that you could – it's complementary to your existing workflow (which should include testing with actual users).


Basic Command-Line Usage
------------------------

The simplest way to quickly test a web page, is to execute the `pa11y` command with a URL. The following example will run tests on the Nature home page:

{% highlight sh %}
pa11y nature.com
{% endhighlight %}

<figure class="media">
    <img class="media__image" src="/media/images/posts/accessibility-testing-with-pa11y/cli-report.png" alt="pa11y command-line output"/>
    <figcaption class="media__caption">pa11y command-line output</figcaption>
</figure>

You'll see some output in the command line which describes some of the errors/warnings encountered. This is fine for quickly testing a page, but things start to get interesting when you play with pa11y's options.

Use the WCAG2AAA standard:

{% highlight sh %}
pa11y --standard WCAG2AAA nature.com
{% endhighlight %}

Filter out certain rules or types:

{% highlight sh %}
pa11y --ignore "notice;warning" nature.com
{% endhighlight %}

Combining these options means you can get what you need out of pa11y with very little effort.


Reporting With JSON
-------------------

Reporting results as JSON can be extremely useful when you want to do things with the data, especially if you're using pa11y as part of Continuous Integration. We'll outline some uses below:

{% highlight sh %}
pa11y --reporter json nature.com
{% endhighlight %}

Output to a file:

{% highlight sh %}
pa11y --reporter json nature.com > results.json
{% endhighlight %}


Reporting With CSV
------------------

You can also output CSV reports with pa11y, which can be useful if you need to do some manual processing or for ease of importing into a database. This is also very simple:

{% highlight sh %}
pa11y --reporter csv nature.com
{% endhighlight %}

Output to a file:

{% highlight sh %}
pa11y --reporter csv nature.com > results.csv
{% endhighlight %}


Reporting With HTML
-------------------

If you prefer to generate a visual accessibility report that can be shared with non-programmers, you can use the HTML reporter:

{% highlight sh %}
pa11y --reporter html nature.com > results.html
{% endhighlight %}

<figure class="media">
    <img class="media__image" src="/media/images/posts/accessibility-testing-with-pa11y/html-report.png" alt="pa11y HTML output"/>
    <figcaption class="media__caption">pa11y HTML output</figcaption>
</figure>

Anything Missing?
-----------------

We want pa11y to be useful for as many people as possible. If you think we're missing a killer feature that is stopping you from using pa11y, then we're more than happy to listen!

[Raise an issue][issues] on GitHub or, even better, raise an issue with a pull-request.

Also, if you're doing anything interesting with pa11y, we'd love to hear about it.



[htmlcs]: http://squizlabs.github.io/HTML_CodeSniffer/
[issues]: https://github.com/springernature/pa11y/issues
[jq]: http://stedolan.github.io/jq/
[node]: http://nodejs.org/
[pa11y]: https://github.com/springernature/pa11y
[pa11y-custom-reporters]: https://github.com/springernature/pa11y#reporters
[pa11y-requirements]: https://github.com/springernature/pa11y#requirements
[pa11y-readme]: https://github.com/springernature/pa11y#readme
[phantom]: http://phantomjs.org/
