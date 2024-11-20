<script lang="ts">
  import { page } from '$app/stores'
  import { Marked } from 'marked'
  import { markedHighlight } from 'marked-highlight'
  import hljs from 'highlight.js'
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

  function processMarkdown(content: string) {
    const marked = new Marked(
      markedHighlight({
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext'
          console.log(lang)
          return hljs.highlight(code, { language }).value
        }
      })
    )
    return marked.parse(content)
  }

  function newChat() {
    message = ''
    messages = []
    inputRef.focus()
  }

  onMount(() => {
    inputRef.focus()
  })
</script>

<div
  class="flex flex-col h-[calc(100vh-100px)] bg-stone-900 w-full max-w-3xl mx-auto sm:min-w-[550px]"
>
  {#if messages.length}
    <div class="flex justify-between my-2 w-full">
      <button
        onclick={newChat}
        class="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
        data-state="closed"
        aria-label="New Chat"
        ><svg
          height="16"
          stroke-linejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style="color:currentcolor"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
            fill="currentColor"
          ></path></svg
        >
      </button>
    </div>
  {/if}
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
        <div class="text-wrap text-white whitespace-pre-wrap chat-content">
          {@html processMarkdown(msg.content)}
        </div>
      </div>
    {/each}
    {#if completion}
      <div class="bg-stone-700 p-4 rounded-lg mr-12">
        <div class="text-wrap text-white whitespace-pre-wrap chat-content">
          {@html processMarkdown(completion)}
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
        class="absolute bottom-16 right-3 px-4 py-2 text-white"
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
      <small class="flex justify-end text-stone-400 pr-2 pb-3 text-xs"> v0.1 alpha </small>
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
      tab-size: 4;
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
