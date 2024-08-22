<script lang="ts">
  import { t } from '$lib/translations'
  import Register from '$lib/components/register.svelte'
  import { onMount, onDestroy } from 'svelte'
  import { URL_SYMMETRY_CLI, URL_SYMMETRY_CORE, URL_SYMMETRY_DOCS } from '$lib/const'

  let ws: WebSocket
  let activePeers = 0
  let activeModels = 0
  let peers: any[] = []

  onMount(() => {
    ws = new WebSocket('wss://twinny.dev/ws')

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
div(class="min-h-screen flex flex-col items-center p-4")
  div(class="w-full max-w-4xl")
    h2(class="text-3xl font-bold") {$t('common.symmetry')}
    p(class="py-6") {$t('common.symmetry_description')}
    p(class="pb-4")
      span {$t('common.symmetry_learn_more')}
      a(href='{URL_SYMMETRY_CORE}' class="text-rose-500 ml-1" target="_blank") {$t('common.check_out_the_code_client')}
    p(class="pb-6")
      span {$t('common.symmetry_server_learn_more')}
      a(href='{URL_SYMMETRY_CORE}' class="text-rose-500 ml-1" target="_blank") {$t('common.check_out_the_code_server')}
    h3(class="text-xl font-semibold mb-4") {$t('common.become_a_provider')}
    p(class="pb-2 font-medium mt-2")
      span {$t('common.become_a_provider_description')}
      a(href='{URL_SYMMETRY_CORE}' class="text-rose-500 ml-1" target="_blank") {$t('common.symmetry_installation')}
    p(class="pb-2 font-medium mt-2")
      span {$t('common.symmetry_cli')}
      a(href='{URL_SYMMETRY_CLI}' class="text-rose-500 ml-1" target="_blank") {$t('common.symmetry_installation_cli')}
    div(class="mb-6 mt-2")
      h3(class="text-xl font-semibold mb-4") {$t('common.active_connections')}
      div(class="grid grid-cols-1 sm:grid-cols-2 gap-4")
        div(class="bg-stone-800 p-4 rounded-md")
          p(class="text-sm font-medium") {$t('common.active_peers')}
          p(class="text-2xl font-bold") {activePeers}
        div(class="bg-stone-800 p-4 rounded-md")
          p(class="text-sm font-medium") {$t('common.active_models')}
          p(class="text-2xl font-bold") {activeModels}
    div(class="mb-6")
      h3(class="text-xl font-semibold mb-4") {$t('common.providers')}
      div(class="overflow-x-auto")
        table(class="w-full bg-stone-800 rounded-lg overflow-hidden")
          thead(class="bg-stone-700")
            tr
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.model')}
              th(class="px-4 py-2 text-left text-sm font-semibold sm:table-cell") {$t('common.name')}
              th(class="px-4 py-2 text-left text-sm font-semibold hidden md:table-cell") {$t('common.online')}
              th(class="px-4 py-2 text-left text-sm font-semibold hidden lg:table-cell") {$t('common.public')}
              th(class="px-4 py-2 text-left text-sm font-semibold hidden lg:table-cell") {$t('common.provider')}
              th(class="px-4 py-2 text-left text-sm font-semibold hidden xl:table-cell") {$t('common.data_collected')}
              th(class="px-4 py-2 text-left text-sm font-semibold") {$t('common.joined')}
          tbody
            +each('peers as peer')
              tr(class="border-t border-stone-700")
                td(class="px-4 py-2") {peer.model_name}
                td(class="px-4 py-2 sm:table-cell") {peer.name || 'N/A'}
                td(class="px-4 py-2 hidden md:table-cell") {peer.online ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2 hidden lg:table-cell") {peer.public ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2 hidden lg:table-cell") {peer.provider || 'unknown'}
                td(class="px-4 py-2 hidden xl:table-cell") {peer.data_collection_enabled ? $t('common.yes') : $t('common.no')}
                td(class="px-4 py-2") {new Date(peer.last_seen).toLocaleString()}
</template>
