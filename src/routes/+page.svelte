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
  let mouseX = 0
  let mouseY = 0
  let mouseRadius = 100
  let isMouseOver = false

  function initNetworkCanvas(node: HTMLCanvasElement) {
    const canvas = node;
    ctx = canvas.getContext('2d')!

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isMouseOver = true
    })

    canvas.addEventListener('mouseleave', () => {
      isMouseOver = false
    })

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    resizeObserver.observe(canvas)

    const nodes: {
      x: number,
      y: number,
      radius: number,
      vx: number,
      vy: number,
      color: string,
      originalRadius: number,
      targetRadius: number,
      hue: number
    }[] = []

    // Create nodes
    for (let i = 0; i < 25; i++) {
      const radius = 2 + Math.random() * 3
      const hue = 350 + Math.random() * 20 // Red to pink hue range
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        originalRadius: radius,
        targetRadius: radius,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        color: `hsla(${hue}, 90%, 60%, ${0.3 + Math.random() * 0.4})`,
        hue: hue
      })
    }

    let lastTime = 0
    function drawNodes(timestamp: number) {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      const fps = deltaTime > 0 ? 1000 / deltaTime : 60
      const speedFactor = 60 / fps // Normalize to 60fps

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            // Create gradient for connections
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            )
            gradient.addColorStop(0, `hsla(${nodes[i].hue}, 90%, 60%, ${0.15 * (1 - distance / maxDistance)})`)
            gradient.addColorStop(1, `hsla(${nodes[j].hue}, 90%, 60%, ${0.15 * (1 - distance / maxDistance)})`)

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw nodes and handle mouse interaction
      for (const node of nodes) {
        // Smooth radius transition
        node.radius += (node.targetRadius - node.radius) * 0.1 * speedFactor

        // Draw glow effect
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        )
        glow.addColorStop(0, `hsla(${node.hue}, 90%, 60%, 0.5)`)
        glow.addColorStop(1, `hsla(${node.hue}, 90%, 60%, 0)`)

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Mouse interaction
        if (isMouseOver) {
          const dx = mouseX - node.x
          const dy = mouseY - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius) {
            // Repel nodes from mouse
            const force = (1 - distance / mouseRadius) * 0.2 * speedFactor
            node.vx -= dx * force / distance
            node.vy -= dy * force / distance

            // Increase size when near mouse
            node.targetRadius = node.originalRadius * (1.5 + (1 - distance / mouseRadius))
          } else {
            node.targetRadius = node.originalRadius
          }
        } else {
          node.targetRadius = node.originalRadius
        }

        // Update position with delta time for smooth movement
        node.x += node.vx * speedFactor
        node.y += node.vy * speedFactor

        // Add slight randomness to movement
        node.vx += (Math.random() - 0.5) * 0.02 * speedFactor
        node.vy += (Math.random() - 0.5) * 0.02 * speedFactor

        // Limit velocity
        const maxVel = 1.5
        const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (vel > maxVel) {
          node.vx = (node.vx / vel) * maxVel
          node.vy = (node.vy / vel) * maxVel
        }

        // Bounce off walls with slight dampening
        if (node.x < 0) {
          node.x = 0
          node.vx *= -0.9
        } else if (node.x > canvas.width) {
          node.x = canvas.width
          node.vx *= -0.9
        }

        if (node.y < 0) {
          node.y = 0
          node.vy *= -0.9
        } else if (node.y > canvas.height) {
          node.y = canvas.height
          node.vy *= -0.9
        }
      }

      requestAnimationFrame(drawNodes)
    }

    requestAnimationFrame(drawNodes)

    // Clean up on destroy
    return {
      destroy() {
        resizeObserver.disconnect()
        canvas.removeEventListener('mousemove', () => {})
        canvas.removeEventListener('mouseleave', () => {})
      }
    }
  }

  // Animation for symmetry logo
  let symmetryCtx: CanvasRenderingContext2D

  function initSymmetryCanvas(node: HTMLCanvasElement) {
    const canvas = node;
    symmetryCtx = canvas.getContext('2d')!

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    resizeObserver.observe(canvas)

    let rotation = 0
    let pulsePhase = 0
    const nodePositions: {x: number, y: number, angle: number, pulseOffset: number}[] = []

    // Calculate node positions
    const numNodes = 6
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2
      nodePositions.push({
        x: 0, // Will be calculated in draw function
        y: 0, // Will be calculated in draw function
        angle: angle,
        pulseOffset: Math.random() * Math.PI * 2
      })
    }

    let lastTime = 0
    function drawSymmetryLogo(timestamp: number) {
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      const fps = deltaTime > 0 ? 1000 / deltaTime : 60
      const speedFactor = 60 / fps // Normalize to 60fps

      symmetryCtx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) * 0.7

      // Update animation values
      rotation += 0.003 * speedFactor
      pulsePhase += 0.02 * speedFactor

      // Create background glow
      const bgGlow = symmetryCtx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 1.2
      )
      bgGlow.addColorStop(0, 'rgba(244, 63, 94, 0.1)')
      bgGlow.addColorStop(1, 'rgba(244, 63, 94, 0)')

      symmetryCtx.beginPath()
      symmetryCtx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
      symmetryCtx.fillStyle = bgGlow
      symmetryCtx.fill()

      // Save context
      symmetryCtx.save()
      symmetryCtx.translate(centerX, centerY)

      // Draw outer rotating circle
      symmetryCtx.rotate(rotation)
      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, radius, 0, Math.PI * 2)

      // Create gradient for outer circle
      const circleGradient = symmetryCtx.createLinearGradient(-radius, -radius, radius, radius)
      circleGradient.addColorStop(0, 'rgba(244, 63, 94, 0.4)')
      circleGradient.addColorStop(1, 'rgba(244, 63, 94, 0.2)')

      symmetryCtx.strokeStyle = circleGradient
      symmetryCtx.lineWidth = 2
      symmetryCtx.stroke()

      // Draw secondary circle with opposite rotation
      symmetryCtx.rotate(-rotation * 2)
      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, radius * 0.85, 0, Math.PI * 2)
      symmetryCtx.strokeStyle = 'rgba(244, 63, 94, 0.15)'
      symmetryCtx.lineWidth = 1
      symmetryCtx.stroke()

      // Reset rotation for nodes
      symmetryCtx.rotate(rotation)

      // Update node positions
      for (const node of nodePositions) {
        // Calculate position with pulsing radius
        const pulseAmount = 0.05 * Math.sin(pulsePhase + node.pulseOffset)
        const nodeRadius = radius * (0.7 + pulseAmount)
        node.x = Math.cos(node.angle) * nodeRadius
        node.y = Math.sin(node.angle) * nodeRadius
      }

      // Draw connections between adjacent nodes
      symmetryCtx.beginPath()
      for (let i = 0; i < nodePositions.length; i++) {
        const current = nodePositions[i]
        const next = nodePositions[(i + 1) % nodePositions.length]

        symmetryCtx.moveTo(current.x, current.y)
        symmetryCtx.lineTo(next.x, next.y)
      }
      symmetryCtx.closePath()
      symmetryCtx.strokeStyle = 'rgba(244, 63, 94, 0.3)'
      symmetryCtx.lineWidth = 1
      symmetryCtx.stroke()

      // Draw inner connections to center
      for (const node of nodePositions) {
        // Create gradient for connections
        const gradient = symmetryCtx.createLinearGradient(
          0, 0, node.x, node.y
        )
        gradient.addColorStop(0, 'rgba(244, 63, 94, 0.7)')
        gradient.addColorStop(1, 'rgba(244, 63, 94, 0.3)')

        symmetryCtx.beginPath()
        symmetryCtx.moveTo(0, 0)
        symmetryCtx.lineTo(node.x, node.y)
        symmetryCtx.strokeStyle = gradient
        symmetryCtx.lineWidth = 1.5
        symmetryCtx.stroke()

        // Draw node with glow
        const nodeGlow = symmetryCtx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, 8
        )
        nodeGlow.addColorStop(0, 'rgba(244, 63, 94, 0.8)')
        nodeGlow.addColorStop(1, 'rgba(244, 63, 94, 0)')

        symmetryCtx.beginPath()
        symmetryCtx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        symmetryCtx.fillStyle = nodeGlow
        symmetryCtx.fill()

        // Draw actual node
        symmetryCtx.beginPath()
        symmetryCtx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        symmetryCtx.fillStyle = 'rgba(244, 63, 94, 0.8)'
        symmetryCtx.fill()
      }

      // Draw center node with pulsing effect
      const centerPulse = 0.2 * Math.sin(pulsePhase * 1.5) + 1
      const centerGlow = symmetryCtx.createRadialGradient(
        0, 0, 0,
        0, 0, 12 * centerPulse
      )
      centerGlow.addColorStop(0, 'rgba(244, 63, 94, 0.9)')
      centerGlow.addColorStop(1, 'rgba(244, 63, 94, 0)')

      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, 12 * centerPulse, 0, Math.PI * 2)
      symmetryCtx.fillStyle = centerGlow
      symmetryCtx.fill()

      symmetryCtx.beginPath()
      symmetryCtx.arc(0, 0, 6 * centerPulse, 0, Math.PI * 2)
      symmetryCtx.fillStyle = 'rgba(244, 63, 94, 1)'
      symmetryCtx.fill()

      // Restore context
      symmetryCtx.restore()

      requestAnimationFrame(drawSymmetryLogo)
    }

    requestAnimationFrame(drawSymmetryLogo)

    // Clean up on destroy
    return {
      destroy() {
        resizeObserver.disconnect()
      }
    }
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



