
<!-- src/routes/+page.svelte -->
<section class="relative w-full overflow-hidden min-h-[45vh] sm:min-h-[52vh] lg:min-h-[60vh]">
  <!-- Background image -->
  <img
    src="/teaser_photo.jpg"
    alt="Tap Truck at an event"
    class="absolute inset-0 h-full w-full object-cover object-[60%_60%] sm:object-[30%_20%] lg:object-[center_22%]"
  />

  <!-- Dark overlay + gradient for readability -->
  <!-- <div class="absolute inset-0 bg-black/50"></div> -->
  <div class="absolute inset-0 bg-black/70 lg:hidden"></div>
  <div class="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

  <!-- Content -->
  <div class="relative mx-auto flex min-h-[40vh] max-w-6xl items-center px-4 py-12 pt-32 md:min-h-[60h] lg:min-h-[100vh] lg:py-20">
    <div class="max-w-2xl ">
    
      <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
        Bring the bar to your event.
      </h1>
      

      <p class="mt-4 text-base leading-relaxed text-white/85 lg:text-lg">
        Our mission at Tap Truck VI is to provide a premium mobile tap setup for weddings, corporate events, and festivals
        across Vancouver Island and the Lower Mainland.<br /><br/>
        
        We are in the process of preparing the Tap Truck for our first season, but we are open to inquiries and early bookings. 
      </p>

      <!-- CTAs -->
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/book"
          class="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
        >
          Check Availability
        </a>
      </div>

      <!-- Trust row -->
      <!-- <div class="mt-10 grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Professional setup
        </div>
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Fast service + clean pour
        </div>
        <div class="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
          ✅ Vancouver Island coverage
        </div>
      </div> -->
    </div>
  </div>
</section>

<section class="bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
        Built for events that matter
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        A mobile bar experience tailored to the occasion
      </h2>
      <p class="mt-4 text-base leading-7 text-[rgb(var(--fg))]/75 sm:text-lg">
        Whether you’re planning an elegant wedding, a polished corporate gathering,
        or a memorable private celebration, Tap Truck VI brings a unique service experience
        that adds to the atmosphere and keeps things running smoothly.
      </p>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article class="group rounded-3xl border border-[rgb(var(--brand-primary))]/15 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="inline-flex rounded-full bg-[rgb(var(--brand-secondary))]/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[rgb(var(--brand-accent))]">
          Weddings
        </div>

        <h3 class="mt-5 text-2xl font-semibold tracking-tight text-[rgb(var(--brand-primary))]">
          Elevated and memorable
        </h3>

        <p class="mt-3 text-sm leading-7 text-[rgb(var(--fg))]/75">
          A polished draft service setup that complements the atmosphere of your wedding and
          creates a guest experience that feels thoughtful, unique, and easy to enjoy.
        </p>

        <!-- <a
          href="/book"
          class="mt-6 inline-flex items-center text-sm font-semibold text-[rgb(var(--brand-accent))] transition group-hover:translate-x-1"
        >
          Book your date
          <span class="ml-2">→</span>
        </a> -->
      </article>

      <article class="group rounded-3xl border border-[rgb(var(--brand-primary))]/15 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="inline-flex rounded-full bg-[rgb(var(--brand-secondary))]/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[rgb(var(--brand-accent))]">
          Corporate Events
        </div>

        <h3 class="mt-5 text-2xl font-semibold tracking-tight text-[rgb(var(--brand-primary))]">
          Professional with personality
        </h3>

        <p class="mt-3 text-sm leading-7 text-[rgb(var(--fg))]/75">
          Perfect for staff events, client gatherings, launches, and brand-forward occasions
          where presentation matters and the service should feel both smooth and standout.
        </p>

        <!-- <a
          href="/pricing"
          class="mt-6 inline-flex items-center text-sm font-semibold text-[rgb(var(--brand-accent))] transition group-hover:translate-x-1"
        >
          View options
          <span class="ml-2">→</span>
        </a> -->
      </article>

      <article class="group rounded-3xl border border-[rgb(var(--brand-primary))]/15 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="inline-flex rounded-full bg-[rgb(var(--brand-secondary))]/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[rgb(var(--brand-accent))]">
          Private Celebrations
        </div>

        <h3 class="mt-5 text-2xl font-semibold tracking-tight text-[rgb(var(--brand-primary))]">
          Built for good times
        </h3>

        <p class="mt-3 text-sm leading-7 text-[rgb(var(--fg))]/75">
          From birthdays and anniversaries to backyard parties and other special gatherings,
          the truck adds a memorable focal point and a premium feel to the event.
        </p>

        <!-- <a
          href="/about"
          class="mt-6 inline-flex items-center text-sm font-semibold text-[rgb(var(--brand-accent))] transition group-hover:translate-x-1"
        >
          Learn more
          <span class="ml-2">→</span>
        </a> -->
      </article>
    </div>
  </div>
</section>

<!-- Next section spacer (optional)
<section class="mx-auto max-w-6xl px-4 py-14">
  <h2 class="text-2xl font-bold text-fg">How it works</h2>
  <p class="mt-2 text-fg/70">We’ll build this section next.</p>
</section> -->
