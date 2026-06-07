<script lang="ts" context="module">
  // Single source of truth for all FAQ content. The visible accordion and the
  // FAQPage JSON-LD schema are both generated from this array, so they can
  // never drift out of sync.
  export const faqs = [
    {
      q: "What is Tap Truck Vancouver Island?",
      a: "Tap Truck Vancouver Island is a vintage 1932 mobile bar tap truck available for hire at weddings, private events, and corporate functions across Vancouver Island and the Vancouver's Lower Mainland. The truck is a fully restored vintage vehicle with a custom wood-panelled draught bar serving craft beer, cider, wine, cocktails, and non-alcoholic options on tap - delivered directly to your event."
    },
    {
      q: "What areas does Tap Truck VI serve?",
      a: "We serve all of Vancouver Island including Victoria, Saanich, Langford, Oak Bay, Sidney, Sooke, Duncan, Cowichan Valley, Nanaimo, Parksville, Comox, and Courtenay. We also serve locations in and around the Lower Mainland, such as Vancouver, Burnaby, Langley, Richmond, North Vancouver, West Vancouver, and Surrey. Travel within Greater Victoria is included in all packages. Events further afield are subject to a per-kilometre travel fee quoted on request."
    },
    {
      q: "What drinks can go on tap?",
      a: "Tap Truck VI can serve craft beer, cider, wine, Prosecco, cocktails, mocktails, kombucha, craft soda, and sparkling water. We love showcasing Vancouver Island craft beverages and can work with local breweries and producers. Custom signature cocktails named after your event are also available as an add-on."
    },
    {
      q: "How much does it cost to hire Tap Truck VI?",
      a: "Wedding packages start at \$1,800 + GST for up to 4 hours of service. Private event packages start at \$800 + GST for up to 2 hours. Our most popular wedding package - the Tap Truck Signature - is \$2,400 + GST and includes 6 hours, four tap beverages, and two licensed bartenders. See our pricing page for full details."
    },
    {
      q: "Does Tap Truck VI require a liquor permit?",
      a: "Most private events in BC require a Special Event Permit (SEP). We can manage the entire liquor permitting process on your behalf as an add-on service - we handle the SEP application so it's one less thing on your plate. Note: The SEP holder is responsible for the purchase of alcohol, so in this case we would provide alcohol and include this to your event invoice."
    },
    {
      q: "How far in advance should I book?",
      a: "As early as possible - especially for summer dates on Vancouver Island. Popular weekends from May through September fill up fast. For weddings, 6 to 12 months in advance is ideal to secure your preferred date. We recommend applying for liquor licensing at least 4 to 6 weeks ahead of any event you would like to serve alcohol at. (excluding private property)"
    },
    {
      q: "What is the vintage truck at Tap Truck VI?",
      a: "The truck is a custom-built 1932 Chevrolet that has been fully restored and converted into a mobile bar, complete with a custom wood-panelled tap bar and multiple tap handles. It's a genuine conversation piece - guests love gathering around it."
    },
    {
      q: "Can Tap Truck VI come to a backyard or private property?",
      a: "Absolutely. We can come to private properties, backyards, farms, vineyards, and any accessible location on Vancouver Island. We just need enough clearance for the truck to access the site. Reach out with your venue details and we'll confirm access requirements."
    },
    {
      q: "Does Tap Truck VI need power or water hookups?",
      a: "No. We're fully self-contained. We bring all tap equipment, ice, keg cooling, bar tools, and serving essentials - no external power or water hookups required."
    },
    {
      q: "How do I book Tap Truck VI for my event?",
      a: "Submit a booking inquiry through our Book page. Share your event date, location, approximate guest count, and what you're envisioning - we'll get back to you quickly to confirm availability and find the right package."
    },
    {
      q: "Do you provide the alcohol?",
      a: "Package prices include service only. Clients supply their own beverages, which means you can buy exactly what you love and return what you don't, with no markup. The person named on the Special Event Permit (SEP) is required to purchase the alcohol. If you'd like us to handle the permitting, just let us know - alcohol cost is separate from the selected service package."
    }
  ];

  // Build FAQPage schema from the same array used for the visible accordion.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
