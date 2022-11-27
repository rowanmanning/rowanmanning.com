---
# Post title and metadata
# -----------------------
title: "Operational excellence: one year on"
date: 2022-11-04T11:22:00
description: "A year ago we outlined some changes to the way we support FT.com. As well as giving an excellent overview of what our OpsCop team did, we set out some broad changes that we intended to make."
crossPost:
  siteName: "FT Product & Technology"
  siteUrl: "https://medium.com/ft-product-technology"
  url: "https://medium.com/ft-product-technology/operational-excellence-one-year-on-f1dccaf2f034"
cta: "Read about how FT.com support has changed over the year"
tags: ["Operational Excellence"]

# Post display
# ------------
highlight: "blue"

# Images and resources
# --------------------
mainImage: "reliability-kit-error.jpg"
resources:
  - src: "reliability-kit-error.jpg"
    title: "A JSON-based error log containing app details (e.g. commit hash, name, Node.js version) and error information (e.g. message, code, stack trace, and related systems)"
    params:
      caption: "An example of the improved error logging we’ve rolled out with Reliability Kit"

# Links
# -----
reviewers:
  - name: Alex Muller
    website: https://alex.mullr.net/
  - name: Anna Shipman
    website: https://www.annashipman.co.uk/
  - name: Jeison Sosa
    website: https://jsosa.github.io/
  - name: Jennifer Shepherd
    website: https://twitter.com/teachlearncode
---

A year ago, [Nayana wrote a blog post](https://medium.com/ft-product-technology/next-chapter-on-our-journey-to-achieve-and-maintain-operational-excellence-of-ft-com-7dd9c7871347) outlining some changes to the way we support FT.com. As well as giving an excellent overview of what our “OpsCop” team did, it set out some changes that we intended to make. We wanted to stop being reactive and start _proactively_ finding ways to enable operational excellence on FT.com.

I’ve been working on the new team for about a year and I think the change in focus has been a huge success. We are now a team of three permanent senior engineers, a technical product manager, and a delivery manager. We recently renamed ourselves to the Reliability Team to better reflect the long-term vision of the team, our expertise, and our changing role in the organisation.


## How the team works

### We still triage issues

We’re still the team responsible for triaging issues that come into FT.com, however, this is now only a small part of what we do. Nayana said in her original post:

> “Our vision is to get to a place where the ft.com team in partnership with the stream-aligned product teams and the platform team spend 90% of their time improving the overall reliability aspects of ft.com and only spend 10% of their time on triaging issues that the group has never seen before.”

We’ve met Nayana’s original target, dropping from **~90%** to **~10%** of our time spent on triage. Lower-severity issues now get sent directly to the owner of the system without ever reaching our team, this gives us space to focus on more critical underlying issues.

There’s definitely [less toil](https://sre.google/sre-book/eliminating-toil/) than there used to be, and we’re focused more on actionable outcomes of an incident. A recent example is the FT.com site navigation going down and managing to take out several applications. We identified the root cause as well as some other improvements we could make to increase the resilience of this service. We spent a week [mobbing](https://en.wikipedia.org/wiki/Mob_programming) with the team who own this system, increased knowledge of how it fits into our other systems, and fixed some fairly critical issues. Previously we would not have had the capacity to make those underlying changes, especially in such a short period of time.

Another thing that we’re now doing with our issue triage is trying to spot patterns over time. For example, in early 2022 we were seeing quite a few issues related to our membership services. On the customer-facing website, these are presented as error pages, and our customer care team would often bring these issues directly to us. Rather than continue to react to these issues when they came up, we built some tools to help us quickly identify and route these issues to the team responsible for billing and subscribers.

### We proactively seek out potential issues

A key point made in Nayana’s original post was around being proactive rather than reactive.

> “We believe that this would help **reduce the reactive operational work** that teams have to do giving us more time as a group to focus on the **proactive, preventive and predictive maintenance** of ft.com systems and services.”

This is something that we’ve made a clear focus over the last year, as the reactive approach was not scalable: more FT subscribers lead to more issues and support requests, which then require more engineering effort.

We all had some assumptions about which parts of the FT.com stack were less-than-reliable because we’ve always had relatively good monitoring. What we didn’t know was the _why_; whether there were any common issues we see across all of our systems.

We did a lot of investigating: picking apart our error logs to look for patterns, digging into the code for different systems to find common issues, reviewing the root causes of incidents to see if there are any shortfalls in the way we design software. We did some deep dives into one or two of our more problematic systems and wrote down everything we found. This put us in a good position to make recommendations to our teams, and we’ve been rolling out some changes based on this research.

### We own code and systems

We gave ourselves a few months’ grace period for the team to bed in, but then we started taking ownership of all the libraries and systems related to the reliability and stability of FT.com. This gave us the ability to make improvements without relying on other teams and also took the pressure off some of the product teams who just don’t have as much time to focus on this area.

We’re still slowly ramping up but we’re now at 16 repos, all of which we understand well enough to reliably support.

As well as taking ownership of existing code, we’ve also been looking at how we can produce new software to improve FT.com’s reliability. After identifying some areas we could clearly improve, we released [Reliability Kit](https://github.com/Financial-Times/dotcom-reliability-kit#readme), a suite of Node.js libraries and guides that will help us standardise errors and logging. We’re slowly migrating our applications to this. It’s an area we previously under-invested in and we’re already seeing some big improvements to the observability and reliability of the systems which have adopted it.

{{< image "reliability-kit-error.jpg" >}}

## Are we solving the problems of one year ago?

Nayana highlighted several key issues in her original blog post.

### No metrics and Service Level Agreements for incoming issues

We’re on our way to solving this; we’re definitely focused on reducing recurring issues and we have a better process for fixing incoming issues. We haven’t _quite_ got there with SLAs (service level agreements) but some work has been done on adding SLOs (service level objectives) for systems.

### Some large operational issues without a clear owner to drive strategic changes

As discussed already, we’re now investigating the broader operational issues that impact FT.com and owning the work to address them. We’re able to focus on some large technical challenges that previously wouldn’t have been possible.

### No systematic process for creating a shared sense of ownership across ft.com

We don’t yet have a systematic process, but we’re going to investigate supporting engineers seconding into our team. We’re also very open and visible in the work we’re doing — we’re sharing regular internal blog posts, design docs, and the results of our investigations.


## What are the new problems?

A year is a long time in software development, and we’re always identifying new problems to solve. These will help us decide what the team should be doing going forward.

### We could support our customer care team far better than we do

Our customer care colleagues aren’t being set up for success when it comes to supporting our customers. They’re given little direction from FT.com engineering on how our systems fit together and we could be doing a far better job at sending them to the right team.

We’re looking at how we can give them the tools they need for this, firstly with some better error signposting on FT.com. This will reduce the time between a user calling customer care and getting a fix rolled out, and it’ll further reduce our time spent on triage.

### There’s not a lot of shared ownership of site performance

We’re investigating how we can improve performance across the whole of FT.com. We’re currently not doing _badly_, but we don’t have all the tools in place to ensure that we don’t take steps back in terms of web performance. This could easily become a future issue.

### We’re focused a lot on the website

Customer Products is the group that looks after both FT.com and our mobile apps. As you can probably tell from reading this post, there’s been more of a focus on the website from our team for now. Having a shared centralised team to focus on the reliability of the website _and_ the apps is something we’d like to explore.


## Here’s to another year

We’re excited to have made it to a full year, and we’re really proud of some of our achievements. I’m sure there will be a lot more to come over the next year.

Thanks for reading
