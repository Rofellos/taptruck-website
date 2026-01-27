<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<Nav />

<main class="min-h-[70vh]">
  {@render children()}
</main>

<Footer />
