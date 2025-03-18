<script lang="ts">
  import logo from '$lib/assets/twinny-logo.svg'
  import { URL_VSCODE_MARKETPLACE, URL_SYMMETRY_DOCS, URL_GITHUB } from '$lib/const'
  import { t } from '$lib/translations'
  import Button from '$lib/components/button.svelte'
  import Register from '$lib/components/register.svelte'
  import type { ActionData } from '../routes/$types'
  import { onMount } from 'svelte'
  export let form: ActionData

  // Animation for network nodes
  let ctx: CanvasRenderingContext2D

  function initNetworkCanvas(node: HTMLCanvasElement) {
    const canvas = node;
    ctx = canvas.getContext('2d')!

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: {x: number, y: number, radius: number, vx: number, vy: number, color: string}[] = []

    // Create nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 2 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `rgba(244, 63, 94, ${0.2 + Math.random() * 0.3})`
      })
    }

    function drawNodes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(244, 63, 94, ${0.1 * (1 - distance / 80)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      }

      requestAnimationFrame(drawNodes)
    }

    drawNodes()
  }

  // Animation for symmetry logo
  let symmetryCtx: CanvasRenderingContext2D

  function initSymmetryCanvas(node: HTMLCanvasElement) {
    const canvas = node;
    symmetryCtx = canvas.getContext('2d')!

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let rotation = 0

    function drawSymmetryLogo() {
      symmetryCtx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.7

      // Save context
      symmetryCtx.save()
      symmetryCtx.translate(centerX, centerY)
      symmetryCtx.rotate(rotation)

      // Draw outer circle
      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, radius, 0, Math.PI * 2)
      symmetryCtx.strokeStyle = 'rgba(244, 63, 94, 0.3)'
      symmetryCtx.lineWidth = 2
      symmetryCtx.stroke()

      // Draw inner connections
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * radius * 0.7
        const y = Math.sin(angle) * radius * 0.7

        symmetryCtx.beginPath()
        symmetryCtx.moveTo(0, 0)
        symmetryCtx.lineTo(x, y)
        symmetryCtx.strokeStyle = 'rgba(244, 63, 94, 0.5)'
        symmetryCtx.lineWidth = 1.5
        symmetryCtx.stroke()

        // Draw node
        symmetryCtx.beginPath()
        symmetryCtx.arc(x, y, 4, 0, Math.PI * 2)
        symmetryCtx.fillStyle = 'rgba(244, 63, 94, 0.8)'
        symmetryCtx.fill()
      }

      // Draw center node
      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, 6, 0, Math.PI * 2)
      symmetryCtx.fillStyle = 'rgba(244, 63, 94, 1)'
      symmetryCtx.fill()

      // Restore context
      symmetryCtx.restore()

      rotation += 0.005
      requestAnimationFrame(drawSymmetryLogo)
    }

    drawSymmetryLogo()
  }
</script>

<!-- Hero Section -->
<section class="w-full max-w-7xl pt-16 pb-20">
  <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
    <!-- Left content -->
    <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
      <img alt="twinny logo" class="h-20 w-auto lg:hidden mb-8" src={logo} />
      <div class="flex items-center justify-center gap-4 mb-4">
        <img alt="twinny logo" class="h-20 w-auto hidden lg:block" src={logo} />
      </div>

      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl mb-4">
        {$t('common.hero_title')}
      </h1>

      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-rose-500 leading-tight max-w-2xl mb-6">
        {$t('common.hero_subtitle')}
      </h2>

      <p class="mt-2 text-secondary-300 text-lg max-w-xl">
        {$t('common.hero_description')}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 mt-8">
        <a href={URL_VSCODE_MARKETPLACE} target="_blank" rel="noreferrer noopener">
          <button class="btn-primary">
            <span class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L20 8.00004V16L12 20L4 16V8.00004L12 4Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {$t('common.install')}
            </span>
          </button>
        </a>
        <a href="https://chat.twinny.dev" target="_blank" rel="noreferrer noopener">
          <button class="btn-secondary">
            <span class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M12 8V16M8 12H16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              {$t('common.symmetry-chat')}
            </span>
          </button>
        </a>
      </div>
    </div>

    <!-- Right content - card -->
    <div class="w-full max-w-md flex flex-col lg:items-start items-center justify-center">
      <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50">
        <h3 class="text-xl font-bold mb-4 text-center text-white">
          {$t('common.subscribe_label')}
        </h3>
        <Register {form} />
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <h2 class="text-3xl font-bold text-white text-center mb-12">{$t('common.how_it_works_title')}</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div class="flex flex-col items-center text-center">
      <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
        <span class="text-2xl font-bold text-rose-500">1</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{$t('common.how_it_works_step1_title')}</h3>
      <p class="text-secondary-300">{$t('common.how_it_works_step1_desc')}</p>
    </div>

    <div class="flex flex-col items-center text-center">
      <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
        <span class="text-2xl font-bold text-rose-500">2</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{$t('common.how_it_works_step2_title')}</h3>
      <p class="text-secondary-300">{$t('common.how_it_works_step2_desc')}</p>
    </div>

    <div class="flex flex-col items-center text-center">
      <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
        <span class="text-2xl font-bold text-rose-500">3</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{$t('common.how_it_works_step3_title')}</h3>
      <p class="text-secondary-300">{$t('common.how_it_works_step3_desc')}</p>
    </div>

    <div class="flex flex-col items-center text-center">
      <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4">
        <span class="text-2xl font-bold text-rose-500">4</span>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">{$t('common.how_it_works_step4_title')}</h3>
      <p class="text-secondary-300">{$t('common.how_it_works_step4_desc')}</p>
    </div>
  </div>