</script>

<script lang="ts">
  let openIndex: number | null = null;

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<svelte:head>
  <title>FAQ | Mobile Bar Victoria BC | Tap Truck Vancouver Island</title>
  <meta
    name="description"
    content="Frequently asked questions about Tap Truck VI — Vancouver Island's mobile bar tap truck. How it works, what's on tap, service areas, pricing, and booking for weddings and events in Victoria BC."
  />
  <meta property="og:title" content="FAQ | Tap Truck Vancouver Island Mobile Bar" />
  <meta property="og:description" content="Everything you need to know about booking a mobile bar tap truck for your Victoria BC wedding or event." />
  <link rel="canonical" href="https://taptruckvi.ca/faq" />
  <!-- FAQPage schema, generated from the faqs array so it always matches the visible content -->
  {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}<\/script>`}
</svelte:head>

<section class="bg-bg text-fg">
  <div class="mx-auto max-w-4xl px-4 pt-36 pb-20">

    <div class="text-center mb-10">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
        FAQ
      </p>
      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Frequently Asked Questions
      </h1>
      <p class="mt-4 text-base leading-7 text-fg/70 sm:text-lg max-w-2xl mx-auto">
        Everything you need to know about booking a mobile bar tap truck for your Victoria BC wedding or event.
      </p>
    </div>

    <div class="space-y-3">
      {#each faqs as faq, i}
        <div class="rounded-2xl border border-fg/10 bg-white/70 overflow-hidden">
          <button
            type="button"
            class="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[rgb(var(--brand-primary))] hover:bg-fg/5 transition"
            on:click={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span>{faq.q}</span>
            <span class="ml-4 shrink-0 text-[rgb(var(--brand-accent))] transition-transform duration-200 {openIndex === i ? 'rotate-180' : ''}">↓</span>
          </button>
          <!--
            The answer is ALWAYS rendered in the HTML (present for crawlers, AI,
            and screen readers). The accordion only toggles its visibility via a
            CSS class - it is never removed from the DOM.
          -->
          <div
            id={`faq-answer-${i}`}
            class="px-6 text-sm leading-7 text-fg/75 overflow-hidden transition-all duration-200 {openIndex === i ? 'max-h-[40rem] pt-2 pb-5 opacity-100' : 'max-h-0 pt-0 pb-0 opacity-0'}"
          >
            {faq.a}
          </div>
        </div>
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="mt-16 text-center">
      <p class="text-fg/60 text-base">Still have questions?</p>
      <div class="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          class="rounded-full border-2 border-[rgb(var(--brand-primary))] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[rgb(var(--brand-primary))] transition hover:bg-[rgb(var(--brand-primary))] hover:text-white"
        >
          Contact Us
        </a>
        <a
          href="/book"
          class="rounded-full bg-[rgb(var(--brand-accent))] px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:opacity-90"
        >
          Check Your Date
        </a>
      </div>
    </div>

  </div>
</section>

<!-- Service Areas section for SEO -->
<section class="bg-[rgb(var(--brand-primary-dark))] text-white">
  <div class="mx-auto max-w-4xl px-4 py-12 text-center">
    <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
      Mobile Bar Service Across Vancouver Island
    </h2>
    <p class="mt-4 text-white/70 text-base leading-7 max-w-2xl mx-auto">
      Tap Truck VI serves Victoria to Campbell River, and everywhere in between. If you're on Vancouver Island, we can be there. <br><br>Feel free to reach out for inquiries on the Lower Mainland as well!
    </p>
    <a
      href="/book"
      class="mt-8 inline-flex items-center justify-center rounded-2xl bg-[rgb(var(--brand-secondary))] px-10 py-4 text-base font-bold text-[rgb(var(--brand-primary-dark))] transition hover:opacity-90"
    >
      Check availability →
    </a>
  </div>
</section>
