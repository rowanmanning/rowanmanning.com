---
title: 'Accessibility: Beyond The Screen-Reader'
date: '2012-06-06 23:05'
description: 'Web accessibility isn’t just about catering for blind users. In this post, we talk about the other users we need to consider in order to make the web accessible to all.'
layout: 'post'
---


# Accessibility: Beyond The Screen-Reader #

I'd like to begin this post with a disclaimer: I'm not an accessibility expert. In fact, web accessibility scares me; it's that daunting consideration when kicking off a web project that can send shivers down the spines of the hardiest developers. Luckily, us web folk love a challenge!

The purpose of this post is to talk about the common misunderstanding that accessibility means catering for blind people almost exclusively. Talking to colleagues and other web professionals got me inspired to explain *my* understanding of web accessibility; who exactly are we trying to cater for? We'll start with the obvious:


## Blind Or Part-Sighted Users ##

This is the user that we tend to jump to when accessibility is mentioned. These users may rely completely on assistive technology, such as a screen-reader, to access the web. Part-sighted or vision-impaired users may not rely on a screen-reader, but will find it difficult to read content if the type is too small or cannot be zoomed.

There are a wealth of resources available to help make our websites work well for this group. In order to achieve a basic level of support, it helps to ensure that your website is usable in a [text-based browser such as Lynx][lynx] – writing sensible, semantic markup is a first step. I also can't emphasise what an eye-opener it is to [try and use a screen-reader yourself][use-screen-reader].

Vision impaired users can be catered for by keeping your type sizes sensible (personal preference: `>=16px`), and ensuring that your content is zoomable. You'll make this a lot easier by using a scalable font measurement in your CSS such as `em` or `rem`.


## Colour-Blind Users ##

Colour-blind users may find it hard to distinguish between elements on a page if they are similar in colour. This can become a problem when the contrast between two elements is important; for example, between your website's text and background. People with even mild colour-blindness may find it difficult to read content.

When it comes to catering for colour-blind users, subtlety becomes your enemy; there are some great [contrast checking tools online][contrast-checker] which can help you immensely.


## Users With Physical Disabilities ##

Physical disabilities can encompass anything from minor impairments of motor-skills to paralysis. Motor impairments are common in elderly web users who may rely on a keyboard alone to browse the web – it can be difficuly to operate a mouse which requires small, precise hand movements.

Ensuring that your website is keyboard-accessible is important; it's also quite easy to test! [more here, maybe look at some techniques] 


## Users With Cognitive Disabilities ##

Cognitive disabilities get little air-time in my opinion, yet conditions such as dyslexia are extremely common. The diversity of this group is huge, and cognitive disabilities can have an adverse affect on memory; problem solving; attention; reading, linguistic and verbal comprehension; math comprehension; and visual comprehension. [make some notes based on the web AIM article we found]


[conclusion]


[contrast-checker]: http://snook.ca/technical/colour_contrast/colour.html "Colour Contrast Checking Tool"
[lynx]: http://lynx.browser.org/ "The Lynx Browser"
[use-screen-reader]: http://webaim.org/articles/screenreader_testing/ "Testing with Screen Readers: Questions and Answers"
[webaim-articles]: http://webaim.org/articles/ "Accessibility articles from WebAIM"