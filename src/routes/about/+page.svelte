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
      title: 'Professional experience',
      text: 'We want every event to feel polished, easy, and memorable from the first pour to the last.'
    },
    {
      title: 'Island-driven',
      text: 'Vancouver Island is home, and we’re proud to build something that fits the local event and craft scene.'
    },
    {
      title: 'Thoughtful details',
      text: 'From presentation to service flow, we care about the little things that make the whole setup feel elevated.'
    }
  ];
</script>

<section class="bg-bg text-fg">
  <div class="mx-auto max-w-6xl px-4 pt-44 pb-20 md:pt-44 md:pb-20">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
        About
      </p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        A mobile bar experience built for great events
      </h1>
      <p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
        Tap Truck VI was created to bring a unique, polished, and memorable draft service experience
        to weddings, private parties, corporate events, and celebrations across Vancouver Island.
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
        More than a bar setup
      </h2>
      <div class="mt-6 space-y-4 text-white/80">
        <p>
          We’re building Tap Truck VI to be more than just a way to serve drinks. The goal is to
          create a setup that adds to the atmosphere of an event and feels like part of the
          experience, not just a service station.
        </p>
        <p>
          Whether it’s a wedding, backyard celebration, staff event, or larger gathering, we want
          the truck to bring personality, quality, and a strong visual presence while keeping the
          service smooth and professional.
        </p>
        <p>
          We also care a lot about working with the local community and showcasing the quality of
          the craft scene on Vancouver Island wherever it makes sense.
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
        Founders
      </p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Why we started Tap Truck VI
      </h2>

      <div class="mt-6 space-y-5 text-base leading-8 text-fg/80">
        <p>
          Cody & I started Tap Truck VI because we wanted to build something that reflects what
          we value: great experiences, thoughtful presentation, and a real connection to the place
          we are lucky to call home.
        </p>

        <p>
          We moved to Vancouver Island over three years ago, and it quickly became clear that this
          is where we want to be long term. Then we started to think of all the things we loved most about this 
          place and how we could bring them all together and invite more people to share the island experience.
          We both love craft beer and have a real appreciation for the craft scene on the island, and
          that interest has shaped a lot of the vision for Tap Truck VI. 
        </p>

        <p>
          Our goal is to facilitate meaningful and joyous events and use these things we love about Vancouver Island 
          and use them as a catalyst for celebration, conversation, and good times. At the end of the day, we want 
          Tap Truck VI to be something people remember not just because it looks great, but because it adds to the 
          atmosphere of the event and makes any event that much more special.
        </p>

        <div class="mt-10 flex justify-end pr-6">
          <div class="w-[220px]">
            <p class="italic text-fg/70">— Adam</p>
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
        We’re creating a service that feels elevated, approachable, and memorable — something that
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