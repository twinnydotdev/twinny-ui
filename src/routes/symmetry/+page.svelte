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

  let peers: any[] = $state([])

  onMount(() => {
    ws = new WebSocket('wss://twinny.dev/ws')
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

    <div class="space-y-4 md:space-y-0">
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full bg-stone-800 rounded-lg overflow-hidden text-sm">
          <thead class="bg-stone-700">
            <tr>
              <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.model')}</th>
              <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.name')}</th>
              <th class="px-2 py-3 text-left text-sm font-semibold">{$t('common.online')}</th>
              <th class="px-2 py-3 text-left text-sm font-semibold hidden xl:table-cell">{$t('common.data_collected')}</th>
              <th class="px-2 py-3 text-left text-sm font-semibold hidden lg:table-cell">{$t('common.provider')}</th>
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
                  <span class={peer.online ? 'text-green-600' : 'text-red-600'}>
                    {peer.online ? '✔' : '✕'}
                  </span>
                </td>
                <td class="px-2 py-3 hidden xl:table-cell">
                  {peer.data_collection_enabled ? $t('common.yes') : $t('common.no')}
                </td>
                <td class="px-2 py-3 hidden lg:table-cell">{peer.provider || 'unknown'}</td>
                <td class="px-2 py-3">{peer.duration_minutes || 0}</td>
                <td class="px-2 py-3">
                  {#if peer.online}
                    <a href="/chat?model={peer.model_name}">
                      <button class="px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-600 transition-colors">
                        {$t('common.chat')}
                      </button>
                    </a>
                  {:else}
                    {$t('common.offline')}
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="md:hidden space-y-4">
        {#each peers as peer}
          <div class="bg-stone-800 p-4 rounded-lg space-y-2">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xs text-stone-400">{$t('common.model')}</div>
                <div class="font-medium">{getShortId(peer.model_name)}</div>
              </div>
              <span class={peer.online ? 'text-green-600' : 'text-red-600'}>
                {peer.online ? '✔' : '✕'}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <div class="text-xs text-stone-400">{$t('common.name')}</div>
                <div>{getShortId(peer.name, 5, 5)}</div>
              </div>
              <div>
                <div class="text-xs text-stone-400">{$t('common.up_time_minutes')}</div>
                <div>{peer.duration_minutes || 0}</div>
              </div>
            </div>

            {#if peer.online}
              <a href="/chat?model={peer.model_name}" class="block mt-2">
                <button class="w-full px-3 py-2 rounded-md bg-green-700 text-white hover:bg-green-600 transition-colors">
                  {$t('common.chat')}
                </button>
              </a>
            {/if}
          </div>
        {/each}
      </div>
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
