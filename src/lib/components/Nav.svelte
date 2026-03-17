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

<nav
  class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? 'bg-zinc-950/72 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.28)]'
      : 'bg-black/35 backdrop-blur-md border-b border-white/5'
  }`}
>
	<div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
		<a href="/" class="flex items-center gap-2 text-lg text-[rgb(var(--bg))] font-semibold tracking-tight hover:opacity-90">
			<img src="/Tap OONN Truck Logo.png" class="h-12 w-auto invert sepia saturate-[600%] hue-rotate-[15deg] brightness-[105%" alt="Tap Truck logo">
		</a>

		
		<div class="flex items-center gap-6">
			<a
				href="/about"
				class="nav-cta"
			>
				About
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

