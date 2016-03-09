---
title: Complex Routing Logic with Thundermole
date: 2015-07-13 10:45
description: An insight into how we run our Nature journals beta program using Thundermole.
crossPost:
  siteName: Cruft
  siteUrl: http://cruft.io/
  url: http://cruft.io/posts/complex-routing-logic-with-thundermole/
cta: Learn about Nature's beta program
subject: node-js
tags: [Node.js, JavaScript]
---


Over the last year, we have begun the process of migrating many [Nature journals][journals] to our new platform. Because journals on the new platform also come with a significant redesign, we were required to run an opt-in beta program to trial the new design and gather feedback.

The beta program had many requirements:

  * Opted out users should see the old version of the site on the legacy platform
  * Opted in users should see the new version of the site on the new platform
  * Old-style URLs should redirect to new-style URLs for opted-in users
  * New-style URLs should redirect to old-style URLs for opted-out users
  * We should be able to run a private beta for internal users
  * We should be able to automatically opt-in a percentage of users as the beta matures

It quickly became apparent that we'd need a layer in front of both platforms; with requests being routed based on whether the user is allowed to see the beta, and whether they've opted in.


Enter Thundermole
-----------------

The routing application we ended up building was code-named *Thundermole*. We wrote it in JavaScript as we have a lot of experience proxying requests with [Node.js][node]. We also wanted something light-weight that wouldn't add much overhead to page loads.

However most of our existing user-authentication logic and application routing existed as part of our new Ruby-based platform. We didn't want to rewrite this logic in JavaScript so Thundermole quickly simplified further into a proxy application that routes requests based on an API response.

This allowed us to inject a very small proxy layer (Thundermole) in front of both platforms, and reuse all of the existing application logic in a Ruby-based API. The application flow looks like this:

  1. A user request comes into Thundermole
  2. Thundermole calls our beta program API with the user request's headers and path
  3. The API responds with a proxy target depending on the user's opt-in status
  4. Thundermole routes the original user request to the specified target

Thundermole's role in our stack became very clear and simple: Proxy user requests to different applications based on an API response.


Open-Sourcing
-------------

We're big fans of open-source, and as soon as Thundermole no longer needed to hold any business logic we decided that it belongs in the public domain. You can browse the source code and use Thundermole in your own stack here:

<https://github.com/springernature/thundermole>

For when you want to write your own API, we've outlined a [Thundermole API Specification][api-spec].

As with all of our open-source projects, we love contributions and feedback. It'd also be pretty cool to say you wrote code that sits in front of Nature journals :wink:



[api-spec]: https://github.com/springernature/thundermole/blob/master/docs/API-Specification.md
[journals]: http://www.nature.com/siteindex/index.html
[node]: https://nodejs.org/
