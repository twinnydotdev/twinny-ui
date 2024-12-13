---
title: When Function Calling with Twinny?
date: 2024-12-13
excerpt: The future of function calling with Twinny
readingTime: 5
author: rj
tags: 
  - LLMs
  - AI Function Calling
  - Ollama
  - Twinny
  - AI
  - Tools
  - Chatbots
  - Assistants
  - Agents
  - Functions
  - Plugins
  - Models  
---

# When Function Calling with Twinny?

TLDR: It's coming...hopefully soon.

I've been exploring function calling with Ollama recently, and it's fascinating. Function calling allows AI models to do more than just chat—they can execute actions on your machine, like checking the weather, generating code, or running system commands. The model identifies available functions and decides when to use them.

For example we could have a function which creates a file.

```typescript
  async createFile(args: CreateFileArgs): Promise<string> {
    /// Create file
  }
```

And the function call defined as:

```typescript
  {
    type: "function",
    function: {
      name: "createFile",
      description: "Create a new file in the workspace",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Relative path from workspace root"
          },
          content: {
            type: "string",
            description: "Content to write to file"
          },
          openAfterCreate: {
            type: "boolean",
            description: "Whether to open the file after creation"
          }
        },
        required: ["path", "content"]
      } satisfies JSONSchema7
    }
  }
```

Then call the Ollama API with the tool definitions.

```json
  {
    "model": "supported-tools-model",
    "stream": false,
    "messages": [
      {
        "role": "user",
        "content": "Create a file hello-world.js and console.log(\"hello world\")."
      }
    ],
    "tools": [
      // tool definitions
    ]
  }
```

The model will respond with the tools to required to run to complete the task.

```json
[{"id":"call_5h1oac7y","name":"createFile","arguments":{"content":"console.log(\"hello world\")","openAfterCreate":true,"path":"hello-world.js"}}]
```


## Why It's Great

Few things that make this great:

- It's can all be done locally - your functions, your data, your machine
- Works with Ollama, which is free and open source
- No cloud services or API keys needed
- You control exactly what the AI can and can't do

That's it. Everything else builds on top of this.

## The Possibilities for Code Editors

The beauty of keeping it simple is where it could go:

- Custom tools for generating code and files
- Extended integration with projects like Model Context Protocol (MCP)
- Integration with other local AI APIs
- Agentic workflows
- Help with basic terminal commands and other tasks
- Deeper integration with system resources

## The Distributed Possibilities With Symmetry Network

Distributed computing could have a large impact.

- Run simple functions locally on smaller models
- Hand off complex function calls to nodes with more compute
- Switch between local and remote execution based on what you're doing
- Keep sensitive operations local while sharing safe compute tasks
- Distribution of autonomous agents working together to solve a common goal

The groundwork's there and the possibilities are plentyful. If you try hard enough then you shouldn't need a supercomputer to do useful things.

## When Function Calls with Twinny?

I aim to complete it soon (within a few weeks), but with other commitments, it may take a bit more time. Please subscribe on the homepage to stay updated.

If you want to try twinny out or learn more here are some links:

- [Twinny VSCode Extension](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny)
- [Symmetry Network](https://twinny.dev/symmetry)
- [GitHub](https://github.com/twinnydotdev/twinny)

rj


