---
title: "Writing a Friendly README"
date: 2016-03-09 20:00
description: A README is one of the first things people see when they find your open source project. It should be helpful, welcoming, and friendly.
cta: Learn how to write a lovable README
subject: open-source
tags: [Open-Source, Writing]
sitemap: false
---


Your project's README is pretty important; it's often the first thing that a person new to your project will see, and is frequently the only source of documentation. Your README does the same job for your open source project as a website does for a company, and while websites get a lot of user-experience attention, our README files are rarely even considered from a user perspective.

This post will guide us through writing a friendly README – one that will be helpful and meet developers (our users) needs, whether they're new to the project or know it well, whether they're a veteran developer or a newcomer.

We'll be tackling this in sections, using a pretend library called "Paddington" as an example. Let's start from the top.


Project Heading
---------------

While the existence of ["the fold" is debatable][the-fold], it's fairly widely agreed that the top part of a website should be used to display the _most_ important information. We can apply the same principle to our README.

So what are the most important things? The project name is pretty important, as is what it actually _does_. So let's add those in (I promise the whole post isn't this obvious):

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/heading-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-heading-01-md"
    caption="Project heading with name and description"
%}

The above mostly cater for new users, but this top part of the README should help our existing users too; they have a few easy-to-answer questions. When I visit a project that I'm familiar with, I want to know:

  * What's the latest version?
  * Is the build passing?

As a new user, I have a few easy-to-answer questions as well:

  * What language is it written in?
  * What versions of that language does it support?
  * Is it tested?
  * What's the license?

We can answer all of these questions with **badges**! :tada:

I opt for a row of badges just beneath the project description. A single row doesn't occupy a lot of space and can convey an awful lot of information:

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/heading-02.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-heading-02-md"
    caption="Project heading with badges added"
%}

Aren't they beautiful? I use a [service called shields.io][shields] which provides consistent badge images as well as a way to add custom badges for license information etc.

Lastly as part of the heading section, if the project or library is simple enough to allow it, we can add a quick usage example. This really helps new users understand what your project does and can be just as helpful as the description.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/heading-03.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-heading-03-md"
    caption="Full project heading with an example"
%}

We've covered a lot in our top section in a relatively small amount of space. Well done, us! Now we need to move on to some of the more meaty questions that users have. Our README is going to get longer and potentially difficult to navigate, a sensible thing to do now would be to add a table of contents.


Table of Contents
-----------------

A table of contents is useful even in a relatively short README. It eases the pain of having to search for information, and gives the user some helpful jump-links to different parts of your documentation.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/table-of-contents-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-table-of-contents-01-md"
    caption="A nicely linked table of contents"
%}

If the user just wants to check the usage guide then why should they have to scroll through the installation instructions, which are potentially only useful the first time somebody uses your project?


Requirements
------------

Now we've reached a part of the documentation which is more useful to new users than anyone else, let's be really friendly and make sure they get what they need. This is the place to add all of the requirements your project has: language, language versions, package managers, operating systems. Anything that isn't covered as part of the project's actual installation.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/requirements-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-requirements-01-md"
    caption="Project requirements"
%}

This can be written in prose or as a list, as long as it's abundantly clear. This helps you too – it means fewer issues being opened asking why somebody can't get your project running.

You should also assume zero prior knowledge when documenting requirements. Make sure you add links to the language and package managers required, you may be aiding a user who's completely new to these.


Usage
-----

Your usage documentation is probably the most important part of your README, without it very few people are going to trawl through your code to get it working.

Depending on the kind of project you're writing a README for, this section could take many forms. You might need documentation for a programmatic API, a web interface, a web API, or a command-line tool; sometimes several of these. The guidelines below reference a JavaScript API, but you can apply them to other interfaces as well.

Firstly we need to mention how to get hold of the code, whether it's by cloning the repo or installing through a package manager. Don't forget to link out to anything useful, to prevent anyone from getting stuck.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/usage-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-usage-01-md"
    caption="How to install Paddington"
