<script lang="ts">
	import { slide } from 'svelte/transition';

	let selected: 'wedding' | 'private' | null = null;
	let expandedPackage: string | null = null;

	function togglePackage(name: string) {
		expandedPackage = expandedPackage === name ? null : name;
	}

	type Package = {
		name: string;
		snippet: string;
		price: string;
		highlight?: boolean;
		items: string[];
	};

	const weddingPackages: Package[] = [
		{
			name: 'The Classic Pour',
			snippet: 'A clean, elegant bar service for your big day.',
			price: '$1,800 + GST',
			items: [
				'Up to 4 hours of service',
				'Full truck setup & breakdown included',
				'All tap equipment & dispensing hardware',
				'Ice & cooling for kegs',
				'Bar tools, towels & serving essentials',
				'Basic bar setup with table + tap system',
				'Two tap beverages',
				'Bottled wine service',
				'One licensed bartender'
			]
		},
		{
			name: 'Tap Truck Signature',
			snippet: 'The most popular choice - more taps, more time, two bartenders.',
			price: '$2,400 + GST',
			highlight: true,
			items: [
				'Up to 6 hours of service',
				'Full truck setup & breakdown included',
				'All tap equipment & dispensing hardware',
				'Ice & cooling for kegs',
				'Bar tools, towels & serving essentials',
				'Four tap beverages',
				'Bottled wine service',
				'Optional Prosecco on tap',
				'Two licensed bartenders'
			]
		},
		{
			name: 'Tap Truck Premium',
			snippet: 'The full experience - cocktails, styling, and everything taken care of.',
			price: '$3,400 + GST',
			items: [
				'Up to 8 hours of service',
				'Full truck setup & breakdown included',
				'All tap equipment & dispensing hardware',
				'Ice & cooling for kegs',
				'Bar tools, towels & serving essentials',
				'Four tap beverages',
				'Two optional tap cocktails + garnish',
				'Full side bar setup',
				'Bottled wine service',
				'Optional Prosecco on tap',
				'Custom drink menu + styling touches',
				'Two licensed bartenders'
			]
		}
	];

	const privatePackages: Package[] = [
		{
			name: 'Tap Truck Lite',
			snippet: 'A great intro to the truck experience for smaller gatherings.',
			price: '$800 + GST',
			items: [
				'Up to 2 hours of service',
				'Full truck setup & breakdown included',
				'All tap equipment & dispensing hardware',
				'Ice & cooling for kegs',
				'Bar tools, towels & serving essentials',
				'Two tap beverages',
				'One licensed bartender'
			]
		},
		{
			name: 'Tap Truck Lite Plus',
			snippet: 'More taps, more time - perfect for a proper party.',
			price: '$1,300 + GST',
			items: [
				'Up to 3 hours of service',
				'Full truck setup & breakdown included',
				'All tap equipment & dispensing hardware',
				'Ice & cooling for kegs',
				'Bar tools, towels & serving essentials',
				'Four tap beverages',
				'One licensed bartender'
			]
		}
	];

	type AddOnGroup = 
		| { category: string; permitting?: false; items: { label: string; detail: string }[] }
		| { category: string; permitting: true; description: string };

	const addOns: AddOnGroup[] = [
		{
			category: 'Time & Logistics',
			items: [
				{ label: 'Additional service hours', detail: '$125–$195/hr depending on package' },
				{ label: 'Early setup / late breakdown', detail: 'Available on request' },
				{ label: 'Travel outside Greater Victoria', detail: 'Per km rate, quoted on request' },
				{ label: 'Second bartender', detail: '$50–$65/hr' }
			]
		},
		{
			category: 'Beverages',
			items: [
				{ label: 'Tap cocktails or mocktails', detail: '$100/tap (20L keg)' },
				{ label: 'Prosecco on tap', detail: 'Available on Signature & Premium' },
				{ label: 'Non-alcoholic tap options', detail: 'Kombucha, craft soda, sparkling water' },
				{ label: 'Custom signature drink', detail: 'Named cocktail for your event' }
			]
		},
		{
			category: 'Styling & Experience',
			items: [
				{ label: 'Custom drink menu signage', detail: 'Printed or chalkboard style' },
				{ label: 'Branded cup sleeves or napkins', detail: 'Minimum order applies' },
				{ label: 'Floral or greenery bar styling', detail: 'Coordinated with your florist' },
				{ label: 'Full side bar setup', detail: 'Included in Premium, add-on for others' }
			]
		},
		{
			category: 'Permitting',
			permitting: true,
			description: "Don't want to deal with the paperwork? We've got it covered. If you'd prefer not to handle the liquor permitting for your event, we can manage the Special Event Permit (SEP) application on your behalf and use our names on the application - one less thing to worry about."
		},
	];

	$: packages = selected === 'wedding' ? weddingPackages : selected === 'private' ? privatePackages : [];
