---
title: The Code Regurgitation Problem
date: 2024-12-18
excerpt: A look at whether AI tools are helping or hindering developer productivity and a look forward to the future.
author: rj
tags:
  - Development
  - Productivity
  - Tools
  - Software Engineering
---

Let's face it: the promise of AI coding automation is everywhere - Automate your code! Automate bug fixing! Automate your job? Automate your life? But here's a controversial question: Are developers actually getting more done?

## The Promise

Watch any video online and you'll see AI tools producing flawless code, bug fixes, and seamless integrations. And yes, while some may "one-shot" solutions, they also spend hours regurgitating the same code over and over. Let's face it: if you've sat and done this yourself, you might remember feeling that for every time that happens, a new disconnect between you and the code is produced - at least until you read, test, run and understand it yourself afterwards.

## The Code Regurgitation Problem

"Just describe what you want, and I will do it!" But please wait while I mindlessly regurgitate the code until you tell me that it works.

```
The Code Regurgitation Loop
---------------------------

    Start       Generated Code    Less Understanding & Potential Issues
      │                │                │
      │                │                ▼
      ▼                ▼            ┌─────┐
   ┌─────┐         ┌─────┐          │ ?!# │
   │     │  Task   │     │ New Code │     │
   │  ?  │ ───────►│ LLM │─────────►│     │
   │     │         │     │          │     │
   └─────┘         └─────┘          └─────┘
      │                                 │
      │                                 │
      └─────────────────────────────────┘
             <- Repeat the process

```

## The Problem 

The main problems with code regurgitation are productivity and understanding, amongst others.

For productivity, however, the killers aren't the tools - it's the approach to them. Treating tools like team members leads to diminishing returns. If you've ever used these tools before, you might remember spending hours upon hours trying to get working generated code only to delete it all afterwards!

For understanding, it's just the nature of generating code.

## The Solution

With the right approach, it's possible to use these to become more productive.

The most productive developers are the ones who use AI when it's helpful and not the ones who resort to code drudgery just to get things done!

- Using it for boilerplate and repetitive tasks
- Letting it suggest approaches without blindly trusting solutions
- Having good unit tests where AI is being used
- Using them to write tests

i.e., they start doing it themselves, then use AI for tasks along the way. This way they gain a better understanding and don't just allow the coding overlord to take control every step of the way.

## Looking Forward

As tools continue to evolve, the challenge isn't about getting more features or capabilities - it's about finding the right integration points in the development workflow. These tools can either be a huge productivity boost or a new form of procrastination. Don't fall into the trap.

It's a well-known fact that AI agents aren't ready to be let loose on critical systems without human intervention, but maybe it's human code which is the problem in the first place? Anything is possible, and we might be headed towards a future where generated "code" is something that works perfectly but is uninterpretable by humans.
