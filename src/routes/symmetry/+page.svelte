<script lang="ts">
  import { t } from '$lib/translations'
  import Register from '$lib/components/register.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { URL_SYMMETRY_CLIENT, URL_SYMMETRY_DOCS } from '$lib/const'

  let ws: WebSocket
  let activePeers = 0
  let activeModels = 0
  let peers: any[] = []

  onMount(() => {
    ws = new WebSocket('ws://127.0.0.1:4005')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      activePeers = data.activePeers
      activeModels = data.activeModels
      peers = data.allPeers || []
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
div(class="min-h-screen flex flex-col items-center ")
  div(class="p-6")
    h2(class="text-3xl font-bold") {$t('common.symmetry')}
    p(class="py-6") {$t('common.symmetry_description')}
    p(class="pb-6")
      span {$t('common.symmetry_learn_more')}
      span(class="ml-1")
        a(href='{URL_SYMMETRY_CLIENT}' class="text-rose-500" target="_blank") {$t('common.check_out_the_code')}
    p(class="pb-6")
      a(href='{URL_SYMMETRY_DOCS}' class="text-rose-500" target="_blank") {$t('common.read_symmetry_documentation')}
    div(class="mb-6")
      h3(class="text-xl font-semibold mb-4") {$t('common.active_connections')}
      div(class="grid grid-cols-2 gap-4")
        div(class="bg-stone-800 p-4 rounded-md")
          p(class="text-sm font-medium") {$t('common.active_peers')}
          p(class="text-2xl font-bold") {activePeers}
        div(class="bg-stone-800 p-4 rounded-md")
          p(class="text-sm font-medium") {$t('common.active_models')}
          p(class="text-2xl font-bold") {activeModels}
    div(class="mb-6")
      h3(class="text-xl font-semibold mb-4") {$t('common.providers')}
      div(class="overflow-x-auto")
        table(class="min-w-full bg-stone-800 rounded-lg overflow-hidden")
          thead(class="bg-stone-700")
            tr
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.model')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.name')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.online')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.public')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.data_collected')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.last_seen')}
          tbody
          +each('peers as peer')
              tr(class="border-t border-stone-700")
                td(class="px-4 py-2") {peer.model_name}
                td(class="px-4 py-2") {peer.name || 'N/A'}
                td(class="px-4 py-2") {peer.online ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2") {peer.public ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2") {peer.dataCollectionEnabled ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2") {new Date(peer.last_seen).toLocaleString()}
</template>
