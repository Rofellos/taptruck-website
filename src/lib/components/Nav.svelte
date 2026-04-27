<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let scrolled = false;
  let menuOpen = false;

  function handleScroll() {
    scrolled = window.scrollY > 24;
  }

  onMount(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav data-sveltekit-preload-data
  class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-zinc-950/72 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
      : 'bg-black/35 backdrop-blur-md border-b border-white/5'
  }`}
>
	<div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
	<div class="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<a href="/" class="flex items-center gap-2 text-lg text-white font-semibold tracking-tight hover:opacity-90">
			<img src="/nav logo bw.svg" class="h-14 w-auto" alt="Tap Truck logo">
		</a>

		
		<!-- Desktop links -->
	<div class="hidden items-center gap-6 sm:flex">
		<a class="nav-cta" href="/about">About</a>
		<a class="nav-cta" href="/pricing">Pricing</a>
		<a class="nav-cta" href="/book">Book</a>
	</div>

	<!-- Mobile menu button -->
	<button
		type="button"
		class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--brand-secondary))] text-[rgb(var(--brand-secondary))] sm:hidden"
		on:click={() => (menuOpen = !menuOpen)}
		aria-label="Toggle navigation menu"
	>
		{#if menuOpen}
			✕
		{:else}
			☰
		{/if}
	</button>
	</div>
	{#if menuOpen}
	<div
		class="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl border border-white/10 bg-[rgb(var(--brand-primary-dark))]/95 p-2 shadow-2xl backdrop-blur-xl sm:hidden"
		transition:fly={{ y: -8, duration: 180 }}
	>
		<a href="/about" on:click={() => (menuOpen = false)} class="block rounded-xl px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10">
			About
		</a>

		<a href="/pricing" on:click={() => (menuOpen = false)} class="block rounded-xl px-4 py-3 text-sm font-semibold text-white/90 hover:bg-white/10">
			Pricing
		</a>

		<a href="/book" on:click={() => (menuOpen = false)} class="mt-1 block rounded-xl bg-[rgb(var(--brand-secondary))] px-4 py-3 text-sm font-bold text-[rgb(var(--brand-primary))] hover:opacity-90">
			Book now
		</a>
	</div>
{/if}
</nav>

