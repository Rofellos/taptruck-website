<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CookieBanner from '$lib/components/CookieBanner.svelte';

  let { children } = $props();

  import { afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  let firstNavigation = true;

  if (browser) {
    afterNavigate(() => {
      if (firstNavigation) {
        firstNavigation = false;
        return;
      }

      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    });
  }
</script>

<svelte:head>
  <!-- CLOUDFLARE TURNSTILE -->
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script> 
</svelte:head>

<Nav />

<main class="min-h-[70vh] bg-bg text-fg">
  {@render children()}
</main>

<Footer />
<CookieBanner />