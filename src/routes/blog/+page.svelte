<script lang="ts">
  import { t } from '$lib/translations'
  export let data
</script>

<div class="min-h-screen bg-stone-900 text-stone-100 p-6">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
    <h1 class="text-4xl font-bold text-white mb-14">
      {$t('common.blog_title')}
    </h1>

    <div class="space-y-12">
      {#each data.posts as post, i}
        <article>
          <h2 class="text-2xl font-bold mb-4">
            <a href="/blog/{post.slug}" class="text-white">
              {post.title}
            </a>
          </h2>

          <p class="text-[#666666] text-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div class="flex items-center text-sm text-[#444444] font-mono">
            <time datetime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span class="mx-3">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
