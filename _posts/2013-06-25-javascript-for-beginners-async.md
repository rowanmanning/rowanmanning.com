---
title: "JavaScript For Beginners: Async"
date: 2013-06-25 19:28
description: An introduction to asynchronous JavaScript, part of a series on JavaScript for Beginners.
tags: [Beginners, JS, Node]
layout: post
noindex: true
---


Recently, I was reminded of my early days in JavaScript. Like many others, I got into JavaScript through the gateway <del>drug</del> <ins>library</ins> that is jQuery.

In particular I remember that, being a self-taught JavaScript noob, I was often left behind in technical conversations among my more experienced computer-sciency peers. One of the biggest barriers was some of the terminology thrown about – yes, even terms like "async".

This post (or series of posts) is my attempt to clarify some of these terms/concepts to the next generation of JavaScript newbies.


So, What Does "Async" Mean? {.topper}
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


Why Asynchronous? {.topper}
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


In Summary {.topper}
----------

So to recap, synchronous code is executed in sequence – each statement waits for the previous statement to finish before executing. Asynchronous code doesn't have to wait – your program can continue to run. You do this to keep your site or app responsive, reducing waiting time for the user.

I hope this has been useful; I was surprised at how difficult it was to put into words! This has been a fun excercise, though.

If there's a phrase you often come across but don't fully understand then tweet me – I'll have a go at explaining it :)
