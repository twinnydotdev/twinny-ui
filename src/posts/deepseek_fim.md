---
title: Setting up Deepseek FIM in Twinny
date: 2025-01-24
excerpt: Quick guide for integrating Deepseek's Fill-in-Middle completion in Twinny for smarter code suggestions.
readingTime: 3
author: rjmacarthy
tags:
  - Twinny
  - FIM
  - Code Completion
---

# Setting up Deepseek FIM in Twinny

[See Deepseek's FIM docs](https://api-docs.deepseek.com/guides/fim_completion)

Access Providers in Twinny and configure:

```
Label: Deepseek FIM
Type: fim
FIM Template: deepseek
Provider: deepseek
Protocol: https
Model Name: deepseek-chat
Hostname: api.deepseek.com
API Path: /beta/completions
```

Add your API key and save.

## What it Does

FIM (Fill-in-Middle) completes code between a prefix and suffix. Perfect for:
- Function bodies 
- Method implementations
- Missing code segments

## Limits
- 4K tokens max per completion
- Requires valid API key

That's it - you now have smart code completion in Twinny.
