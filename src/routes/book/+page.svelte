<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import Turnstile from '$lib/components/Turnstile.svelte';
  import { trackEvent } from '$lib/utils/analytics';

  onMount(() => {
    if (browser && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Booking Page'
      });
    }
  });

  let turnstileToken = '';

  // TRACK SUCCESS ONLY ONCE PER SUCCESSFUL SUBMISSION
	let bookingTracked = false;

	$: if (browser && $page.form?.success && !bookingTracked) {
		// GOOGLE ANALYTICS
    trackEvent('booking_inquiry_submit', {
			event_category: 'engagement',
			event_label: 'book_page'
		});

		if ($page.form?.newsletterOptIn) {
			trackEvent('newsletter_signup', {
				event_category: 'engagement',
				event_label: 'booking_form_opt_in'
			});
		}

    // META PIXEL 
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Booking Form'
      });
    }
		bookingTracked = true;
	}

  // RESET GUARD WHEN FORM IS NO LONGER IN SUCCESS STATE
	$: if (!$page.form?.success) {
		bookingTracked = false;
	}
</script>

<div class="mx-auto max-w-6xl px-4 pt-24 pb-10 md:pt-24 md:pb-10">
  <section class="bg-bg text-fg">
  <div class="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:px-8 lg:pt-24 lg:pb-14">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
        Book
      </p>

      <h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Book the Tap Truck
      </h1>

      <p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
        Tell us about your event and we’ll get back to you with availability, details, and a quote.
      </p>
    </div>
  </div>
</section>

  {#if $page.form?.success}
    <div class="rounded-2xl border p-6 shadow-sm">
      <h2 class="text-xl font-semibold">Inquiry sent ✅</h2>
      <p class="mt-2 text-gray-600">
        Thanks — we’ve received your details and will email you back soon.
      </p>
      <a class="mt-4 inline-block underline" href="/">Back to home</a>
    </div>
  {:else}
    <form method="POST" class="space-y-6 rounded-2xl border p-6 shadow-sm" use:enhance>
      {#if $page.form?.message}
        <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {$page.form.message}
        </div>
      {/if}

      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="text-sm font-medium" for="name">Name</label>
          <input
            id="name"
            name="name"
            required
            class="mt-1 w-full rounded-lg border px-3 py-2"
            autocomplete="name"
          />
        </div>

        <div>
          <label class="text-sm font-medium" for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            class="mt-1 w-full rounded-lg border px-3 py-2"
            autocomplete="email"
          />
        </div>

        <div>
          <label class="text-sm font-medium" for="phone">Phone (optional)</label>
          <input
            id="phone"
            name="phone"
            class="mt-1 w-full rounded-lg border px-3 py-2"
            autocomplete="tel"
          />
        </div>

        <div>
          <label class="text-sm font-medium" for="date">Event date</label>
          <input id="date" name="date" type="date" required class="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label class="text-sm font-medium" for="location">Location</label>
          <input
            id="location"
            name="location"
            required
            class="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Victoria, Nanaimo, Tofino…"
          />
        </div>

        <div>
          <label class="text-sm font-medium" for="guests">Approx. guests</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            required
            class="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 80"
          />
        </div>
      </div>

      <div>
        <label class="text-sm font-medium" for="details">Event details</label>
        <textarea
          id="details"
          name="details"
          rows="5"
          required
          class="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="Wedding / birthday / corporate… timing, venue notes, beverage preferences, etc."
        />
      </div>

      <!-- EMAIL SUBSCRIPTION CHECKBOX -->

      <label class="flex items-start gap-3 text-sm text-fg/75">
        <input
          type="checkbox"
          name="newsletterOptIn"
          value="yes"
          class="mt-1 h-4 w-4 rounded border-fg/30 text-[rgb(var(--brand-accent))] focus:ring-[rgb(var(--brand-accent))]"
        />
        <span>Sign me up for for updates, newsletters and promotions from Tap Truck VI.</span>
      </label>

      <!-- Honeypot (bots fill this; humans won’t) -->
      <input name="company" class="hidden" tabindex="-1" autocomplete="off" />
      
      <!-- Turnstile -->
      {#key $page.url.pathname}
        <Turnstile
          siteKey={PUBLIC_TURNSTILE_SITE_KEY}
          bind:token={turnstileToken}
        />
      {/key}

      <input type="hidden" name="turnstileToken" value={turnstileToken} />

      <button
        type="submit"
        class="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
      >
        Send inquiry
      </button>

      <p class="text-xs text-gray-500">We’ll reply within 1–2 business days.</p>
    </form>
  {/if}
</div>

