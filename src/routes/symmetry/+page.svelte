<script lang="ts">
  import { t } from '$lib/translations'
  import Register from '$lib/components/register.svelte'
  import { onMount, onDestroy } from 'svelte'
  import {
    URL_SYMMETRY_CLI,
    URL_SYMMETRY_CORE,
    URL_SYMMETRY_DOCS,
    URL_SYMMETRY_SERVER
  } from '$lib/const'
  import type { Peer } from 'symmetry-core'

  let ws: WebSocket
  let activePeers = 0
  let activeModels = 0
  let peers: any[] = []

  const sortPeers = (peers: any[]): any[] => {
    return [...peers].sort((a, b) => {
      if (a.online !== b.online) {
        return b.online - a.online
      }
      const pointsA = a.points ?? 0
      const pointsB = b.points ?? 0
      return pointsB - pointsA
    })
  }

  onMount(() => {
    ws = new WebSocket('wss://twinny.dev/ws')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      activePeers = data.activePeers
      activeModels = data.activeModels
      peers = sortPeers(data.allPeers)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  })

  onDestroy(() => {
    if (ws) {
      ws.close()
    }
  })
</script>

<template lang="pug">
div
  div
    div(class="mb-8")
      h3(class="text-2xl font-semibold mb-4") {$t('common.active_connections')}
      div(class="grid grid-cols-1 sm:grid-cols-2 gap-4")
        div(class="bg-stone-800 p-6 rounded-lg")
          p(class="text-sm font-medium mb-2") {$t('common.active_peers')}
          p(class="text-3xl font-bold") {activePeers}
        div(class="bg-stone-800 p-6 rounded-lg")
          p(class="text-sm font-medium mb-2") {$t('common.active_models')}
          p(class="text-3xl font-bold") {activeModels}

    div(class="mb-6")
      div(class="flex justify-between items-center mb-4")
        h3(class="text-2xl font-semibold") {$t('common.providers')}

    div(class="overflow-x-auto")
      table(class="w-full min-w-full bg-stone-800 rounded-lg overflow-hidden  text-sm")
        thead(class="bg-stone-700")
          tr
            th(class="px-2 py-3 text-left text-sm font-semibold") {$t('common.model')}
            th(class="px-2 py-3 text-left text-sm font-semibold") {$t('common.name')}
            th(class="px-2 py-3 text-left text-sm font-semibold") {$t('common.online')}
            th(class="px-2 py-3 text-left text-sm font-semibold hidden xl:table-cell") {$t('common.data_collected')}
            th(class="px-2 py-3 text-left text-sm font-semibold hidden lg:table-cell") {$t('common.provider')}
            th(class="px-2 py-3 text-left text-sm font-semibold") {$t('common.points')}
        tbody
          +each('peers as peer')
            tr(class="border-t border-stone-700 hover:bg-stone-700/50 transition-colors")
              td(class="px-2 py-3") {peer.model_name}
              td(class="px-2 py-3") {peer.name || 'N/A'}
              td(class="px-2 py-3")
                span(class="inline-flex items-center px-2 py-1 rounded-full font-medium")
                  span(class="{peer.online ? 'text-green-600' : 'text-red-600'}")  {peer.online ? '✔' : '✕'}
              td(class="px-2 py-3 hidden xl:table-cell") {peer.data_collection_enabled ? $t('common.yes') : $t('common.no')}
              td(class="px-2 py-3 hidden lg:table-cell") {peer.provider || 'unknown'}
              td(class="px-2 py-3")
                span(class="font-medium") {peer.points || 0}

    h3(class="text-2xl font-semibold mb-4 mt-6") {$t('common.become_a_provider')}

    div(class="bg-stone-800 rounded-lg p-6 mb-8")
      p(class="mb-4") {$t('common.become_a_provider_description')}
      div(class="space-y-2")
        a(href='{URL_SYMMETRY_CORE}' class="text-rose-500 hover:text-rose-400 block") {$t('common.symmetry_installation')}
        a(href='{URL_SYMMETRY_CLI}' class="text-rose-500 hover:text-rose-400 block") {$t('common.symmetry_installation_cli')}

</template>
