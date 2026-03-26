<script lang="ts">
import { trackEvent } from '$lib/utils/analytics';

	let email = '';
	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let message = '';

	async function submitNewsletter(event: SubmitEvent) {
		event.preventDefault();

		status = 'loading';
		message = '';

		const formData = new FormData();
		formData.set('email', email);
		formData.set('company', '');

		try {
			const response = await fetch('/newsletter', {
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
			message = result.message ?? 'Thanks — you’re on the list.';
			email = '';

			trackEvent('newsletter_signup', {
				event_category: 'engagement',
				event_label: 'footer_newsletter'
			});
		} catch (error) {
			status = 'error';
			message = 'Network error. Please try again.';
		}
	}
</script>

<footer class="border-t border-fg/10 bg-bg text-fg">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
		
		<div>
			<div class="text-lg font-semibold">Tap Truck VI</div>
			<p class="mt-2 text-sm text-fg/70">
				Mobile tap truck & event bartending service.
			</p>
		</div>

		<!-- INSTAGRAM FOLLOW US SECTION  -->
		<div class="text-sm">
		<div class="font-semibold">Follow Us</div>
			<a
			href="https://instagram.com/taptruckvi"
			target="_blank"
			rel="noopener noreferrer"
			class="mt-3 flex items-center gap-3 text-fg/80 transition hover:text-[rgb(var(--brand-accent))]"
			>
			<!-- Instagram gradient icon -->
			<svg
				class="h-8 w-8"
				viewBox="0 0 24 24"
				fill="url(#ig-gradient)"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
				<linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#f58529"/>
					<stop offset="30%" stop-color="#dd2a7b"/>
					<stop offset="60%" stop-color="#8134af"/>
					<stop offset="100%" stop-color="#515bd4"/>
				</linearGradient>
				</defs>
				<path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm8.75 1.5a.75.75 0 100 1.5.75.75 0 000-1.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
			</svg>
			<span class="font-medium">@taptruckvi</span>
			</a>
		</div>

		<!-- CONTACT SECTION -->
		<div class="text-sm">
			<div class="font-semibold">Contact</div>
			<div class="mt-2 grid gap-2 text-fg/70">
				<span>bookings@taptruckvi.ca</span>
				<span>Vancouver Island, BC</span>
			</div>
		</div>

		<!-- NEWSLETTER SECTION -->
		<div class="text-sm">
			<div class="font-semibold">Sign Up For Our Newsletter:</div>

			<form class="mt-3 flex gap-4" on:submit={submitNewsletter}>
				<input
					type="text"
					name="company"
					tabindex="-1"
					autocomplete="off"
					class="hidden"
				/>

				<input
					type="email"
					bind:value={email}
					required
					placeholder="you@example.com"
					class="w-full rounded-xl border border-fg/15 bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg/50 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--brand-accent))]"
				/>

				<button
					type="submit"
					class="btn btn-outline whitespace-nowrap px-2 py-1"
					disabled={status === 'loading'}
				>
					{status === 'loading' ? '…' : 'Sign up'}
				</button>
			</form>

			{#if status !== 'idle'}
				<p class="mt-2 text-xs {status === 'success' ? 'text-emerald-400' : 'text-red-300'}">
					{message}
				</p>
			{/if}
		</div>

		

	</div>

	<div class="border-t border-fg/10 py-2 text-center text-xs text-fg/60">
		© {new Date().getFullYear()} Tap Truck VI
	</div>
</footer>