</script>

<svelte:head>
	<title>Pricing | Tap Truck Vancouver Island</title>
	<meta
		name="description"
		content="View Tap Truck VI wedding and private event package options."
	/>
</svelte:head>

<section class="bg-bg text-fg">
	<div class="mx-auto max-w-7xl px-4 pt-36 pb-20">

		<!-- Header -->
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
				Pricing
			</p>
			<h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				Simple, transparent pricing
			</h1>
			<p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
				Select the package category that best matches your event to view starting pricing and inclusions.
			</p>
			<p class="mt-4 text-sm leading-6 text-fg/55">
				All packages include travel within Greater Victoria. Events outside this area may be subject to additional travel fees.
			</p>
		</div>

		<!-- Toggle cards -->
		<div class="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">

			<!-- Wedding card -->
			<button
				type="button"
				on:click={() => (selected = selected === 'wedding' ? null : 'wedding')}
				class="rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg
					{selected === 'wedding'
					? 'border-[rgb(var(--brand-accent))] bg-[rgb(var(--brand-secondary))]/20'
					: 'border-fg/10 bg-white/70'}"
			>
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
							Weddings
						</p>
						<h2 class="mt-3 text-2xl font-bold">Wedding Packages</h2>
						<p class="mt-2 text-sm leading-6 text-fg/70">
							Full-service packages designed for larger events, longer timelines, and a polished guest experience.
						</p>
					</div>
					<span class="mt-1 shrink-0 text-lg text-[rgb(var(--brand-accent))] transition-transform duration-200 {selected === 'wedding' ? 'rotate-180' : ''}">
						↓
					</span>
				</div>
			</button>

			<!-- Private Events card -->
			<button
				type="button"
				on:click={() => (selected = selected === 'private' ? null : 'private')}
				class="rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg
					{selected === 'private'
					? 'border-[rgb(var(--brand-accent))] bg-[rgb(var(--brand-secondary))]/20'
					: 'border-fg/10 bg-white/70'}"
			>
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
							Private Events
						</p>
						<h2 class="mt-3 text-2xl font-bold">Private Event Packages</h2>
						<p class="mt-2 text-sm leading-6 text-fg/70">
							Flexible options for birthdays, backyard parties, smaller gatherings, and celebrations.
						</p>
					</div>
					<span class="mt-1 shrink-0 text-lg text-[rgb(var(--brand-accent))] transition-transform duration-200 {selected === 'private' ? 'rotate-180' : ''}">
						↓
					</span>
				</div>
			</button>
		</div>

		<!-- Packages (shown when a category is selected) -->
		{#if selected}
			<div transition:slide={{ duration: 300 }} class="mt-12">
				<div class="mb-8 text-center">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
						{selected === 'wedding' ? 'Wedding Packages' : 'Private Event Packages'}
					</h2>
				</div>

				<div class="grid gap-6 items-start {selected === 'wedding' ? 'lg:grid-cols-3' : 'sm:grid-cols-2 max-w-2xl mx-auto'}">
					{#each packages as pkg}
						<article class="relative flex flex-col self-start rounded-3xl border bg-white/75 p-6 shadow-sm
							{pkg.highlight ? 'border-[rgb(var(--brand-accent))] ring-1 ring-[rgb(var(--brand-accent))]/30' : 'border-fg/10'}"
						>

							{#if pkg.highlight}
								<div class="absolute -top-3 left-6">
									<span class="rounded-full bg-[rgb(var(--brand-accent))] px-3 py-1 text-xs font-semibold text-white">
										Most popular
									</span>
								</div>
							{/if}

							<h3 class="min-h-[2rem] text-2xl font-bold text-[rgb(var(--brand-primary))]">{pkg.name}</h3>

							<p class="min-h-[2.5rem] mt-1 text-sm leading-5 text-fg/60 italic">{pkg.snippet}</p>

							<p class="mt-2 text-lg font-semibold text-[rgb(var(--brand-accent))]">
								{pkg.price}
							</p>

							<!-- Inclusions dropdown toggle -->
							<button
								type="button"
								on:click={() => togglePackage(pkg.name)}
								class="mt-5 flex w-full items-center justify-between rounded-2xl border border-fg/10 bg-fg/5 px-4 py-3 text-sm font-semibold text-[rgb(var(--brand-primary))] transition hover:bg-fg/10"
							>
								<span>What's included</span>
								<span class="text-[rgb(var(--brand-accent))] transition-transform duration-200 {expandedPackage === pkg.name ? 'rotate-180' : ''}">↓</span>
							</button>

							{#if expandedPackage === pkg.name}
								<div transition:slide={{ duration: 250 }}>
									<ul class="mt-3 space-y-2.5 text-sm leading-6 text-fg/75">
										{#each pkg.items as item}
											<li class="flex gap-3">
												<span class="mt-1 shrink-0 text-[rgb(var(--brand-accent))]">✓</span>
												<span>{item}</span>
											</li>
										{/each}
									</ul>

									<a
										href="/book"
										class="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[rgb(var(--brand-accent))] px-4 py-3 text-sm font-semibold text-[rgb(var(--brand-accent))] transition hover:bg-[rgb(var(--brand-accent))] hover:text-white"
									>
										Book this package
									</a>
								</div>
							{/if}
						</article>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Add-ons section — always visible -->
		<div class="mt-16">
			<div class="mb-8 text-center">
				<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
					Customize your experience
				</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Add-ons & extras</h2>
				<p class="mt-4 text-base text-fg/65">
					All add-ons are available across packages. Mix and match to build the bar experience you have in mind.
				</p>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each addOns as group}
					<div class="rounded-3xl border border-fg/10 bg-white/70 p-6">
						<p class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
							{group.category}
						</p>
						{#if group.permitting}
							<p class="text-sm leading-6 text-fg/70">{group.description}</p>
						{:else}
							<ul class="space-y-4">
								{#each group.items as item}
									<li class="border-b border-fg/8 pb-4 last:border-0 last:pb-0">
										<p class="text-sm font-semibold text-[rgb(var(--brand-primary))]">{item.label}</p>
										<p class="mt-0.5 text-xs text-fg/60">{item.detail}</p>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom CTA -->
		<div class="mt-16 rounded-3xl bg-[rgb(var(--brand-primary-dark))] px-6 py-14 text-center text-white">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-secondary))]">
				Ready to book?
			</p>
			<h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
				Let's make your event unforgettable.
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
				Not sure which package is right for you? Reach out and we'll help figure it out.
			</p>
			<a
				href="/book"
				class="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[rgb(var(--brand-secondary))] px-10 py-4 text-base font-bold text-[rgb(var(--brand-primary-dark))] shadow-lg transition hover:opacity-90 hover:scale-[1.02]"
			>
				Secure your date →
			</a>
		</div>

	</div>
</section>
