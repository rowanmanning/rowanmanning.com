---
title: "JavaScript For Beginners: Async"
date: 2013-06-27 20:15
description: An introduction to asynchronous JavaScript, part of a series on JavaScript for Beginners.
cta: Learn about async
subject: js
tags: [Beginners, JS]
layout: post
---

This is the first in a series of posts which will explain some of the concepts and terminology which are thrown about in JavaScript land, with a focus on beginners. In this post we'll be looking at the term "Async"; what it means and why it matters to you as a JavaScript developer.

Recently, I was reminded of my early days in development. Being a self-taught JavaScript noob, it was easy to get left behind in technical conversations among more computer-sciency peers. One of the barriers was the terminology being used, terms like "Async".


So, What Does "Async" Mean? {.space-above-more}
---------------------------

Async is short for "asynchronous". It's easier to understand async if you first understand what "synchronous", the opposite, means.

In programming, we can simplify the definition of synchronous code as "a bunch of statements in sequence"; so each statement in your code is executed one after the other. This means each statement has to wait for the previous one to finish executing.

{% highlight javascript %}
console.log('First');
console.log('Second');
console.log('Third');
{% endhighlight %}

The statements above will execute in order, outputting "First", "Second", "Third" to the console. That's because it's written synchronously.

Asynchronous code takes statements outside of the main program flow, allowing the code after the asynchronous call to be executed immediately without waiting. You've probably used asynchronous programming before with `jQuery.ajax` or similar:

{% highlight javascript %}
console.log('First');
jQuery.get('page.html', function (data) {
    console.log("Second");
});
console.log('Third');
{% endhighlight %}

In the example above, the output will be different: "First", "Third", "Second". This is because the function passed into `jQuery.get` is not called immediately – it has to wait for jQuery to fetch the page you asked for before it can execute.

*"So why the hell use asynchronous code instead of synchronous code?"* I hear you ask! I'll explain.


Why Asynchronous? {.space-above-more}
-----------------

When JavaScript is executed, synchronous code has the potential to block further execution until it has finished what it's doing. In English, long-running JavaScript functions can make the UI or server unresponsive until the function has returned. Obviously this can result in a terrible user-experience.

For example: if you want to load your latest tweets onto a web page, and you do this synchronously, then a visitor to your site won't be able to do anything until those tweets are loaded. This could cause a long delay before they even get to see the content of your site! I've illustrated the problem below:

{% highlight javascript %}
tweets = loadTweetsSync();
// ... Wait
// ... Do something with the tweets
doSomeOtherImportantThings();
{% endhighlight %}

{% highlight javascript %}
loadTweetsAsync(function () {
    // ... Wait
    // ... Do something with the tweets
});
doSomeOtherImportantThings();
{% endhighlight %}

In the second example, `doSomeOtherImportantThings` doesn't have to wait for the tweets to load.


How To Program Asynchronously {.space-above-more}
-----------------------------

Although the purpose of this post is to explain the term, it would feel incomplete without a short overview of *how* to program asynchronously. I'm sure you'd like to know how to apply this knowledge.

More often than not, this is done for you by browser/server APIs (XMLHttpRequest, Node `fs` module) or third-party libraries (jQuery.ajax). Most of the time, this is as far as you need to go – you wouldn't asynchronize *everything*, as this can actually lead to less performant (and very complex) code.

As a general rule of thumb, you use asynchronous code when performing expensive and time-consuming operations. You wouldn't use it to change a CSS class on an element, for example.

For when you need them, there are plenty of libraries which aid you in writing asynchronous code; [Async.js][async] is an excellent example.


In Summary {.space-above-more}
----------

So to recap, synchronous code is executed in sequence – each statement waits for the previous statement to finish before executing. Asynchronous code doesn't have to wait – your program can continue to run. You do this to keep your site or app responsive, reducing waiting time for the user.

Thanks for reading. Let me know if there's a topic you'd like to be covered in this series!

Rowan



[async]: https://github.com/caolan/async