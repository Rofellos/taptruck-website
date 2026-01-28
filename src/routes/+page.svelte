<!-- src/routes/+page.svelte -->
<section class="relative w-full overflow-hidden">
  <!-- Background image -->
  <img
    src="/hero.jpg"
    alt="Tap Truck at an event"
    class="absolute inset-0 h-full w-full object-cover"
  />

  <!-- Dark overlay + gradient for readability -->
  <div class="absolute inset-0 bg-black/50"></div>
  <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-bg/95"></div>

  <!-- Content -->
  <div class="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
    <div class="max-w-2xl">
      <p class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
        Vancouver Island • Mobile Tap Service
      </p>

      <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Bring the bar to your event.
      </h1>

      <p class="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
        Tap Truck VI delivers a premium mobile tap setup for weddings, corporate events, and festivals
        across Vancouver Island.
      </p>

      <!-- CTAs -->
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/book"
          class="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          Check availability
        </a>

        <a
          href="/pricing"
          class="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
        >
          View pricing
        </a>
      </div>

      <!-- Trust row -->
      <div class="mt-10 grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Professional setup
        </div>
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Fast service + clean pour
        </div>
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Vancouver Island coverage
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Next section spacer (optional) -->
<section class="mx-auto max-w-6xl px-4 py-14">
  <h2 class="text-2xl font-bold text-fg">How it works</h2>
  <p class="mt-2 text-fg/70">We’ll build this section next.</p>
</section>
