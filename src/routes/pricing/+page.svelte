<script lang="ts">
	let selected: 'wedding' | 'private' = 'wedding';

	const weddingPackages = [
		{
			name: 'The Classic Pour',
			price: 'Starting at $1,800 + GST',
			items: [
				'Up to 4 hours of service',
				'Basic bar setup with table + tap system',
				'Two tap beverages',
				'Bottled wine service',
				'One licensed bartender'
			]
		},
		{
			name: 'Tap Truck Signature',
			price: 'Starting at $2,400 + GST',
			items: [
				'Up to 6 hours of service',
				'Four tap beverages',
				'Two licensed bartenders',
				'Bottled wine service',
				'Optional Prosecco on tap'
			]
		},
		{
			name: 'Tap Truck Premium Experience',
			price: 'Starting at $3,400 + GST',
			items: [
				'Up to 8 hours of service',
				'Four tap beverages',
				'Two optional tap cocktails + garnish',
				'Two licensed bartenders',
				'Full side bar setup',
				'Bottled wine service',
				'Optional Prosecco on tap',
				'Custom drink menu + styling touches'
			]
		}
	];

	const privatePackages = [
		{
			name: 'Tap Truck Lite',
			price: 'Starting at $800',
			items: ['Up to 3 hours of service', 'Two tap beverages', 'One bartender']
		},
		{
			name: 'Tap Truck Lite Plus',
			price: 'Starting at $1,300',
			items: [
				'Up to 4 hours of service',
				'Four tap beverages',
				'One bartender'
			]
		}
	];

	const addOns = [
		'Additional service hours: $125–$195/hr',
		'Cocktails or mocktails on tap, 20L keg: $100/tap',
		'Second bartender: $50–$65/hr'
	];

	$: packages = selected === 'wedding' ? weddingPackages : selected === 'private' ? privatePackages : [];
</script>

<svelte:head>
	<title>Pricing | Tap Truck VI</title>
	<meta
		name="description"
		content="View Tap Truck VI wedding and private event package options."
	/>
</svelte:head>

<section class="bg-bg text-fg">
	<div class="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
				Pricing
			</p>

			<h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				Choose your event type
			</h1>

			<p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
				Select the package category that best matches your event to view starting pricing and
				inclusions.
			</p>

			<p class="mt-4 text-sm leading-6 text-fg/65">
				All packages include travel within Greater Victoria. Events outside this area may be
				subject to additional travel fees.
			</p>
		</div>

		<div class="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
			<button
				type="button"
				on:click={() => (selected = 'wedding')}
				class="rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg
					{selected === 'wedding'
					? 'border-[rgb(var(--brand-accent))] bg-[rgb(var(--brand-secondary))]/20'
					: 'border-fg/10 bg-white/70'}"
			>
				<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
					Weddings
				</p>
				<h2 class="mt-3 text-2xl font-bold">Wedding Packages</h2>
				<p class="mt-2 text-sm leading-6 text-fg/70">
					Full-service packages designed for larger events, longer timelines, and a polished guest
					experience.
				</p>
			</button>

			<button
				type="button"
				on:click={() => (selected = 'private')}
				class="rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg
					{selected === 'private'
					? 'border-[rgb(var(--brand-accent))] bg-[rgb(var(--brand-secondary))]/20'
					: 'border-fg/10 bg-white/70'}"
			>
				<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
					Private Events
				</p>
				<h2 class="mt-3 text-2xl font-bold">Private Event Packages</h2>
				<p class="mt-2 text-sm leading-6 text-fg/70">
					Flexible options for birthdays, backyard parties, smaller gatherings, and celebrations.
				</p>
			</button>
		</div>

		{#if selected}
			<div class="mt-12">
				<div class="mb-6 text-center">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
						{selected === 'wedding' ? 'Wedding Packages' : 'Private Event Packages'}
					</h2>
				</div>

				<div class="grid gap-6 lg:grid-cols-3">
					{#each packages as pkg}
						<article class="flex flex-col rounded-3xl border border-fg/10 bg-white/75 p-6 shadow-sm">
							<h3 class="text-2xl font-bold text-[rgb(var(--brand-primary))]">{pkg.name}</h3>

							<p class="mt-3 text-lg font-semibold text-[rgb(var(--brand-accent))]">
								{pkg.price}
							</p>

							<ul class="mt-6 space-y-3 text-sm leading-6 text-fg/75">
								{#each pkg.items as item}
									<li class="flex gap-3">
										<span class="mt-1 text-[rgb(var(--brand-accent))]">✓</span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</article>
					{/each}
				</div>

				<div class="mt-10 rounded-3xl border border-fg/10 bg-white/60 p-6">
					<h3 class="text-xl font-bold">Add-ons + additions</h3>
					<ul class="mt-4 grid gap-3 text-sm text-fg/75 sm:grid-cols-3">
						{#each addOns as addOn}
							<li class="rounded-2xl bg-[rgb(var(--brand-secondary))]/15 p-4">{addOn}</li>
						{/each}
					</ul>
				</div>

				<div class="mt-10 text-center">
					<a href="/book" class="btn btn-primary">Check availability</a>
				</div>
			</div>
		{/if}
	</div>
</section>