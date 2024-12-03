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

  let peers = $state<any[]>([])
  let connectionStatus = $state<'connected' | 'disconnected'>('disconnected')

  onMount(() => {
    ws = new WebSocket('wss://twinny.dev/ws')
    ws.onopen = () => (connectionStatus = 'connected')
    ws.onclose = () => (connectionStatus = 'disconnected')
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
    }
  })

  onDestroy(() => ws?.close())
</script>

<div class="min-h-screen bg-stone-900 text-stone-100 p-6">
  <div class="max-w-7xl mx-auto space-y-8">
    <div class="border-b border-stone-800 pb-6">
      <h2 class="text-3xl font-bold text-stone-100 mb-2">{$t('common.symmetry')}</h2>
      <p class="text-stone-400">{$t('common.access')}</p>
    </div>

    {#if connectionStatus === 'disconnected'}
      <div class="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
        Connection lost. Attempting to reconnect...
      </div>
    {/if}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each Object.entries(stats) as [key, value]}
        <div class="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-xl shadow-lg">
          <div class="flex items-center gap-4">
            <div class="rounded-lg">
              <div class=" text-stone-100">
                {#if key === 'activeModels'}🤖
                {:else if key === 'activePeers'}⚡
                {:else if key === 'uniquePeerCount'}👥
                {:else if key === 'averageSessionMinutes'}⏱️
                {:else if key === 'totalProviderTime'}⌛
                {:else if key === 'totalRequests'}📊
                {:else if key === 'totalRequestsToday'}📈
                {:else}📝
                {/if}
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-stone-400">{$t(`common.${key}`)}</p>
              <p class="text-3xl font-bold">{value}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="space-y-6">
      <h3 class="text-2xl font-bold">{$t('common.become_a_provider')}</h3>
      <div class="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 shadow-lg">
        <p class="text-stone-300 mb-6">{$t('common.become_a_provider_description')}</p>
        <div class="space-y-4">
          {#each [[URL_SYMMETRY_CLI, 'symmetry_installation_cli', '💻']] as [url, key, icon]}
            <a
              href={url}
              class="block p-4 bg-stone-700/50 rounded-lg hover:bg-stone-700 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div class="p-2 bg-rose-500/10 rounded-lg">
                  <div class="w-6 h-6 text-rose-500">{icon}</div>
                </div>
                <div>
                  <p class="font-medium">{$t(`common.${key}`)}</p>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <div class="bg-stone-800 rounded-xl overflow-hidden shadow-lg">
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-stone-700">
            <tr>
              {#each ['model', 'name', 'online', 'provider', 'total_requests', 'tokens_per_sec', 'total_tokens', 'up_time_minutes', 'chat'] as header}
                <th
                  class="px-6 py-4 text-left font-semibold {header === 'provider'
                    ? 'hidden lg:table-cell'
                    : ''} {header === 'tokens_per_sec' ? 'hidden xl:table-cell' : ''}"
                  >{$t(`common.${header}`)}</th
                >
              {/each}
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-700">
            {#each peers as peer}
              <tr class="hover:bg-stone-700/30 transition-colors">
                <td class="px-6 py-4">{getShortId(peer.model_name, 10, 10)}</td>
                <td class="px-6 py-4">{getShortId(peer.name, 10, 10)}</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium {peer.online
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'}"
                  >
                    {peer.online ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td class="px-6 py-4 hidden lg:table-cell">{peer.provider || 'unknown'}</td>
                <td class="px-6 py-4">{peer.total_requests || 0}</td>
                <td class="px-6 py-4 hidden xl:table-cell"
                  >{Math.round(peer.avg_tokens_per_second || 0)}</td
                >
                <td class="px-6 py-4">{peer.total_tokens || 0}</td>
                <td class="px-6 py-4">{peer.duration_minutes || 0}</td>
                <td class="px-6 py-4">
                  {#if peer.online}
                    <a href="/chat?model={peer.model_name}">
                      <button
                        class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors"
                      >
                        {$t('common.chat')}
                      </button>
                    </a>
                  {:else}
                    <span class="text-stone-500">{$t('common.offline')}</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="md:hidden divide-y divide-stone-700">
        {#each peers as peer}
          <div class="p-4 space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium">{getShortId(peer.model_name)}</p>
                <p class="text-sm text-stone-400">{peer.name}</p>
              </div>
              <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium {peer.online ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
                {peer.online ? 'Online' : 'Offline'}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-stone-400">{$t('common.provider')}</p>
                <p>{peer.provider || 'unknown'}</p>
              </div>
              <div>
                <p class="text-stone-400">{$t('common.total_requests')}</p>
                <p>{peer.total_requests || 0}</p>
              </div>
              <div>
                <p class="text-stone-400">{$t('common.total_tokens')}</p>
                <p>{peer.total_tokens || 0}</p>
              </div>
              <div>
                <p class="text-stone-400">{$t('common.up_time_minutes')}</p>
                <p>{peer.duration_minutes || 0}</p>
              </div>
            </div>
            {#if peer.online}
              <a href="/chat?model={peer.model_name}">
                <button class="w-full mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
                  {$t('common.chat')}
                </button>
              </a>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <div>
      <div class="flex justify-end items-center mt-8 text-rose-500 font-medium">
        <a href="/privacy">{$t('common.privacy_policy')}</a>
      </div>
    </div>
  </div>
</div>
