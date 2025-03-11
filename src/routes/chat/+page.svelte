<script lang="ts">
  import { page } from '$app/stores'
  import { Marked } from 'marked'
  import { markedHighlight } from 'marked-highlight'
  import hljs from 'highlight.js'
  import { onMount } from 'svelte'
  import { t } from '$lib/translations'
  import { Motion } from 'svelte-motion'
  import { OpenAI } from 'openai'
  import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

  let completion = $state('')
  let message = $state('')
  let loading = $state(false)
  let streaming = $state(false)
  let messages = $state<ChatCompletionMessageParam[]>([])
  let chatContainer: HTMLDivElement
  let inputRef: HTMLTextAreaElement
  let isUserScrolled = $state(false)
  let showScrollButton = $state(false)
  const model = $page.url.searchParams.get('model') || 'llama3.2:latest'

  // Function to scroll to the bottom of the chat container
  function scrollToBottom(smooth = true) {
    if (chatContainer) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      })
    }
  }

  // Check if user has scrolled up within the chat container
  function handleScroll() {
    if (chatContainer) {
      const scrollPosition = chatContainer.scrollTop
      const containerHeight = chatContainer.clientHeight
      const scrollHeight = chatContainer.scrollHeight

      const isAtBottom = scrollPosition + containerHeight >= scrollHeight - 100
      isUserScrolled = !isAtBottom
      showScrollButton = isUserScrolled
    }
  }

  async function streamChat(regenerateLastMessage = false) {
    if (!regenerateLastMessage && !message) return
    loading = true
    streaming = true

    try {
      // If regenerating, remove the last assistant message
      if (regenerateLastMessage) {
        // Find the index of the last assistant message
        const lastAssistantIndex = [...messages].reverse().findIndex((m) => m.role === 'assistant')
        if (lastAssistantIndex !== -1) {
          // Remove the last assistant message from the array
          messages = messages.slice(0, messages.length - lastAssistantIndex - 1)
        }
      } else {
        // Add the new user message if not regenerating
        messages = [...messages, { role: 'user', content: message }]
        message = ''
      }

      // Scroll to bottom after adding user message
      if (chatContainer) {
        scrollToBottom(false)
      }

      const openai = new OpenAI({
        apiKey: "dummy",
        dangerouslyAllowBrowser: true,
        baseURL: 'https://twinny.dev/v1'
      })

      loading = false

      const stream = await openai.chat.completions.create({
        model,
        messages,
        stream: true
      })

      let scrollInterval: number | undefined;

      // Set up an interval to scroll to bottom during streaming
      // This ensures we keep scrolling as content grows
      scrollInterval = window.setInterval(() => {
        if (!isUserScrolled && chatContainer) {
          scrollToBottom(true)
        }
      }, 300)

      for await (const chunk of stream) {
        const content = chunk.choices[0].delta.content
        if (content) {
          completion += content
          // Scroll to bottom with each significant chunk if user hasn't scrolled up
          if (!isUserScrolled && content.length > 10) {
            scrollToBottom(true)
          }
        }
      }

      // Clear the scroll interval
      if (scrollInterval) {
        clearInterval(scrollInterval)
      }

      const trimmedCompletion = completion.trim()
      if (trimmedCompletion) {
        messages = [...messages, { role: 'assistant', content: trimmedCompletion }]

        // Scroll to bottom after adding assistant message
        setTimeout(() => {
          if (!isUserScrolled && chatContainer) {
            scrollToBottom(true)
          }
        }, 100)
      }

      streaming = false
      completion = ''

      requestAnimationFrame(() => {
        inputRef?.focus()
      })
    } catch (error) {
      console.error('Stream error:', error)
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
          const language = hljs.getLanguage(lang) ? lang : 'auto'
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
    streaming = false
    completion = ''
    loading = false
  }

  function regenerateResponse() {
    if (streaming || loading) return
    streamChat(true)
  }

  onMount(() => {
    inputRef.focus()

    // Add scroll event listener to the chat container to detect when user scrolls up
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll)

      // Initial scroll to bottom if there are messages
      if (messages.length > 0 && chatContainer) {
        setTimeout(() => scrollToBottom(false), 100)
      }
    }

    return () => {
      // Clean up event listener on component unmount
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll)
      }
    }
  })

  $effect(() => {
    message
    inputRef.style.height = '0px'
    const scrollHeight = inputRef.scrollHeight
    inputRef.style.height = `${scrollHeight}px`
  })

  // Effect to scroll to bottom when completion changes during streaming
  $effect(() => {
    if (completion && !isUserScrolled && chatContainer) {
      scrollToBottom(true)
    }
  })
