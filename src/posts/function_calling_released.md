---
title: Twinny 3.20.0 - Adding Function Calling Support with Ollama
date: 2024-12-16
excerpt: Twinny 3.20.0 introduces function/tool calling capabilities through Ollama, enabling more powerful AI-assisted development workflows with direct integration of Ollama's tool calling features.
author: Richard
tags:
  - Twinny
  - Ollama
  - Function Calling
  - AI Development
  - Tools
  - Release Notes
---

# Twinny 3.20.0 - Adding Function Calling Support with Ollama

I'm excited to announce the release of Twinny 3.20.0, which brings native support for Ollama's function calling capabilities! This integration allows your AI assistant to interact with tools and execute functions directly through the Ollama API, opening up new possibilities for AI-assisted development.

## Available Tools

Twinny 3.20.0 launches with four essential tools for file and system operations:

- **openFile**: Open files in the editor with configurable view options
- **editFile**: Make changes to existing files with backup options
- **createFile**: Create new files in your workspace
- **runCommand**: Execute shell commands in the integrated terminal

## Getting Started

To use these tools:

1. Update Twinny to version 3.20.0 or later
2. Enable function calling in your Twinny settings under the model selection dropdown
3. Use a compatible model with Ollama (recommended: `qwen2.5-coder`)

## Model Recommendations

We recommend using `qwen2.5-coder` for the best experience with these tools. During our testing, we found that:
- Qwen makes intelligent decisions about when to use tools
- It understands context better than other models
- Provides more reliable tool interactions compared to Llama models

## What's Next?

Our future development is focused on making tools work together more intelligently through:

- **Agentic Workflows**: Enabling the AI to chain multiple tool operations together in a more sophisticated way
- **Tool Response Integration**: Feeding tool outputs back into the model to inform subsequent tool choices and actions
- **Enhanced Context Understanding**: Improving how the model understands and uses the results from previous tool operations
- **Smarter Decision Making**: Helping the model make better choices about when and how to combine different tools

This approach moves beyond simply adding more tools, instead focusing on making the existing toolset work together more effectively. The goal is to create a more dynamic and intelligent system where each tool operation can inform and enhance subsequent actions.

## Version History

For full details of this release, check out the [v3.20.0 release notes](https://github.com/twinnydotdev/twinny/releases/tag/v3.20.0) on GitHub.

## Learn More

To learn more about the underlying tool support system, visit Ollama's [detailed blog post](https://ollama.com/blog/tool-support).

## Feedback

Your feedback is crucial in helping us improve these tools. Please share your experiences, suggestions, and any issues you encounter through:

- [GitHub Issues](https://github.com/twinnydotdev/twinny/issues)

Stay tuned for more updates as we continue to enhance Twinny's capabilities!

---

*Note: Function calling requires a compatible Ollama installation and model. Make sure you're using the latest versions of both Twinny and Ollama to access this feature.*
