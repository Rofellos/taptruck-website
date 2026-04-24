<script lang="ts">
	import { onMount } from 'svelte';

	let show = false;

	const STORAGE_KEY = 'taptruck-cookie-consent-v1';

	onMount(() => {
		show = localStorage.getItem(STORAGE_KEY) !== 'accepted';
	});

	function acceptCookies() {
		localStorage.setItem(STORAGE_KEY, 'accepted');
		show = false;
	}
</script>

{#if show}
	<div class="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6">
		<div class="mx-auto max-w-5xl rounded-3xl border border-black/10 bg-[rgb(var(--bg))] p-5 shadow-2xl sm:flex sm:items-center sm:justify-between sm:gap-6">
			<div>
				<p class="text-sm font-semibold text-[rgb(var(--brand-primary))]">
					Cookies & analytics
				</p>

				<p class="mt-1 text-sm leading-6 text-fg/70">
					We use cookies and tools like Google Analytics and Meta Pixel to improve the site,
					understand traffic, and support marketing.
				</p>
			</div>

			<div class="mt-4 flex shrink-0 gap-3 sm:mt-0">
				<a
					href="/privacy"
					class="inline-flex items-center justify-center rounded-xl border border-fg/15 px-4 py-2 text-sm font-semibold text-fg/75 transition hover:bg-black/5"
				>
					Learn more
				</a>

				<button
					type="button"
					on:click={acceptCookies}
					class="inline-flex items-center justify-center rounded-xl bg-[rgb(var(--brand-accent))] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
				>
					Accept
				</button>
			</div>
		</div>
	</div>
{/if}