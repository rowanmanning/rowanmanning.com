---
# Weeknote title and metadata
# ---------------------------
title: "Week 172: Fizzy Lights"
date: 2024-02-11T23:00:00Z
description: "A week of burst pipes, fizzing light fittings, trips to Brighton, mini-golf, rollercoasters, good food, magic incantations, and being unimpressed with LLMs so far."
tags: ["House", "Family", "Social", "Work", "Games", "AI"]

# Weeknote display
# ----------------
highlight: "blue"

# Images and resources
# --------------------
mainImage: "damp-switches.jpg"
resources:
  - src: "damp-switches.jpg"
    title: "Some electrical switches surrounded by slightly damp wood and a post-it note that's clearly seen some water recently"
---

  * So. While we were away the flat above the flat above ours had a burst pipe and we've had our fourth instance of water leaking through our ceilings. Hooray! This time the hallway was the most impacted room which sounds OK right? Well yes except that's where our mains switches are, and they got a bit damp.

    * {{< pin right >}}{{< image "damp-switches.jpg" >}}{{< /pin >}}

      We turned off the electricity to let the board dry out, we now have power back in the plug sockets but we're leaving the light switches turned off because several of our lights make nasty fizzing sounds when you turn them on :thumbs_up: living our dark house lives.

    * The building insurance should cover everything (except the inconvenience) but that means coordinating with two other leaseholders, neither of whom live in their flats.

  * After a stressful week, we traveled down to Brighton to stay with Charlotte's brother who has working lights. Their house is lovely. We played mini-golf, ate a lot of good food, drank some good wine, and went on the rollercoasters on the pier. The weather held up nicely.

  * Setting up a Factorio server to relax 💆‍♂️

  * After some advice from a friend (me not trying LLM-generated stuff makes it easy for people to dismiss me as a Luddite - paraphrasing), I decided to suck up my strong moral objection and try GitHub Copilot for some personal projects. My intentions for this robot aren't good I'm afraid, but I guess I could try and turn this into something productive. These are my thoughts after ~3 hours of playing.

    * Unless I'm very bad at writing magic incantations, Copilot is not very good at writing tests. So far I've spent more time trying to get it working than if I'd just written them myself.

      * Coverage has been ~5–25%

      * Sometimes it tries to test functions that are never publicly exported

      * It gets very confused when files are named the same, e.g. multiple `index.js` files in different folders

      * It doesn't always use the testing libraries that you're already using, e.g. importing a new dependency instead of the one you already have that does the same job

      * If you didn't care about tests then I guess you could convince yourself that it's done an OK job

    * The documentation that Copilot writes is _reasonable_ but pretty generic, repetitive, and poorly structured. It requires a lot of work to make it flow well for a human reader in my opinion. I tried it in earnest but then decided to scrap it and start again because it would have taken me longer to fix it up.

      I still need to try using it to proofread/improve my existing documentation which is something people have highlighted as a good use, I'll do that next.

    * I didn't have a lot of code to write this week but I was curious so I described some of my open source libraries and got Copilot to regenerate an equivalent to see whether it would solve problems in a similar way to me.

      * I can get it to generate something that I'd consider good _if_ the problem is simple and I keep rewriting the prompt. E.g. this gives me something usable:

        > Write a function that accepts an error object and extracts a valid HTTP status code from it. The status code could be either on the status or statusCode property of the error. If no valid status code can be found then return 500. It must check that the status code is valid. Do a good job please with not much repetition
    
        I'm definitely not an expert at writing prompts but it feels like there's a lot of redundant information here that I'd kind of hope the machine would have inferred. E.g. I originally assumed that "a valid HTTP status code" would infer that I wanted a number between `100` and `599`, but I had to keep reiterating this. I wasted a fair amount of time checking that the code was giving me what I wanted.

      * This is where LLM prompts make me laugh so much – it feels like you're bargaining with an otherworldly entity that's willfully misinterpreting your wishes. "Genie, I'd like to be a billionaire but please don't just make me look like Elon Musk, give me some actual cash pretty please."

        I know this isn't an exact science but based on my simple example and several repeat tests, "Do a good job please" makes Copilot more likely to do extra type checking to avoid errors and shunts it towards some more modern JS patterns.

      * Again, I'm pretty fast at typing code and I already did all the thinking work ahead of time in the prompt. I'm not sure this would save me any time unless I blindly trusted more of what Copilot gave me.

  * So far I'm not super impressed but I will persevere. I have a healthy amount of scepticism but I'm trying to give the robot a fair chance.

  * I'm still worried generally. I'm approaching this as a senior engineer (5 years as a hobbyist plus 16 years being paid to do this) and I can _mostly_ spot where the LLM has generated garbage. I wouldn't be so sure if I was 5, 10, 15 years earlier in my career.
