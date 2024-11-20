<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  let completion = $state('')
  let message = $state('')
  let messages = $state<Array<{ role: string; content: string }>>([])
  let chatContainer: HTMLDivElement
  let inputRef: HTMLTextAreaElement
  const model = $page.url.searchParams.get('model')

  export function isStreamWithDataPrefix(stringBuffer: string) {
    return stringBuffer.startsWith('data:')
  }

  export function safeParseStreamResponse(stringBuffer: string) {
    try {
      if (isStreamWithDataPrefix(stringBuffer)) {
        return JSON.parse(stringBuffer.split('data:')[1])
      }
      return JSON.parse(stringBuffer)
    } catch (e) {
      return undefined
    }
  }

  async function streamChat() {
    if (!message) return
    try {
      messages = [...messages, { role: 'user', content: message }]
      message = ''
      const response = await fetch('https://twinny.dev/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionRequest: { modelName: model },
          data: {
            messages
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        messages.push({ role: 'assistant', content: `Error: ${JSON.stringify(errorData)}` })
      }

      if (!response.body) return

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      await processStream(reader)
    } catch (error) {
      console.error('Stream error:', error)
    }
  }

  async function processStream(reader: ReadableStreamDefaultReader) {
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = typeof value === 'string' ? value : new TextDecoder().decode(value)

        const streamMessages = chunk
          .split('\n')
          .filter((line) => line.trim().length > 0)
          .map((line) => {
            if (line.includes('symmetryEmitterKey')) return null
            return safeParseStreamResponse(line)
          })
          .filter((msg) => msg !== null)

        for (const message of streamMessages) {
          if (!message?.choices.length) continue

          const choice = message.choices[0]
          if (!choice) continue

          if (choice.delta.content) {
            completion += choice.delta.content
            chatContainer.scrollTo({
              top: chatContainer.scrollHeight
            })
          }

          if (choice.finish_reason === 'stop') {
            console.log(completion)
            if (completion.trim()) {
              messages = [
                ...messages,
                {
                  role: 'assistant',
                  content: completion.trim()
                }
              ]
            }
            completion = ''
            inputRef?.focus()
          }
        }
      }
    } catch (error) {
      console.error('Error processing stream:', error)
      if (completion.trim()) {
        messages = [
          ...messages,
          {
            role: 'assistant',
            content: completion.trim()
          }
        ]
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      streamChat()
    }
  }

  onMount(() => {
    inputRef.focus()
  })
</script>

<div
  class="flex flex-col h-[calc(100vh-100px)] bg-stone-900 w-full max-w-3xl mx-auto sm:min-w-[550px]"
>
  {#if !messages.length && !completion}
    <div class="text-center text-white mt-56 font-semibold">
      <svg class="h-20 w-auto mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="6" fill="white" />
        <path d="M32 26L18 18" stroke="white" stroke-width="2" />
        <path d="M32 26L46 18" stroke="white" stroke-width="2" />
        <path d="M32 38L18 46" stroke="white" stroke-width="2" />
        <path d="M32 38L46 46" stroke="white" stroke-width="2" />
        <circle cx="18" cy="18" r="4" fill="white" />
        <circle cx="46" cy="18" r="4" fill="white" />
        <circle cx="18" cy="46" r="4" fill="white" />
        <circle cx="46" cy="46" r="4" fill="white" />
        <path d="M18 22C18 36 46 36 46 22" stroke="white" stroke-width="2" fill="none" />
        <path d="M18 42C18 28 46 28 46 42" stroke="white" stroke-width="2" fill="none" />
      </svg>
      <p>
        This is a chat interface powered by Symmetry - a network that connects users to AI. Your
        messages are sent to a central server which uses peer-to-peer networking to communicate with
        AI providers. Once processed, responses flow back through the same path to reach you here.
      </p>
    </div>
  {/if}
  <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each messages as msg}
      <div
        class={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-stone-800 ml-12' : 'bg-stone-700 mr-12'}`}
      >
        <div class="text-wrap text-white whitespace-pre-wrap">
          <SvelteMarkdown source={msg.content} />
        </div>
      </div>
    {/each}
    {#if completion}
      <div class="bg-stone-700 p-4 rounded-lg mr-12">
        <div class="text-wrap text-white whitespace-pre-wrap">
          <SvelteMarkdown source={completion} />
        </div>
      </div>
    {/if}
  </div>

  <div>
    <div class="flex-1 p-4 relative">
      <textarea
        bind:this={inputRef}
        bind:value={message}
        onkeydown={handleKeyDown}
        placeholder="How can twinny help you today?"
        class="w-full p-2 pr-16 rounded-md bg-stone-700 text-white placeholder:text-stone-400 resize-none min-h-[70px] max-h-40"
      ></textarea>
      <button
        onclick={streamChat}
        class="absolute bottom-9 right-3 px-4 py-2 text-white"
        aria-label="Send"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2z" />
        </svg>
      </button>
    </div>
  </div>
</div>
