<script lang="ts">
  import { t } from '$lib/translations'
  import { onMount, onDestroy } from 'svelte'
  import { URL_GITHUB } from '$lib/const'
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
  let loading = $state(true)

  onMount(() => {
    ws = new WebSocket('https://twinny.dev/ws')
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
      loading = false
    }
  })

  onDestroy(() => ws?.close())

  let unixCopied = false
  let windowsCopied = false

  const copyToClipboard = async (command: string, type: 'unix' | 'windows') => {
    await navigator.clipboard.writeText(command)
    if (type === 'unix') {
      unixCopied = true
      setTimeout(() => (unixCopied = false), 2000)
    } else {
      windowsCopied = true
      setTimeout(() => (windowsCopied = false), 2000)
    }
  }
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
              <p class="text-3xl font-bold">
                {#if loading}
                  <div class="h-8 w-16 bg-stone-700 animate-pulse rounded"></div>
                {:else}
                  {value}
                {/if}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="space-y-6">
      <h3 class="text-2xl font-bold">{$t('common.become_a_provider')}</h3>
      <div class="bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl p-6 shadow-lg space-y-6">
        <p class="text-stone-300">{$t('common.become_a_provider_description')}</p>
        <div class="space-y-4">
          {#each [[URL_GITHUB, 'symmetry_github_repo', '<>']] as [url, key, icon]}
            <a
              href={url}
              class="block p-4 bg-stone-700/50 rounded-lg hover:bg-stone-700 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div class="p-2 bg-rose-500/10 rounded-lg">
                  <div class="text-rose-500">{icon}</div>
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
            {#if loading}
              {#each Array(3) as _}
                <tr class="hover:bg-stone-700/30 transition-colors">
                  <td class="px-6 py-4"><div class="h-5 w-24 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-5 w-24 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-5 w-16 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4 hidden lg:table-cell"><div class="h-5 w-20 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-5 w-12 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4 hidden xl:table-cell"><div class="h-5 w-12 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-5 w-12 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-5 w-12 bg-stone-700 animate-pulse rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-8 w-20 bg-stone-700 animate-pulse rounded"></div></td>
                </tr>
              {/each}
            {:else}
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
            {/if}
          </tbody>
        </table>
      </div>

      <div class="md:hidden divide-y divide-stone-700">
        {#if loading}
          {#each Array(3) as _}
            <div class="p-4 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <div class="h-5 w-24 bg-stone-700 animate-pulse rounded mb-2"></div>
                  <div class="h-4 w-20 bg-stone-700 animate-pulse rounded"></div>
                </div>
                <div class="h-5 w-16 bg-stone-700 animate-pulse rounded"></div>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-stone-400">{$t('common.provider')}</p>
                  <div class="h-4 w-16 bg-stone-700 animate-pulse rounded mt-1"></div>
                </div>
                <div>
                  <p class="text-stone-400">{$t('common.total_requests')}</p>
                  <div class="h-4 w-12 bg-stone-700 animate-pulse rounded mt-1"></div>
                </div>
                <div>
                  <p class="text-stone-400">{$t('common.total_tokens')}</p>
                  <div class="h-4 w-12 bg-stone-700 animate-pulse rounded mt-1"></div>
                </div>
                <div>
                  <p class="text-stone-400">{$t('common.up_time_minutes')}</p>
                  <div class="h-4 w-12 bg-stone-700 animate-pulse rounded mt-1"></div>
                </div>
              </div>
              <div class="h-10 w-full bg-stone-700 animate-pulse rounded mt-3"></div>
            </div>
          {/each}
        {:else}
          {#each peers as peer}
            <div class="p-4 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">{getShortId(peer.model_name)}</p>
                  <p class="text-sm text-stone-400">{peer.name}</p>
                </div>
                <span
                  class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium {peer.online
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'}"
                >
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
                  <button
                    class="w-full mt-3 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition-colors"
                  >
                    {$t('common.chat')}
                  </button>
                </a>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <div>
      <div class="flex justify-end items-center mt-8 text-rose-500 font-medium">
        <a href="/privacy">{$t('common.privacy_policy')}</a>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.chat-content) {
    /* Code blocks */
    :global(pre) {
      background: #171717;
      padding: 1.25rem;
      border-radius: 0.5rem;
      margin: 1rem 0;
      overflow-x: auto;
    }

    :global(pre code) {
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      tab-size: 2;
      white-space: pre-wrap;
    }

    /* Syntax highlighting colors */
    :global(.hljs-keyword) {
      color: #eb6f92;
    } /* love */
    :global(.hljs-string) {
      color: #f6c177;
    } /* gold */
    :global(.hljs-comment) {
      color: #6e6a86;
    } /* muted */
    :global(.hljs-function) {
      color: #9ccfd8;
    } /* foam */
    :global(.hljs-number) {
      color: #c4a7e7;
    } /* iris */
    :global(.hljs-class) {
      color: #31748f;
    } /* pine */
    :global(.hljs-title) {
      color: #ebbcba;
    } /* rose */

    /* Add some margin to the code container */
    :global(pre code.hljs) {
      display: block;
      padding: 0.5rem;
    }

    /* Headers */
    :global(h1) {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }

    :global(h2) {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    :global(h3) {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    /* Paragraphs */
    :global(p) {
      margin: 0;
      line-height: 1.6;
    }

    /* Inline code */
    :global(code:not(pre code)) {
      background: #1f1d2e;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
    }

    /* Lists */
    :global(ul),
    :global(ol) {
      margin: 0 0 0 1.5rem;
    }

    :global(li) {
      margin: 0;
      line-height: 1.6;
      list-style: disc;
    }

    /* Links */
    :global(a) {
      color: #9ccfd8;
      text-decoration: none;
      border-bottom: 1px solid #9ccfd8;
    }

    :global(a:hover) {
      opacity: 0.8;
    }
  }
</style>
