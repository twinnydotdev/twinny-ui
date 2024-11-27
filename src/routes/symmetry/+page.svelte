<script lang="ts">
  import { t } from '$lib/translations'
  import { onMount, onDestroy } from 'svelte'
  import { URL_SYMMETRY_CLI, URL_SYMMETRY_CORE } from '$lib/const'
  import { getShortId } from '$lib/utils'

  interface Stats {
    activeModels: number
    activePeers: number
    averageSessionMinutes: number
    totalProviderTime: number
    totalRequests: number
    totalRequestsToday: number
    totalSessions: number
    uniquePeerCount: number
  }

  let ws: WebSocket
  let stats = $state<Stats>({
    activeModels: 0,
    activePeers: 0,
    averageSessionMinutes: 0,
    totalProviderTime: 0,
    totalRequests: 0,
    totalRequestsToday: 0,
    totalSessions: 0,
    uniquePeerCount: 0
  })

  let filterStatus = $state('all')
  let peers: any[] = $state([])

  onMount(() => {
    ws = new WebSocket('http://localhost:4005/ws')
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      peers = data.allPeers

      stats = {
        averageSessionMinutes: data.stats.averageSessionMinutes,
        totalProviderTime: data.stats.totalProviderTime,
        totalRequests: data.stats.totalRequests,
        totalRequestsToday: data.stats.totalRequestsToday,
        totalSessions: data.stats.totalSessions,
        activePeers: data.activePeers,
        activeModels: data.activeModels,
        uniquePeerCount: data.uniquePeerCount
      }
      console.log(stats)
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
    <div class="border-b border-stone-800 mb-8 pb-6">
      <h2 class="text-xl font-medium text-stone-200 mb-2">{$t('common.symmetry')}</h2>
      <p class="text-sm text-stone-400">
        {$t('common.access')}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.active_peers')}</p>
        <p class="text-3xl font-bold">{stats.activePeers}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.active_models')}</p>
        <p class="text-3xl font-bold">{stats.activeModels}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.unique_peer_count')}</p>
        <p class="text-3xl font-bold">{stats.uniquePeerCount}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.average_session_duration')}</p>
        <p class="text-3xl font-bold">{stats.averageSessionMinutes}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.total_provider_time')}</p>
        <p class="text-3xl font-bold">{stats.totalProviderTime}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.total_requests')}</p>
        <p class="text-3xl font-bold">{stats.totalRequests}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.total_requests_today')}</p>
        <p class="text-3xl font-bold">{stats.totalRequestsToday}</p>
      </div>
      <div class="bg-stone-800 p-6 rounded-lg">
        <p class="text-sm font-medium mb-2">{$t('common.total_sessions')}</p>
        <p class="text-3xl font-bold">{stats.totalSessions}</p>
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
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.up_time_minutes')}</th>
            <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.chat')}</th>
          </tr>
        </thead>
        <tbody>
          {#each peers as peer}
            <tr class="border-t border-stone-700 hover:bg-stone-700/50 transition-colors">
              <td class="px-2 py-3">{getShortId(peer.model_name)}</td>
              <td class="px-2 py-3">{getShortId(peer.name, 5, 5)}</td>
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
                <span class="font-medium">{peer.duration_minutes || 0}</span>
              </td>
              <td class="px-2 py-3">
                <span class="font-medium">
                  {#if peer.online}
                    <a href="/chat?model={peer.model_name}">
                      <button
                        class="px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-600 transition-colors"
                      >
                        {$t('common.chat')}
                      </button>
                    </a>
                  {/if}
                  {#if !peer.online}
                    {$t('common.offline')}
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
