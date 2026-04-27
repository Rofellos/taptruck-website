<svelte:head>
  <title>About | Tap Truck VI</title>
  <meta
    name="description"
    content="Learn more about Tap Truck VI, our story, and what we bring to events across Vancouver Island."
  />
</svelte:head>

<script lang="ts">
  const values = [
    {
      title: 'Beautifully Simple',
      text: 'Designed to serve beautifully. Our tap truck keeps drinks flowing fast and effortlessly, while doubling as a standout feature your guests can’t help but gather around.'
    },
    {
      title: 'Full Service',
      text: 'Let us handle the mess so you can enjoy your event. We take care of the bar service from setup to cleanup and everything inbetween.'
    },
    {
      title: 'Island-driven',
      text: 'We support island made products wherever we can. Let us know what you like and we will be happy show you the best of what the island has to offer.'
    },
    
  ];
</script>

<section class="bg-bg text-fg">
  <div class="mx-auto max-w-6xl px-4 pt-36 pb-16 md:pt-36 md:pb-16">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))] text-center">
        About Us
      </p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        More Than a Bar Setup
      </h1>
      <p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
        Tap Truck brings a one of a kind mobile bar experience to weddings, private parties, corporate events, and celebrations across Vancouver Island.<br><br>
        At the center of it all is our beautifully restored vintage truck, a statement piece that serves incredible drinks and instantly elevates the atmosphere of any event.<br><br>
        From local craft beer and wine to cocktails and non alcoholic options, we help create an experience that feels seamless, memorable, and uniquely yours.<br><br>
      </p>
    </div>
  </div>
</section>

<section class="bg-[rgb(var(--brand-primary-dark))] text-white">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-secondary))]">
        What we do
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Built for Great Events
      </h2>
      <div class="mt-6 pb-4 space-y-4 text-white/80">
        <p>
          We believe service should feel polished, easy, and stress free from the first pour to the last.<br><br>
          That means thoughtful setup, professional service, smooth flow, and a setup your guests will talk about long after the event ends.
        </p>
      </div>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Proudly Vancouver Island
      </h2>
      <div class="mt-6 space-y-4 text-white/80">
        <p>
          Vancouver Island is home, and supporting the local community matters to us.<br><br>
          We love showcasing the incredible craft beverage scene here whenever possible, from local breweries to island made favourites.

        </p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
      {#each values as value}
        <div class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <h3 class="text-base font-semibold text-white">{value.title}</h3>
          <p class="mt-2 text-sm leading-6 text-white/75">{value.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="bg-bg text-fg">
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <div class="rounded-3xl border border-fg/10 bg-white/60 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
        About us
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Hi, we're Adam and Cody.
      </h2>

      <div class="mt-6 space-y-5 text-base leading-8 text-fg/80">
        <p>
          We started Tap Truck with one simple idea: create something people genuinely remember.
        </p>

        <p>
          After moving to Vancouver Island, we fell in love with the community, the events, the craft scene, and the lifestyle here. We wanted to build something that brought all of those things together.
        </p>

        <p>
          Today, Tap Truck helps turn great gatherings into unforgettable ones by combining a standout vintage truck, quality drinks, and an experience guests instantly connect with.
        </p>

        <div class="mt-10 flex justify-end pr-6">
          <div class="w-[220px]">
            <p class="italic text-fg/70">- Adam</p>
            <p class="text-sm text-fg/50">Co-founder, Tap Truck VI</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-[rgb(var(--brand-secondary))]/15 text-fg">
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Built for weddings, parties, and standout gatherings
      </h2>
      <p class="mt-4 text-base leading-7 text-fg/75 sm:text-lg">
        We’re creating a service that feels elevated, approachable, and memorable - something that
        fits naturally into events where atmosphere matters.
      </p>

      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="/book"
          class="btn btn-primary w-full sm:w-auto"
        >
          Book now
        </a>

        <!-- <a
          href="/pricing"
          class="btn btn-outline w-full sm:w-auto"
        >
          View pricing
        </a> -->
      </div>
    </div>
  </div>
</section>