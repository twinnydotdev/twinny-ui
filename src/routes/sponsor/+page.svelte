<script lang="ts">
  let copied = false
  const bitcoinAddress = '1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj'

  async function copyToClipboard() {
    await navigator.clipboard.writeText(bitcoinAddress)
    copied = true
    setTimeout(() => {
      copied = false
    }, 2000)
  }
</script>

<div class="flex flex-col items-center gap-4 p-6">
  <div class="flex items-center gap-2 text-lg font-medium">
    <span class="text-red-500">₿</span>
    <span>im hungry, please send bitcorns</span>
  </div>

  <div class="relative group">
    <div
      class="flex items-center gap-3 bg-stone-900 rounded-lg p-4 pr-12 border border-stone-500 hover:border-gray-600 transition-colors cursor-pointer"
      on:click={copyToClipboard}
      on:keydown={(e) => e.key === 'Enter' && copyToClipboard()}
      role="button"
      tabindex="0"
      aria-label="Click to copy Bitcoin address"
    >
      <code class="font-mono text-xs text-gray-300 break-all">
        {bitcoinAddress}
      </code>

      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-stone-800 hover:bg-gray-700 transition-colors"
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {#if copied}
          <!-- You can replace this with an actual SVG or icon component -->
          <svg
            class="w-4 h-4 text-green-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        {:else}
          <!-- Copy icon -->
          <svg
            class="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            ></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  {#if copied}
    <div class="text-sm text-green-400">Address copied to clipboard!</div>
  {/if}
</div>
