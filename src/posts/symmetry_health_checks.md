---
title: Important Updates for Symmetry Providers
date: 2025-01-30
excerpt: New health checks and configuration changes for Symmetry providers to ensure optimal performance.
readingTime: 5
author: rjmacarthy
tags:
  - Symmetry
  - Configuration
  - Health Checks
---

# Important Updates for Symmetry Providers

We've made some crucial updates to the Symmetry network that all providers should be aware of. These changes aim to improve the overall health and consistency of the network.

## New Health Check System

Providers are now marked as either healthy or unhealthy based on their ability to reach their inference provider. This new system ensures that only operational providers are actively participating in the network, improving reliability for users.

## Configuration Changes

We've made some adjustments to the official configuration:

1. `apiPath` has been renamed to `apiBasePath`
2. `apiChatPath` has been removed

### Action Required

All providers must update their configuration to match these changes. You have two options:

1. Manually update your existing configuration
2. Delete and regenerate your configuration using the new version

**Important**: If you choose to regenerate your configuration, be careful as it will overwrite your `userSecret`. To maintain your current identity on the network, make sure to preserve your existing `userSecret`.

## Steps to Update

1. Check your current configuration against the official version of twinny or symmetry-core
2. If regenerating, note down your current `userSecret`
3. Make necessary changes or regenerate the configuration
4. If you regenerated, replace the new `userSecret` with your previous one
5. Restart your Symmetry provider to apply the changes

By following these steps, you'll ensure your provider remains healthy and compatible with the latest network standards.

For any questions or assistance, please reach out to our support team.

Stay symmetric!
