<script lang="ts">
  import Hero from '$lib/components/Hero.svelte'
  import Wire from '$lib/components/Wire.svelte'
  import Features from '$lib/components/Features.svelte'
  import HowItWorks from '$lib/components/HowItWorks.svelte'
  import Teams from '$lib/components/Teams.svelte'
  import Security from '$lib/components/Security.svelte'
  import Maker from '$lib/components/Maker.svelte'
  import Pricing from '$lib/components/Pricing.svelte'
  import Contact from '$lib/components/Contact.svelte'
  import Closing from '$lib/components/Closing.svelte'
  import { jsonLd, softwareApplication, faqPage, HOME_FAQ } from '$lib/seo'
</script>

<svelte:head>
  <title>twinny: self-hosted AI coding assistant for VS Code</title>
  <meta
    name="description"
    content="Local AI code completion, chat, inline edit and code review in VS Code, on models you run: Ollama, llama.cpp, LM Studio or any OpenAI-compatible server. One gateway for the whole team. Open source, no telemetry. Free for five developers."
  />
  <meta property="og:title" content="twinny: self-hosted AI coding assistant for VS Code" />
  <meta
    property="og:description"
    content="Code completion, chat, inline edit and review on models you run. Nothing leaves your network. Free for individuals and teams of five."
  />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(softwareApplication())}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- our own build-time content -->
  {@html jsonLd(faqPage(HOME_FAQ))}
</svelte:head>

<Hero />
<Wire />
<Features />
<HowItWorks />
<Teams />
<Security />
<Maker />
<Pricing />
<Contact />
<Closing />
