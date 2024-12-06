---
title: What is symmetry anyway?
date: 2024-12-07
excerpt: What is symmetry anyway? - it's an open-source project I built to make AI infrastructure distributed. Using some p2p tech from Holepunch called Hyperswarm, it lets people share computing power over a janky network.
readingTime: 12
author: RJ
tags: 
  - AI Infrastructure
  - Distributed Computing
  - Hyperswarm
  - Holepunch
  - Open Source
  - Developer Tools
  - Personal Projects
---

# What is symmetry anyway?

Alright, let me tell you about this thing I've been working on called Symmetry. If you're anything like me - a shitty software engineer trying to make AI stuff work by copying and pasting from Claude you might find this interesting.

It's an open-source project I built to make AI infrastructure distributed. Using some p2p tech from [Holepunch](https://holepunch.to) called [Hyperswarm](https://github.com/holepunchto/hyperswarm) with some added jankyness on top of it.

## What's This All About?

So here's the story - I got tired of seeing AI infrastructure being this massive pain in the ass that either costs a fortune or requires you to sacrifice your firstborn to some tech overlord. I mean, have you seen the prices these days? It's mental, $200 a month for ShitGPT Pro, come on...

Symmetry is basically my attempt to something about it. Think of it like a peer-to-peer network where people can share their computing power for AI stuff. Kind of like torrenting, but for machine learning.

## Technical shit

Right, so under the hood, this thing uses [Hyperswarm](https://github.com/holepunchto/hyperswarm) - it's this p2p networking stack from the folks at [Holepunch](https://holepunch.to). Don't worry if you've never heard of it, just know that it lets computers talk to each other without needing some central server.

Here's what makes cool:
- Works through firewalls and all that networking nonsense
- Finds other computers without needing some central server
- Keeps your network data encrypted
- Handles multiple connections at once

## Running It

It's actually pretty simple to set up. Just paste this shit in your terminal...You need Node.js installed btw.

```bash
# If you're on Unix because you're cool:
curl -fsSL https://www.twinny.dev/symmetry-unix.sh | sh

# If you're stuck on Windows (my condolences):
iwr -useb https://www.twinny.dev/symmetry-windows.ps1 | iex
```

Then you'll need a config file. Create a `provider.yaml` in your `~/.config/symmetry/` directory:  The CLI will automatically create a provider config for you and try to detect your local provider e.g Ollama.

```yaml
apiHostname: localhost
apiKey: # if your provider needs an api key, not shared btw
apiChatPath: /v1/chat/completions
apiPort: 11434
apiProtocol: http
apiProvider: ollama
dataCollectionEnabled: false  # sup to you...
maxConnections: 10
modelName: llama3:8b
name: provider
dataPath: /home/user/.config/symmetry/default
public: true # false is pointless actually
serverKey: 4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435
systemMessage: "whatever you want really"
userSecret: "make-this-unique-you-muppet"
```

After all that shit, run it and see what happens!

```
symmetry-cli
```

You should see yourself on the [symmetry network](https://twinny.dev/symmetry) if everything went well.

## Using It In Visual Studio Code

If you're using Visual Studio Code, twinny makes it easy to become a provider or a consumer. Just install the extension, find the symmetry network tab at the top, pick your model, and click connect as a provider or consumer and cross your fingers that it works.

## Programatically

For the Node.js crew, here's how you use it:

```javascript
const { SymmetryProvider } = require('symmetry-core');

const config = {
  apiHostname: "localhost",
  apiPort: 11434,
  apiProtocol: "http",
  apiProvider: "ollama",
  modelName: "llama3:8b"
  // other settings and that
};

const provider = new SymmetryProvider(config);
await provider.init();
```

## What's Coming Next?

Look, I'm just one person working on this in between trying to keep my plants alive and remembering to eat, but here's what I'm planning:
- Better Node.js stuff (because the current implementation is a bit shitty)
- An API gateway that doesn't suck and isn't ripe for ddos
- Support for other AI workloads (not just chat)

## Keeping Track of Your Node

The system will tell you:
- Who's connecting (hopefully someone)
- What it's doing (hopefully something)
- If it's healthy (fingers crossed)
- What data it's collecting (if you enabled that)

## Want to Help?

This thing is Apache 2.0 so you can:
- Run a node (please do)
- Help with the code (also please do)
- Report bugs (there are probably loads)
- Tell me my code is terrible (I already know)

## Wrapping Up

Finally, symmetry isn't perfect, but it's trying to make AI infrastructure more distributed. It's not backed by some mega-corp or VC money - it's just some code I wrote that somehow works a bit.

If you want to know more:
- [GitHub Repo](https://github.com/twinnydotdev/symmetry-core)
- [Models List](https://twinny.dev/symmetry)
- [Hyperswarm Docs](https://github.com/holepunchto/hyperswarm)
- [Holepunch](https://holepunch.to)
- [Web Symmetry](https://twinny.dev/symmetry) Try symmetry in the web, I made that work at least.

If you find this useful, maybe chuck some money at the project so I can keep the lights on. If not, that's cool too - just don't be a dick and try to sell it as your own thing.

Oh and one last thing, if you are are going to try to use it please make sure that you're on the latest version of everything (twinny, symmetry-cli) because I'm not supporting old versions and it breaks everything.

All the best!!

rj
