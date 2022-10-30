---
# Post title and metadata
# -----------------------
title: "Halving my GitHub Pages Build Time"
date: 2022-08-21T10:35:00+01:00
description: "An explanation of how I halved my website's build/deploy process using a mix of actions optimisations and the new GitHub Pages Custom Actions beta."
cta: "Read about the optimisations"
tags: ["Hugo", "GitHub", "Side Projects"]

# Post display
# ------------
highlight: "lime"

# Images and resources
# --------------------
mainImage: false
resources:
  - src: "workflow-in-parallel.png"
    title: "A screenshot of the parallel jobs on GitHub: install flows into build, verify, and test jobs"
    params:
      link: "https://github.com/rowanmanning/rowanmanning.com/actions/runs/2897812350"

# Links
# -----
syndication:
  links:
    - url: https://mastodon.social/@rowanmanning/109256948757155313
      name: Mastodon
    - url: https://twitter.com/rowanmanning/status/1561685932251684864
      name: Twitter
---

Recently I spent some time overhauling the build process for this website because it was _really_ slow. After [nearly 100 weeknotes](/weeknotes/) (including a lot of images to resize) my build/deploy process was taking 6–7 minutes. Locally my entire site builds in 500–800ms so I decided to investigate where my performance issues were.

The TL;DR here is that my builds have dropped to ~3 minutes, more than half my original times. I've also removed some uncertainty about exactly _when_ my site will get deployed. Here are the steps I went through:

  1. I realised that I wasn't caching [Hugo](https://gohugo.io/)'s build or `resources/_gen` folders in CI, which meant that the entire site had to be built every time. No wonder this was slow! Caching these folders based on a hash of the `config`, `content`, `data`, and `themes` folder reduced build times by a lot and I'm now taking full advantage of how fast Hugo is. Here's the step I defined:

     ```yaml
      - name: Cache built website
        uses: actions/cache@v3
        env:
          cache-name: cache-website-v1
        with:
          path: |
            build
            resources/_gen
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('config', 'content', 'data', 'themes') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
     ```

  2. I wasn't taking advantage of GitHub Actions' ability to run jobs in parallel at all, I was waiting for the linting to pass before running tests, and then waiting for the tests to pass before building the site.

      The linter, tests, and build have absolutely no shared tasks except that they all have the need to use Node.js and npm. I moved this to a new `install` job and made the linting, testing, and build happen in parallel. The final `deploy` job relies on all three of these passing. This gave me _so much_ more speed.

      {{< image "workflow-in-parallel.png" >}}

  3. One large bottleneck was the way I was deploying. Until very recently the only way to build GitHub pages with Hugo was to push to a separate branch or folder then a _separate_ GitHub action would do the deploy under the hood. So, no matter how fast my own workflow was, I was still having to wait for a second one to trigger.
  
      Very recently [GitHub launched a beta for deploying to GitHub Pages from your _own_ GitHub Action](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/). This is game-changing for me because I have full control over the zipped artefact that gets deployed. No more waiting for GitHub to decide when to deploy my pages, I can trigger it myself immediately after the build :tada:

      The GitHub Actions starter workflows repo contains [examples](https://github.com/actions/starter-workflows/tree/main/pages) of how to do this with many other static site generators.

      The new steps used are:
        
        * [`actions/configure-pages`](https://github.com/actions/configure-pages)
        * [`actions/upload-pages-artifact`](https://github.com/actions/upload-pages-artifact)
        * [`actions/deploy-pages`](https://github.com/actions/deploy-pages)

These three steps had a huge impact, reducing my build and deploy times by more than half. Some of the issues were me writing suboptimal actions originally, but it's also been massively helped by the new GitHub features.

[You can view an example run on my website repo here](https://github.com/rowanmanning/rowanmanning.com/actions/runs/2897812350) and you can see [my full GitHub Actions workflow here](https://github.com/rowanmanning/rowanmanning.com/blob/main/.github/workflows/build-deploy.yml).