<!-- Roadmap Section -->
<section class="w-full max-w-7xl py-16 border-t border-secondary-800/50">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold text-white mb-4">Roadmap</h2>
    <p class="text-xl text-rose-500 font-bold mb-6">Building the Future of Distributed AI</p>
    <p class="text-secondary-300 max-w-3xl mx-auto">We're rebuilding Symmetry from the ground up to create a truly distributed network with enhanced capabilities for developers.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Truly Distributed</h3>
      <p class="text-secondary-300 text-center">Rebuilding Symmetry's architecture to create a fully decentralized network that's more resilient and scalable.</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Resource Sharing</h3>
      <p class="text-secondary-300 text-center">Making it easier for developers to share computational resources, models, and capabilities across the network.</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Agent Capabilities</h3>
      <p class="text-secondary-300 text-center">Introducing advanced AI agent capabilities to Twinny, enabling more complex and autonomous assistance for developers.</p>
    </div>

    <div class="card bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 hover:border-rose-500/30 transition-all duration-300">
      <div class="flex items-center justify-center mb-6">
        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <h3 class="text-xl font-bold text-white text-center mb-2">Enhanced Performance</h3>
      <p class="text-secondary-300 text-center">Optimizing network performance for faster response times and more efficient resource utilization across the Symmetry network.</p>
    </div>
  </div>

  <div class="mt-12 text-center">
    <p class="text-secondary-300 max-w-3xl mx-auto">Stay tuned for more updates as we continue to develop these features and more!</p>
  </div>

  <!-- Community Section -->
<section class="w-full mt-12 max-w-7xl py-16 border-t border-secondary-800/50">
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
</section>