%}

When documenting an API, keep it clear and simple. This means documenting the majority use-case first, your happy path. This keeps everything nicely focused for first-time users. In our case, we outline the method arguments and return values, ideally with examples. The less ambiguous this is, the fewer questions you'll get.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/usage-02.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-usage-02-md"
    caption="How to use Paddington"
%}

Once we've covered our happy path, it's also useful to document any errors that a user might come across as well as edge-cases. This can form a sub-section towards the end of your usage documentation, and is geared towards people who have already installed and used your project. Try to include a few keywords that stuck or confused users might search for.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/usage-03.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-usage-03-md"
    caption="Edge-cases and errors"
%}


Contributing
------------

This part of your README is important, and can make a difference as to whether a user will become a contributor. Even if you have a [`CONTRIBUTING` file][contributing], assuming no prior knowledge of GitHub and open source, a user might not find it. This section should cover the basics and then link out to your `CONTRIBUTING` file if you have one.

You can help yourself here too, add short instructions on how to run the tests and the criteria for accepting pull requests. This means that your review and acceptance process will be as frictionless as possible.

This is also where you should add a link to your code of conduct, if you have one. You can make new contributors feel more comfortable, and assure them that any issues they have will be resolved. A good code of conduct to use is the [Contributor Covenant][contributor-covenant].

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/contributing-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-contributing-01-md"
    caption="Contribution guidelines"
%}


Support and Migration
---------------------

A section on the support status of your project is very helpful, especially once you've released a few different major versions. This section is mostly useful to existing users who may need some hand-holding through a migration between major versions of your project.

A full migration guide might be a bit long to add to your README, I use a `MIGRATION` file in the root of my project repositories and link to it from this section ([see pa11y for an example][migration]).

If you have a support plan for older versions, outline it here. Also you can use a simple table to document the major releases and their end-of-support dates.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/support-and-migration-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-support-and-migration-01-md"
    caption="Support and migration"
%}


License
-------

Lastly you should add a copyright notice and a link to the license that your project is released under. Without this information a lot of users, especially working in larger organisations, won't be able to use your project. Even if you distribute your project with a `LICENSE` file, it's helpful to include a link to it here.

{%
    include figure.html
    type="image"
    image="/media/images/posts/writing-a-friendly-readme/license-01.png"
    link="https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-license-01-md"
    caption="License and copyright information"
%}


Other Sections
--------------

What we've covered here is by no means all that your README could document. Other sections I've used in my projects include:

[Why?][why]
  : If your project does something already catered for by another project or is particularly complex, it's useful to provide some justification.

[Common Questions][common-questions]
  : A place for frequently asked questions, to reduce duplicate issues being opened.

[Examples][examples]
  : Links out to example code or pointers on getting example applications running.

[Thanks][thanks]
  : A section listing and thanking people who contributed to the project in a non-technical capacity.

Changelog
  : A description of and a link to your project's change log.


The Full README
---------------

Now we have a friendly README! You can [view the whole thing here][readme].

I'm hoping more people think about the user's needs when writing documentation, and please let me know if you think I've missed anything. I'm interested to hear your tips and opinions on what constitutes a helpful README.



[common-questions]: https://github.com/springernature/pa11y#common-questions
[contributing]: https://help.github.com/articles/setting-guidelines-for-repository-contributors/
[contributor-covenant]: http://contributor-covenant.org/
[examples]: https://github.com/rowanmanning/commandeer#examples
[migration]: https://github.com/springernature/pa11y/blob/master/MIGRATION.md
[readme]: https://gist.github.com/rowanmanning/77f31b2392dda1b58674#file-readme-md
[shields]: http://shields.io/
[thanks]: https://github.com/rowanmanning/joblint#thanks
[the-fold]: http://iampaddy.com/lifebelow600/
[why]: https://github.com/rowanmanning/proclaim#why
