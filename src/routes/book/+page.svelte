<script lang="ts">
  import { enhance } from '$app/forms';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { page } from '$app/stores';

  import Turnstile from '$lib/components/Turnstile.svelte';

  let turnstileToken = '';
</script>


<div class="mx-auto max-w-3xl px-4 py-12">
  <div class="mb-8">
    <h1 class="text-4xl font-bold tracking-tight">Book the Tap Truck</h1>
    <p class="mt-2 text-gray-600">
      Tell us about your event and we’ll reply with availability and a quote.
    </p>
  </div>

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
          placeholder="Wedding / birthday / corporate… timing, venue notes, number of taps, etc."
        />
      </div>

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

