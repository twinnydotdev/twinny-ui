<script lang="ts">
  import { reveal } from '$lib/reveal'

  // Muted autoplay while the section is on screen, paused when it is not. Nothing but the poster
  // loads before then. Reduced motion or Save-Data gets a play button instead, and a viewer who
  // pauses it is not overruled by scrolling back.
  let video: HTMLVideoElement
  let started = $state(false)
  let auto = $state(false)
  let userPaused = false
  let ourPause = false

  $effect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData
    if (reduce || saveData) return
    auto = true
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!userPaused) video.play().catch(() => {})
        } else if (!video.paused) {
          ourPause = true
          video.pause()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(video)
    return () => io.disconnect()
  })

  function onpause() {
    if (!ourPause) userPaused = true
    ourPause = false
  }

  function play() {
    started = true
    userPaused = false
    video.play()
  }
</script>

<section class="section" id="watch">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">in 30 seconds</span>
        <h2>Where your code goes, and what it does.</h2>
      </div>
      <p>
        Where your code goes, autocomplete, inline edit, chat, and the gateway for teams. It has
        music; the sound is off until you turn it on.
      </p>
    </div>
    <div class="frame" use:reveal={0}>
      <video
        bind:this={video}
        poster="/promo/poster-home.jpg"
        width="1280"
        height="720"
        preload="none"
        playsinline
        muted
        loop
        controls={started || auto}
        onplay={() => {
          started = true
          userPaused = false
        }}
        {onpause}
        aria-label="A 30-second film about twinny: where your code goes, autocomplete, inline edit, chat and the team gateway"
      >
        <source src="/promo/promo-home-720.mp4" type="video/mp4" />
        <source src="/promo/promo-home-720.webm" type="video/webm" />
      </video>
      {#if !started && !auto}
        <button class="play" onclick={play}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          play <span class="num">0:30</span>
        </button>
      {/if}
    </div>
  </div>
</section>

<style>
  .frame {
    position: relative;
    border: 1px solid var(--line);
    border-radius: var(--r);
    overflow: hidden;
    background: var(--bg);
  }
  video {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    font-family: var(--mono);
    font-size: var(--fs-sm);
    color: var(--accent-ink);
    background: var(--accent);
    border: 1px solid var(--accent);
    border-radius: var(--r);
    cursor: pointer;
  }
  .play:hover {
    background: #33e09a;
  }
  .play:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
  }
  .play svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
  .play .num {
    opacity: 0.7;
  }
</style>
