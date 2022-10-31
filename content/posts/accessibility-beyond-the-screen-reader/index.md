---
# Post title and metadata
# -----------------------
title: "Accessibility: Beyond the Screen-Reader"
date: 2012-06-19T21:05:00
lastmod: 2012-06-20T10:30:00
description: "Web accessibility isn't just about catering for blind users. In this post, we talk about the other users we need to consider in order to make the web accessible to all."
cta: "Read about accessibility"
tags: ["Accessibility"]

# Post display
# ------------
highlight: "blue"

# Links
# -----
syndication:
  links:
    - url: "https://twitter.com/rowanmanning/status/215332122314027008"
      name: "Twitter"
---


I'd like to begin this post with a disclaimer: I'm not an accessibility expert. In fact, web accessibility scares me; it's that daunting consideration when kicking off a web project that can send shivers down the spines of the hardiest developers. Luckily, us web folk love a challenge!

The purpose of this post is to talk about the common misunderstanding that accessibility means catering for blind people almost exclusively. I've found myself frustrated by “accessibility tunnel-vision” on a number of occasions recently which has inspired me to explain *my* understanding of web accessibility. Who exactly are we trying to cater for? We'll start with the obvious:


Blind Or Partially Sighted Users
--------------------------------

This is the user that we tend to jump to when accessibility is mentioned. These users may rely completely on assistive technology, such as a screen-reader, to access the web. Partially sighted or vision-impaired users may not rely on a screen-reader, but will find it difficult to read content if the type is too small or cannot be zoomed.

There are a wealth of resources available to help make our websites work well for this group. In order to achieve a basic level of support, it helps to ensure that your website is usable in a [text-based browser such as Lynx][lynx] – writing sensible, semantic markup is a first step. I also can't emphasise what an eye-opener it is to [try and use a screen-reader yourself][use-screen-reader].

Vision impaired users can be catered for by keeping your type sizes sensible (personal preference: `>=16px`), and ensuring that your content is zoomable. You'll make this a lot easier by using a scalable font measurement in your CSS such as `em` or `rem`.


Colour-Blind Users
------------------

Colour-blind users may find it hard to distinguish between elements on a page if they are similar in colour. This can become a problem when the contrast between two elements is important; for example, between your website text and background. People with even mild colour-blindness may find it difficult to read content.

When it comes to catering for colour-blind users, subtlety becomes your enemy; there are some great [contrast checking tools online][contrast-checker] which can help you immensely.


Users With Physical Disabilities
--------------------------------

Physical disabilities can encompass anything from minor impairments of motor-skills to paralysis. Motor impairments are common in elderly web users who may rely on a keyboard alone to browse the web – using a mouse requires small, precise hand movements.

Ensuring that your website is keyboard-accessible is important, it's also quite easy to test: unplug your mouse! There are quite a few resources around the web on this topic, and [fixing up your website for keyboard users][keyboard-accessibility] is actually relatively easy.


Users With Cognitive Disabilities
---------------------------------

Cognitive disabilities get little air-time in my opinion, yet conditions such as dyslexia are extremely common. The diversity of this group is huge, and cognitive disabilities can have an adverse effect on memory; problem solving; attention; and reading, linguistic and verbal comprehension to name a few:

Memory
: Some users may have difficulties with their long, mid or short-term memories. This can be an issue when moving through a stepped sign-up or purchasing process for example. Clear sign-posting and guidance is essential for these users.

Problem solving
: For users who have trouble problem-solving, things like form errors or unclear instructions are a nightmare. Instructions should be clear and large changes to the page should be explained to the user.

Attention
: Users with conditions such as {{< abbr "Attention Deficit Hyperactivity Disorder" >}}ADHD{{< /abbr >}} often struggle to maintain concentration when completing a task. Avoiding background noise on a page and using visual cues to highlight important content helps these users.

Reading, linguistic and verbal comprehension
: This broad category ranges from problems understanding long or complex words and sentence structure, to difficulty processing non-literal text such as sarcasm, metaphor or slang. Clear document structure, supplemental media and uncomplicated writing can help these users a lot.

For more information, I can't recommend this [article on cognitive disabilities][webaim-cognitive] enough. It goes into far more depth than I could on the subject!


To Conclude
-----------

So I hope I haven't made accessibility an even scarier word for you! Granted there's a lot to consider, and accessibility can seem like a bit of a minefield, but building accessible websites can be an extremely rewarding endeavour.

By thinking about these users while you build, not only will you help people with disabilities, but many of the relatively small improvements listed in this post will make your site more usable for *everyone*.

Thanks for reading,  
Rowan


For further reading on this subject, see:

  * [Accessibility articles from WebAIM][webaim-articles]
  * [The BBC's web accessibility guides][bbc-guides]
  * [Designing with Progressive Enhancement][dwpe], a book by Filament Group



[bbc-guides]: http://www.bbc.co.uk/accessibility/guides/
[contrast-checker]: http://snook.ca/technical/colour_contrast/colour.html "Colour Contrast Checking Tool"
[dwpe]: http://filamentgroup.com/dwpe/
[keyboard-accessibility]: http://www.456bereastreet.com/archive/201104/keyboard_accessibility_again/ "Some useful quick-tips on keyboard accessibility"
[lynx]: http://lynx.browser.org/ "The Lynx Browser"
[use-screen-reader]: http://webaim.org/articles/screenreader_testing/ "Testing with Screen Readers: Questions and Answers"
[webaim-articles]: http://webaim.org/articles/
[webaim-cognitive]: http://webaim.org/articles/cognitive/ "In-depth article on cognitive disabilities and the web"
