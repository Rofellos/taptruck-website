<script lang="ts">
	let email = '';
	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let message = '';

	async function submitNewsletter(e: Event) {
		e.preventDefault();
		status = 'loading';
		message = '';

		const formData = new FormData();
		formData.set('email', email);
		formData.set('company', ''); // honeypot field (must be blank)

		try {
			const res = await fetch('/newsletter', { method: 'POST', body: formData });
			const out = await res.json().catch(() => ({}));

			if (!res.ok || out?.ok === false) {
				status = 'error';
				message = out?.error ?? 'Something went wrong. Please try again.';
				return;
			}

			status = 'success';
			message = 'Thanks — you’re on the list.';
			email = '';
		} catch {
			status = 'error';
			message = 'Network error — please try again.';
		}
	}
</script>


<footer class="mt-16 border-t border-fg/10 bg-bg text-fg">
	<div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
		<div>
			<div class="text-lg font-semibold">Tap Truck VI</div>
			<p class="mt-2 text-sm text-fg/70">
				Mobile draft bar for weddings, corporate events, and parties on Vancouver Island.
			</p>
		</div>

		<div class="text-sm">
			<div class="font-semibold">Links</div>
			<div class="mt-2 grid gap-2">
				<a class="text-fg/70 hover:text-brand" href="/pricing">Pricing</a>
				<a class="text-fg/70 hover:text-brand" href="/book">Book</a>
				<a class="text-fg/70 hover:text-brand" href="/contact">Contact</a>
			</div>
		</div>

		<div class="text-sm">
			<div class="font-semibold">Contact</div>
			<div class="mt-2 grid gap-2 text-fg/70">
				<a class="hover:text-brand" href="mailto:bookings@taptruckvi.ca">bookings@taptruckvi.ca</a>
				<span>Vancouver Island, BC</span>
			</div>
		</div>
		<div class="text-sm">
			<div class="font-semibold">Newsletter</div>
			<p class="mt-2 text-fg/70">
				Monthly updates, new packages, and available dates.
			</p>

			<form class="mt-3 flex gap-2" on:submit={submitNewsletter}>
				<!-- Honeypot (hidden) -->
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
					class="btn btn-outline whitespace-nowrap px-4"
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

	<div class="border-t border-fg/10 py-4 text-center text-xs text-fg/60">
		© {new Date().getFullYear()} Tap Truck VI
	</div>
</footer>
