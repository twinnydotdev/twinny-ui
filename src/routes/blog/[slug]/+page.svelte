<script lang="ts">
  import { t } from '$lib/translations'
  export let data
</script>

<div class="min-h-screen">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
    <a href="/blog" class="text-white hover:text-gray-300">
      {$t('common.back_to_blog')}
    </a>
    <div class="mt-4 flex justify-end">
      <time datetime={data.date}>
        {new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
    </div>
    <div class="blog-content">
      {@html data.html}
    </div>
  </div>
</div>

<style>
  :global(.blog-content) {
    /* Content spacing */
    :global(> * + *) {
      margin-top: 1.5rem;
    }

    /* Code blocks */
    :global(pre) {
      background: #171717;
      padding: 1.25rem;
      border-radius: 0.5rem;
      margin: 1.5rem 0;
      overflow-x: auto;
      width: 100%;
      max-width: calc(100vw - 2rem); /* Prevent horizontal overflow */
    }

    :global(pre code) {
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      tab-size: 2;
      white-space: pre;         /* Changed from pre-wrap */
      word-wrap: normal;        /* Added */
      word-break: normal;       /* Added */
      -webkit-overflow-scrolling: touch; /* Added for smooth mobile scrolling */
    }

    /* Make code blocks responsive */
    @media (max-width: 640px) {
      :global(pre) {
        margin-left: -1rem;
        margin-right: -1rem;
        border-radius: 0;
        padding: 1rem;
      }

      :global(pre code) {
        font-size: 0.8125rem; /* Slightly smaller font on mobile */
      }
    }

    /* Rest of your styles remain the same */
    /* Syntax highlighting colors */
    :global(.hljs-keyword) { color: #eb6f92; }
    :global(.hljs-string) { color: #f6c177; }
    :global(.hljs-comment) { color: #6e6a86; }
    :global(.hljs-function) { color: #9ccfd8; }
    :global(.hljs-number) { color: #c4a7e7; }
    :global(.hljs-class) { color: #31748f; }
    :global(.hljs-title) { color: #ebbcba; }

    :global(pre code.hljs) {
      display: block;
      padding: 0.5rem;
    }

    /* Headers with improved mobile spacing */
    :global(h1) {
      font-size: clamp(1.75rem, 5vw, 2.25rem); /* Responsive font size */
      font-weight: 600;
      margin: 2rem 0 1.5rem 0;
      color: #fff;
      line-height: 1.2;
    }

    :global(h2) {
      font-size: clamp(1.25rem, 4vw, 1.45rem);
      font-weight: 600;
      margin: 2rem 0 1.25rem 0;
      color: #fff;
      line-height: 1.3;
    }

    :global(h3) {
      font-size: clamp(1.1rem, 3.5vw, 1.3rem);
      font-weight: 600;
      margin: 1.75rem 0 1rem 0;
      color: #fff;
      line-height: 1.4;
    }

    /* Paragraphs with improved readability */
    :global(p) {
      margin: 1.25rem 0;
      line-height: 1.75;
      color: #9ca3af;
      max-width: 65ch; /* Optimal reading width */
    }

    /* Inline code with better mobile handling */
    :global(code:not(pre code)) {
      background: #1f1d2e;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      color: #ebbcba;
      word-break: break-word; /* Added for better mobile wrapping */
    }

    /* Lists with improved mobile spacing */
    :global(ul),
    :global(ol) {
      margin: 1.25rem 0 1.25rem 1.5rem;
      color: #9ca3af;
      padding-right: 1rem; /* Added for better mobile spacing */
    }

    :global(li) {
      margin: 0.5rem 0;
      line-height: 1.6;
      list-style: disc;
    }

    :global(ol > li) {
      list-style: decimal;
    }

    :global(li > strong) {
      color: #fff;
    }

    /* Links with better tap targets on mobile */
    :global(a) {
      color: #9ccfd8;
      text-decoration: none;
      border-bottom: 1px solid #9ccfd8;
      transition: opacity 0.2s ease;
      padding: 0.125rem 0; /* Added for better tap targets */
    }

    :global(a:hover) {
      opacity: 0.8;
    }

    /* Rest of your styles remain unchanged */
  }
</style>
```
