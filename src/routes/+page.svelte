<script lang="ts">
  import GiveawayPopup from '$lib/components/GiveawayPopup.svelte';
</script>

<svelte:head>
	<link rel="preload" as="image" href="/Truck_on_grass.jpg" />
</svelte:head>

<GiveawayPopup />

<!-- HERO SECTION -->

<!-- MOBILE HERO -->
<section class="relative h-[360px] overflow-hidden sm:hidden">
	<img
		src="/Truck_on_grass.jpg"
		alt="Tap Truck at an event"
		class="h-full w-full object-cover object-[50%_65%]"
	/>
	<div class="absolute inset-0 bg-black/10"></div>
</section>
<section class="text-center bg-[rgb(var(--bg))] px-5 pt-4 text-[rgb(var(--fg))] sm:hidden">
	<div class="mx-auto max-w-md">
		<h1 class="text-4xl font-extrabold tracking-tight">
			A Bar Worth<br />Gathering Around.
		</h1>
	</div>
</section>

<!-- DESKTOP/TABLET HERO -->

<section class="relative hidden w-full overflow-hidden sm:block sm:min-h-[52vh] md:min-h-[80vh] lg:min-h-[90vh]">
	<img
		src="/Truck_on_grass.jpg"
		alt="Tap Truck at an event"
		loading="eager"
		fetchpriority="high"
		class="absolute inset-0 h-full w-full object-cover sm:object-[30%_20%] lg:object-[center_55%]"
	/>

	<div class="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

	<div class="relative mx-auto flex max-w-6xl items-start px-4 py-24 md:py-64 md:min-h-[60vh] lg:min-h-[60vh]">
		<div class="max-w-lg pt-8">
			<h1 class="text-6xl font-extrabold tracking-tight text-white">
				A Bar Worth <br> Gathering Around.
			</h1>
		</div>
	</div>
</section>

<!-- MAIN PAGE CONTENT SECTION -->

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
        or a memorable private celebration, our Tap Truck brings a unique service experience
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
          A polished draught service setup that complements the atmosphere of your wedding and
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