</script>

<div class="flex flex-col h-screen text-white overflow-hidden">
  <header class="flex items-center justify-between p-4 max-w-4xl mx-auto w-full sticky top-0 z-20">
    {#if messages.length}
      <button
        onclick={newChat}
        class="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-stone-700/50 hover:bg-stone-800"
      >
        <svg height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
            fill="currentColor"
          ></path>
        </svg>
        {$t('common.new_chat')}
      </button>
    {/if}
  </header>

  <main class="flex flex-col max-w-4xl mx-auto w-full relative flex-grow overflow-hidden">
    <div class="absolute inset-0 flex flex-col">
      {#if !messages.length && !completion}
        <Motion animate={{ opacity: 1, scale: 1.03 }} transition={{ duration: 0.3 }} let:motion>
          <div
            class="flex h-full flex-col justify-center items-center opacity-0 text-center text-stone-400 px-4"
            use:motion
          >
            <svg
              class="h-24 w-auto mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
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

            <p class="max-w-xl text-lg">
              {$t('common.this_interface')}
            </p>
            <div class="mt-8"></div>
            <p class="mt-2 max-w-xl">
              {$t('common.learn_how')}
            </p>
            <a href="https://github.com/twinnydotdev/symmetry-cli" target="_blank">
              <button class="flex items-center gap-2 mt-6 px-4 py-2 btn-primary">
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
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                </svg>
                {$t('common.install_cli')}
              </button>
            </a>
          </div>
        </Motion>
      {/if}

      <div bind:this={chatContainer} class="flex-grow overflow-y-auto overflow-x-hidden p-2 space-y-6 pb-40">
      {#each messages as msg, i}
        <Motion animate={{ opacity: 1 }} transition={{ duration: 0.3 }} let:motion>
          <div
            use:motion
            class={`w-full ${msg.role === 'user' ? 'opacity-0 flex justify-end' : 'flex flex-col'}`}
          >
            <div
              class={`max-w-[90%] text-wrap p-3 sm:p-4 rounded-2xl shadow-md ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white ml-auto' : 'bg-gradient-to-br from-stone-800 to-stone-900 text-white border border-stone-700'}`}
            >
              <div class="chat-content">
                {@html processMarkdown(msg.content as string)}
              </div>
            </div>

            {#if msg.role === 'assistant' && i === messages.length - 1 && !loading && !streaming}
              <div class="flex mt-2 space-x-2">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button
                  onclick={regenerateResponse}
                  class="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800/50 hover:bg-stone-700/80 text-stone-300 hover:text-white rounded-full text-sm transition-all border border-stone-700/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
              </div>
            {/if}
          </div>
        </Motion>
      {/each}

      {#if completion}
        <Motion animate={{ opacity: 1 }} transition={{ duration: 0.5 }} let:motion>
          <div
            use:motion
            class="max-w-[85%] p-4 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 text-white border border-stone-700 shadow-md"
          >
            <div class="chat-content">
              {@html processMarkdown(completion)}
            </div>
          </div>
        </Motion>
      {/if}

      {#if loading}
        <Motion animate={{ opacity: 1 }} transition={{ duration: 0.3 }} let:motion>
          <div
            use:motion
            class="max-w-[85%] p-4 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 text-white border border-stone-700 shadow-md"
          >
            <div class="flex items-center text-wrap text-white chat-content">
              <span>
                {$t('common.thinking')}
              </span>
              <div class="ml-3 flex space-x-1">
                <div class="w-2 h-2 rounded-full bg-stone-400 animate-pulse"></div>
                <div
                  class="w-2 h-2 rounded-full bg-stone-400 animate-pulse"
                  style="animation-delay: 0.2s"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-stone-400 animate-pulse"
                  style="animation-delay: 0.4s"
                ></div>
              </div>
            </div>
          </div>
        </Motion>
      {/if}
      </div>

      <!-- Scroll to bottom button -->
      {#if showScrollButton}
        <div class="absolute bottom-20 right-4 z-20">
          <button
            onclick={() => scrollToBottom(true)}
            class="bg-stone-800 hover:bg-stone-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 border border-stone-700/50"
            aria-label="Scroll to bottom"
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
              <path d="M12 19V5" />
              <path d="m5 12 7 7 7-7" />
            </svg>
          </button>
        </div>
      {/if}

      <div class="p-2 bg-stone-900 absolute bottom-0 left-0 right-0 z-10">
        <div class="relative w-full max-w-3xl mx-auto">
          <textarea
            bind:this={inputRef}
            bind:value={message}
            disabled={streaming}
            onkeydown={handleKeyDown}
            placeholder="How can twinny help you today?"
            class="w-full p-3 pr-12 rounded-xl bg-stone-800/80 text-white placeholder:text-stone-400 resize-none min-h-[60px] max-h-80 border border-stone-700 focus:outline-none focus:border-stone-500 transition-all"
          ></textarea>

          <button
            disabled={streaming || !message}
            onclick={() => streamChat()}
            class="absolute bottom-11 right-3 p-2 text-white disabled:pointer-events-none disabled:opacity-50 transition-all duration-200"
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

          <div class="flex justify-between items-center mt-2 text-xs text-stone-500">
            <div>
              Press <kbd
                class="px-1.5 py-0.5 bg-stone-800 rounded text-stone-400 border border-stone-700"
                >Enter</kbd
              > to send
            </div>
            <small>v0.1 alpha</small>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  /* Prevent body scrolling */
  :global(body) {
    overflow: hidden;
  }

  :global(.chat-content) {
    /* Code blocks */
    :global(pre) {
      background: rgba(0, 0, 0, 0.3);
      padding: 1.25rem;
      border-radius: 0.5rem;
      margin: 1rem 0;
      overflow-x: auto;
      border: 1px solid rgba(75, 85, 99, 0.3);
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
      color: #c678dd;
    }
    :global(.hljs-string) {
      color: #98c379;
    }
    :global(.hljs-comment) {
      color: #7f848e;
    }
    :global(.hljs-function) {
      color: #61afef;
    }
    :global(.hljs-number) {
      color: #d19a66;
    }
    :global(.hljs-class) {
      color: #e5c07b;
    }
    :global(.hljs-title) {
      color: #e06c75;
    }

    /* Add some margin to the code container */
    :global(pre code.hljs) {
      display: block;
      padding: 0.5rem;
    }

    /* Headers */
    :global(h1) {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0.75em 0 0.5em 0;
      color: #f3f4f6;
      border-bottom: 1px solid rgba(107, 114, 128, 0.3);
      padding-bottom: 0.3em;
    }

    :global(h2) {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0.75em 0 0.5em 0;
      color: #f3f4f6;
      border-bottom: 1px solid rgba(107, 114, 128, 0.2);
      padding-bottom: 0.2em;
    }

    :global(h3) {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0.75em 0 0.5em 0;
      color: #f3f4f6;
    }

    /* Paragraphs */
    :global(p) {
      line-height: 1.6;
    }

    /* Inline code */
    :global(code:not(pre code)) {
      background: rgba(0, 0, 0, 0.25);
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      border: 1px solid rgba(75, 85, 99, 0.2);
    }

    /* Lists */
    :global(ul),
    :global(ol) {
      margin: 0.7em 0 0.7em 1.5rem;
    }

    :global(li) {
      margin: 0.3em 0;
      line-height: 1.6;
    }

    /* Links */
    :global(a) {
      color: #a5b4fc;
      text-decoration: none;
      border-bottom: 1px solid rgba(165, 180, 252, 0.3);
      transition: all 0.2s ease;
    }

    :global(a:hover) {
      color: #818cf8;
      border-bottom: 1px solid rgba(129, 140, 248, 0.6);
    }

    /* Tables */
    :global(table) {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      overflow: hidden;
      border-radius: 0.5rem;
      border: 1px solid rgba(75, 85, 99, 0.3);
    }

    :global(th) {
      background: rgba(0, 0, 0, 0.2);
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
      border-bottom: 1px solid rgba(75, 85, 99, 0.3);
    }

    :global(td) {
      padding: 0.75rem;
      border-bottom: 1px solid rgba(75, 85, 99, 0.2);
    }

    :global(tr:last-child td) {
      border-bottom: none;
    }
  }
</style>
