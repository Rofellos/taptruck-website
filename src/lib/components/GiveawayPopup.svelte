<script lang="ts">
	import { onMount } from 'svelte';
	import { trackEvent } from '$lib/utils/analytics';

	let open = false;
	let email = '';
	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let message = '';

	const STORAGE_KEY = 'taptruck-giveaway-dismissed-v1';
	const SHOW_DELAY = 3000;

	onMount(() => {
		const dismissed = localStorage.getItem(STORAGE_KEY);
		if (dismissed) return;

		const timer = setTimeout(() => {
			open = true;

			trackEvent('giveaway_popup_view', {
				event_category: 'engagement',
				event_label: 'homepage_popup'
			});
		}, SHOW_DELAY);

		return () => clearTimeout(timer);
	});

	function closePopup() {
		open = false;
		localStorage.setItem(STORAGE_KEY, 'true');

		trackEvent('giveaway_popup_close', {
			event_category: 'engagement',
			event_label: 'homepage_popup'
		});
	}

	async function submitGiveaway(event: SubmitEvent) {
		event.preventDefault();

		status = 'loading';
		message = '';

		const formData = new FormData();
		formData.set('email', email);
		formData.set('company', '');

		try {
			const response = await fetch('/giveaway', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (!response.ok || !result.ok) {
				status = 'error';
				message = result.error ?? 'Something went wrong.';
				return;
			}

			status = 'success';
			message = "You're in — good luck!";
			email = '';

			trackEvent('giveaway_signup', {
				event_category: 'engagement',
				event_label: 'homepage_popup'
			});

			if (typeof window !== 'undefined' && window.fbq) {
				window.fbq('track', 'CompleteRegistration');
			}

			localStorage.setItem(STORAGE_KEY, 'true');
		} catch {
			status = 'error';
			message = 'Network error. Please try again.';
		}
	}
</script>

{#if open}
	<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
		<div
			class="relative w-full max-w-md rounded-3xl border border-black/10 bg-[rgb(var(--bg))] p-6 shadow-2xl sm:p-8"
		>
			<button
				type="button"
				on:click={closePopup}
				class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[rgb(var(--brand-primary))]/60 transition hover:bg-black/5 hover:text-[rgb(var(--brand-primary))]"
				aria-label="Close giveaway popup"
			>
				✕
			</button>

			<div class="pr-10">
				<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
					Giveaway
				</p>

				<h2 class="mt-3 text-3xl font-bold tracking-tight text-[rgb(var(--brand-primary))] sm:text-4xl">
					Win a Tap Truck VI booking credit
				</h2>

				<p class="mt-4 text-base leading-7 text-fg/75">
					Enter your email for a chance to win a
					<span class="font-semibold text-[rgb(var(--brand-primary))]">$500 booking credit</span>
					and get occasional updates on availability, events, and promotions.
				</p>
			</div>

			<form class="mt-6 space-y-4" on:submit={submitGiveaway}>
				<input
					type="text"
					name="company"
					tabindex="-1"
					autocomplete="off"
					class="hidden"
				/>

				<div class="space-y-2">
					<label for="giveaway-email" class="text-sm font-medium text-[rgb(var(--brand-primary))]">
						Email address
					</label>

					<input
						id="giveaway-email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-2xl border border-fg/15 bg-white px-4 py-3 text-sm text-fg placeholder:text-fg/45 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--brand-accent))]"
					/>
				</div>

				<button
					type="submit"
					class="btn btn-primary w-full justify-center"
					disabled={status === 'loading'}
				>
					{status === 'loading' ? 'Entering…' : 'Enter giveaway'}
				</button>
			</form>

			{#if status !== 'idle'}
				<p class="mt-4 text-sm {status === 'success' ? 'text-emerald-600' : 'text-red-500'}">
					{message}
				</p>
			{/if}

			<p class="mt-4 text-xs leading-5 text-fg/55">
				No purchase necessary. Winner will be contacted by email by August 30th. By entering, you agree to receive occasional marketing emails from Tap Truck VI.
			</p>
		</div>
	</div>
{/if}