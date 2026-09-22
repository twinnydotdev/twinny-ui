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
</script>

<svelte:head>
  <title>twinny — the AI coding assistant that stays inside your network</title>
  <meta
    name="description"
    content="Autocomplete, chat, inline edit and code review in VS Code, on models you run or pool from your team's computers. Open source, self-hosted, no telemetry. Free for five developers; team seats from $6 a month."
  />
  <meta property="og:title" content="twinny — the private AI coding assistant for VS Code" />
  <meta
    property="og:description"
    content="Runs on your hardware. Nothing leaves the building. Free for individuals and teams up to five."
  />
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "SoftwareApplication",
      "name": "twinny",
      "url": "https://twinny.dev/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Visual Studio Code",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": {
        "@type": "Organization",
        "name": "rjmacarthy.xyz",
        "url": "https://rjmacarthy.xyz"
      },
      "description": "Private AI coding assistant for Visual Studio Code: autocomplete, chat, inline edit and code review on models you run yourself."
    }
  </script>
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
