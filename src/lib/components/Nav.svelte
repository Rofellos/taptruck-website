<script>
  import { onMount } from 'svelte';

  let scrolled = false;

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
	<div class="mx-auto flex max-w-6xl items-center justify-between px-8 py-2">
		<a href="/" class="flex items-center gap-2 text-lg text-white font-semibold tracking-tight hover:opacity-90">
			<img src="/nav logo bw.svg" class="h-14 w-auto" alt="Tap Truck logo">
		</a>

		
		<div class="flex items-center gap-6">
			<a
				href="/about"
				class="nav-cta"
			>
				About
			</a>
			<a
				href="/pricing"
				class="nav-cta"
			>
				Pricing
			</a>
			<a
				href="/book"
				class="nav-cta"
			>
				Book
			</a>
		</div>
	</div>
</nav>

