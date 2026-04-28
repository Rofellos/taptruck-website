<svelte:head>
  <title>Thank You | Tap Truck VI</title>
  <meta
    name="description"
    content="Thanks for reaching out to Tap Truck VI. We’ve received your inquiry and will be in touch soon."
  />
</svelte:head>

<script>
  const phoneNumber = "(437) 350-0049";
  const phoneHref = "tel:+14373500049";
  import { onMount } from 'svelte';

  onMount(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  });
</script>

<section class="bg-stone-50 px-6 pt-36 pb-24 text-stone-900">
  <div class="mx-auto max-w-4xl">
    <div class="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black/5 sm:p-12">
      <div class="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-900">
        Inquiry received
      </div>

      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
        Thanks — we got your inquiry.
      </h1>

      <p class="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
        We’ve received your event details and will be in touch soon to go over availability,
        logistics, and next steps.
      </p>

      <div class="mt-10 grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl bg-stone-100 p-5">
          <p class="text-sm font-medium uppercase tracking-wide text-stone-500">Step 1</p>
          <p class="mt-2 font-medium">We review your inquiry</p>
        </div>

        <div class="rounded-2xl bg-stone-100 p-5">
          <p class="text-sm font-medium uppercase tracking-wide text-stone-500">Step 2</p>
          <p class="mt-2 font-medium">We reach out to confirm details</p>
        </div>

        <div class="rounded-2xl bg-stone-100 p-5">
          <p class="text-sm font-medium uppercase tracking-wide text-stone-500">Step 3</p>
          <p class="mt-2 font-medium">You get a clear quote</p>
        </div>
      </div>

      <div class="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-stone-500">
          Need an answer faster?
        </p>
        <p class="mt-2 text-stone-700">
          Call or text us and we’ll do our best to help right away.
        </p>

        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <a
            href={phoneHref}
            class="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 font-medium text-white hover:bg-stone-800"
          >
            Call / Text {phoneNumber}
          </a>

          <a
            href="/"
            class="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-5 py-3 font-medium text-stone-900 hover:bg-stone-100"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
</section>