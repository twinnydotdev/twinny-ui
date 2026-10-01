<svelte:head>
  <title>promo — twinny</title>
  <meta name="robots" content="noindex" />
  <meta name="description" content="Thirty seconds on where your code goes with twinny: nowhere." />
</svelte:head>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="label">promo</span>
        <h2>Where does your code go? Nowhere.</h2>
      </div>
      <p>
        Thirty seconds on autocomplete, inline edit, chat, where the request goes and the team
        gateway. Fifteen bars at 120 BPM, every frame computed from time by one HTML page.
      </p>
    </div>
    <div class="frame">
      <!-- svelte-ignore a11y_media_has_caption -->
      <video
        src="/promo/promo.mp4"
        poster="/promo/poster.jpg"
        controls
        playsinline
        preload="metadata"
      ></video>
    </div>
    <div class="actions">
      <a class="btn primary" href="/promo/promo.mp4" download>download mp4</a>
      <a class="btn" href="/promo/scene.html" target="_blank" rel="noopener">open the live scene</a>
    </div>
  </div>
</section>

<style>
  .frame {
    border: 1px solid var(--line);
    border-radius: var(--r);
    overflow: hidden;
  }
  video {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    background: var(--bg);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }
</style>
