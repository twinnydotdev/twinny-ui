<script lang="ts">
  import { t } from '$lib/translations'
  import { onMount, onDestroy } from 'svelte'
  import { URL_SYMMETRY_CLI, URL_SYMMETRY_CORE } from '$lib/const'
  import { getShortId } from '$lib/utils'

  let ws: WebSocket
  let activePeers = $state(0)
  let activeModels = $state(0)
  let peers: any[] = $state([])
  let filterStatus = $state('all')

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

  const filteredPeers = $derived(
    filterStatus === 'all'
      ? peers
      : peers.filter((peer) => (filterStatus === 'online' ? peer.online : !peer.online))
  )

  onMount(() => {
    ws = new WebSocket('wss://twinny.dev/ws')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      activePeers = data.activePeers
      activeModels = data.activeModels
      peers = sortPeers(data.allPeers).filter((peer) => peer.points > 1)
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

<div>
  <div>
    <div class="mb-8">
      <h3 class="text-2xl font-semibold mb-4">{$t('common.active_connections')}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-stone-800 p-6 rounded-lg">
          <p class="text-sm font-medium mb-2">{$t('common.active_peers')}</p>
          <p class="text-3xl font-bold">{activePeers}</p>
        </div>
        <div class="bg-stone-800 p-6 rounded-lg">
          <p class="text-sm font-medium mb-2">{$t('common.active_models')}</p>
          <p class="text-3xl font-bold">{activeModels}</p>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-semibold">{$t('common.providers')}</h3>
        <div class="flex gap-2">
          <button
            class={`px-3 py-1 rounded-md transition-colors ${filterStatus === 'all' ? 'bg-stone-700 text-white' : 'bg-stone-800 text-gray-400 hover:bg-stone-700'}`}
            onclick={() => (filterStatus = 'all')}
          >
            All
          </button>
          <button
            class={`px-3 py-1 rounded-md transition-colors ${filterStatus === 'online' ? 'bg-stone-700 text-green-500' : 'bg-stone-800 text-gray-400 hover:bg-stone-700'}`}
            onclick={() => (filterStatus = 'online')}
          >
            Online
          </button>
          <button
            class={`px-3 py-1 rounded-md transition-colors ${filterStatus === 'offline' ? 'bg-stone-700 text-red-500' : 'bg-stone-800 text-gray-400 hover:bg-stone-700'}`}
            onclick={() => (filterStatus = 'offline')}
          >
            Offline
          </button>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full min-w-full bg-stone-800 rounded-lg overflow-hidden text-sm layout">
        <thead class="bg-stone-700">
          <tr>
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.model')}</th>
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.name')}</th>
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.online')}</th>
            <th class="px-2 py-3 text-left text-sm font-semibold hidden xl:table-cell"
              >{$t('common.data_collected')}</th
            >
            <th class="px-2 py-3 text-left text-sm font-semibold hidden lg:table-cell"
              >{$t('common.provider')}</th
            >
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.points')}</th>
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.chat')}</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredPeers as peer}
            <tr class="border-t border-stone-700 hover:bg-stone-700/50 transition-colors">
              <td class="px-2 py-3">{getShortId(peer.model_name)}</td>
              <td class="px-2 py-3">{getShortId(peer.name)}</td>
              <td class="px-2 py-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full font-medium">
                  <span class={peer.online ? 'text-green-600' : 'text-red-600'}
                    >{peer.online ? '✔' : '✕'}</span
                  >
                </span>
              </td>
              <td class="px-2 py-3 hidden xl:table-cell"
                >{peer.data_collection_enabled ? $t('common.yes') : $t('common.no')}</td
              >
              <td class="px-2 py-3 hidden lg:table-cell">{peer.provider || 'unknown'}</td>
              <td class="px-2 py-3">
                <span class="font-medium">{peer.points || 0}</span>
              </td>
              <td class="px-2 py-3">
                <span class="font-medium">
                  {#if peer.online}
                    <a class="text-green-500" href="/chat?model={peer.model_name}">
                      Chat
                    </a>
                  {/if}
                  {#if !peer.online}
                    Offline
                  {/if}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h3 class="text-2xl font-semibold mb-4 mt-6">{$t('common.become_a_provider')}</h3>

    <div class="bg-stone-800 rounded-lg p-6 mb-8">
      <p class="mb-4">{$t('common.become_a_provider_description')}</p>
      <div class="space-y-2">
        <a href={URL_SYMMETRY_CORE} class="text-rose-500 hover:text-rose-400 block"
          >{$t('common.symmetry_installation')}</a
        >
        <a href={URL_SYMMETRY_CLI} class="text-rose-500 hover:text-rose-400 block"
          >{$t('common.symmetry_installation_cli')}</a
        >
      </div>
    </div>
  </div>
</div>
