<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<Nav />

<main class="min-h-[70vh] bg-bg text-fg py-12 sm:py-14 md:py-16">
  {@render children()}
</main>

<Footer />