</section>

<!-- Features section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <svg
        class="w-10 h-10 text-rose-500 mb-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9M21 9L12 3L3 9M21 9H3M16 14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V11H16V14Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">{$t('common.feature_privacy_first_title')}</h3>
      <p class="text-secondary-300">{$t('common.feature_privacy_first_desc')}</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <svg
        class="w-10 h-10 text-rose-500 mb-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16.01V16M12 8V12M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">
        {$t('common.feature_symmetry_network_title')}
      </h3>
      <p class="text-secondary-300">{$t('common.feature_symmetry_network_desc')}</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <svg
        class="w-10 h-10 text-rose-500 mb-4"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h3 class="text-lg font-bold mb-2 text-white">{$t('common.feature_vscode_title')}</h3>
      <p class="text-secondary-300">{$t('common.feature_vscode_desc')}</p>
    </div>
  </div>
</section>

<!-- Developers Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="flex flex-col lg:flex-row items-center gap-12">
    <div class="w-full lg:w-1/2">
      <h2 class="text-3xl font-bold text-white mb-2">{$t('common.developers_title')}</h2>
      <p class="text-xl text-rose-500 font-bold mb-4">{$t('common.developers_subtitle')}</p>
      <p class="text-secondary-300 mb-6">{$t('common.developers_desc')}</p>

      <ul class="space-y-4">
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.developers_feature1')}</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.developers_feature2')}</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.developers_feature3')}</span>
        </li>
      </ul>

      <div class="mt-8">
        <a href={URL_VSCODE_MARKETPLACE} target="_blank" rel="noreferrer noopener">
          <button class="btn-primary">
            {$t('common.install')}
          </button>
        </a>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex justify-center">
      <div class="w-full max-w-md aspect-video bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 rounded-lg flex items-center justify-center overflow-hidden">
        <canvas use:initNetworkCanvas class="w-full h-full"></canvas>
      </div>
    </div>
  </div>
</section>

<!-- Providers Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="flex flex-col-reverse lg:flex-row items-center gap-12">
    <div class="w-full lg:w-1/2 flex justify-center">
      <div class="w-full max-w-md aspect-video bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 rounded-lg flex items-center justify-center overflow-hidden">
        <canvas use:initSymmetryCanvas class="w-full h-full"></canvas>
      </div>
    </div>

    <div class="w-full lg:w-1/2">
      <h2 class="text-3xl font-bold text-white mb-2">{$t('common.providers_title')}</h2>
      <p class="text-xl text-rose-500 font-bold mb-4">{$t('common.providers_subtitle')}</p>
      <p class="text-secondary-300 mb-6">{$t('common.providers_desc')}</p>

      <ul class="space-y-4">
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.providers_feature1')}</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.providers_feature2')}</span>
        </li>
        <li class="flex items-start">
          <svg class="w-6 h-6 text-rose-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-secondary-300">{$t('common.providers_feature3')}</span>
        </li>
      </ul>

      <div class="mt-8">
        <a href="/symmetry" rel="noreferrer noopener">
          <button class="btn-primary">
            {$t('common.install_cli')}
          </button>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Rewards Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold text-white mb-4">Earn Future Rewards with Symmetry</h2>
    <p class="text-xl text-rose-500 font-bold mb-6">Contribute to the Network, Get Rewarded</p>
    <p class="text-secondary-300 max-w-3xl mx-auto">Join the Symmetry network and earn rewards for your contributions. The longer your uptime and the more resources you share, the greater your rewards.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Uptime Rewards</h3>
      <p class="text-secondary-300 text-center">Maintain high uptime to maximize your rewards. The more your node is available, the more you earn.</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Token Incentives</h3>
      <p class="text-secondary-300 text-center">Earn Symmetry tokens for your contributions to the network. Coming soon.</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Performance Bonuses</h3>
      <p class="text-secondary-300 text-center">Receive additional rewards for high-performance nodes. The more requests you process, the higher your earnings.</p>
    </div>
  </div>

</section>

<!-- Community Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="text-center max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-white mb-6">{$t('common.community_title')}</h2>
    <p class="text-secondary-300 mb-8">{$t('common.community_desc')}</p>

    <div class="flex flex-wrap justify-center gap-6">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a href={URL_GITHUB} target="_blank" rel="noreferrer noopener" class="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-800 hover:bg-secondary-700 transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
        </svg>
      </a>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a href="https://x.com/twinnydotdev" target="_blank" rel="noreferrer noopener" class="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-800 hover:bg-secondary-700 transition-colors">
        <svg width="20" height="20" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
        </svg>
      </a>
    </div>
  </div>
</section>
