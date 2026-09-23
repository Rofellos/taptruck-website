<script lang="ts">
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Turnstile from '$lib/components/Turnstile.svelte';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import {
		weddingPackages,
		privatePackages,
		PEAK_MULTIPLIER,
		FREE_KM,
		PER_KM_RATE,
		HOUR_RATE,
		BARTENDER_RATE,
		TAP_LINE_RATE,
		COCKTAIL_RATE,
		FERRY_RATE,
		peakOf,
		fmtMoney,
		isPeakDate,
		mileageFee,
		freshCalc,
		calcTotal
	} from '$lib/pricing';
	import type { CalcState, Package } from '$lib/pricing';

	let selected: 'wedding' | 'private' | null = 'wedding';
	let expandedPackage: string | null = null;
	let calcOpen: string | null = null;

	function togglePackage(name: string) {
		expandedPackage = expandedPackage === name ? null : name;
	}

	$: packages = selected === 'wedding' ? weddingPackages : selected === 'private' ? privatePackages : [];

	// Grouped by category, used for the crawler-readable block and schema.
	const packageGroups: { group: string; pkgs: Package[] }[] = [
		{ group: 'Wedding Packages', pkgs: weddingPackages },
		{ group: 'Private Event Packages', pkgs: privatePackages }
	];

	type AddOnItem = { label: string; detail: string; price?: number };
	type AddOnGroup =
		| { category: string; permitting?: false; note?: string; items: AddOnItem[] }
		| { category: string; permitting: true; description: string };

	const addOns: AddOnGroup[] = [
		{
			category: 'Time & Logistics',
			items: [
				{
					label: 'Additional service hours',
					detail: 'Need some more time? Tack it on.',
					price: HOUR_RATE
				},
				{
					label: 'Early setup / late breakdown',
					detail:
						'Logistics issue? No problem - we can set up and break down anytime before or after an event.'
				},
				{
					label: 'Travel outside Greater Victoria',
					detail: `First ${FREE_KM} km from our Esquimalt base is included. $${PER_KM_RATE}/km additional, one-way.`
				},
				{
					label: 'Is your event on the mainland?',
					detail: 'No problem at all, just cover the cost of the ferry for our regular sized vehicle.',
					price: FERRY_RATE
				},
				{
					label: 'Additional bartender',
					detail: 'An additional bartender will keep the drinks flowing non-stop.',
					price: BARTENDER_RATE
				}
			]
		},
		{
			category: 'Beverages',
			note: 'You supply the beverages — these are the services we layer on top.',
			items: [
				{
					label: 'Extra tap line',
					detail: 'For your additional keg, cider, or kombucha (available on our 2-tap packages).',
					price: TAP_LINE_RATE
				},
				{
					label: 'Additional tap cocktail',
					detail: 'We build, pour, and garnish a prebatched cocktail from one of your taps, including custom cocktails to match your theme.',
					price: COCKTAIL_RATE
				},
				{
					label: 'Glassware',
					detail: 'Just let us know and we can take care of glassware rentals from start to finish.'
				}
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
			description:
				"Don't want to deal with the paperwork? We've got it covered. If you'd prefer not to handle the liquor permitting for your event, we can manage the Special Event Permit (SEP) application on your behalf and use our names on the application - one less thing to worry about."
		}
	];

	// --- Price calculator + booking form state --------------------------------
	let calc: Record<string, CalcState> = {};
	let turnstileTokens: Record<string, string> = {};

	function ensureCalc(name: string) {
		if (!calc[name]) {
			calc[name] = freshCalc();
			calc = calc;
		}
	}

	function toggleCalc(name: string) {
		ensureCalc(name);
		calcOpen = calcOpen === name ? null : name;
	}
	// ----------------------------------------------------------------------------

	// schema.org structured data so AI/search can parse prices + inclusions.
	const offerSchema = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Tap Truck VI — Mobile Tap & Bar Service',
		serviceType: 'Mobile bartending and tap truck service',
		areaServed: 'Greater Victoria, Vancouver Island, BC',
		provider: {
			'@type': 'LocalBusiness',
			name: 'Tap Truck Vancouver Island Inc.',
			url: 'https://www.taptruckvi.ca'
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Event Packages',
			itemListElement: packageGroups.flatMap((g) =>
				g.pkgs.map((p) => ({
					'@type': 'Offer',
					name: p.name,
					description: `${p.snippet} Includes: ${p.items.join('; ')}. Peak-season rate (Fri evening-Sun, Jul-Sep): ${fmtMoney(peakOf(p.normalPrice))} + GST.`,
					category: g.group,
					price: p.normalPrice.toFixed(2),
					priceCurrency: 'CAD',
					eligibleRegion: 'Greater Victoria, BC',
					priceSpecification: {
						'@type': 'PriceSpecification',
						price: p.normalPrice.toFixed(2),
						priceCurrency: 'CAD',
						valueAddedTaxIncluded: false
					}
				}))
			)
		}
	};
</script>

<svelte:head>
	<title>Pricing & Booking | Tap Truck Vancouver Island</title>
	<meta
		name="description"
		content="Tap Truck VI pricing & booking: wedding packages from $1,900 and private event packages from $762 (+GST). Peak-season rates apply Friday evening through Sunday, July-September. Build your exact quote and request to book right on this page."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify(offerSchema)}<\/script>`}
</svelte:head>

<section class="bg-bg text-fg">
	<div class="mx-auto max-w-7xl px-3 sm:px-4 pt-36 pb-20">

		<!--
			Crawler / AI-readable package data. Visually hidden (sr-only) but always
			present in the static HTML, so search engines, AI assistants, and screen
			readers receive full pricing and inclusions without any interaction.
			The visible interactive cards below are unchanged for sighted users.
		-->
		<div class="sr-only">
			<h2>Tap Truck VI Pricing</h2>
			<p>
				Mobile tap truck and bartending service for weddings and private events
				across Greater Victoria and Vancouver Island, BC. Clients supply their own
				beverages; Tap Truck VI provides the truck, tap system, equipment, and
				licensed bartenders. Prices below are in Canadian dollars and exclude GST.
				The first {FREE_KM} km of travel from our Esquimalt base is included; ${PER_KM_RATE}/km
				one-way applies beyond that. Peak-season pricing (a {Math.round((PEAK_MULTIPLIER - 1) * 100)}%
				premium) applies to events Friday evening through Sunday, July through September.
			</p>
			{#each packageGroups as group}
				<h3>{group.group}</h3>
				<ul>
					{#each group.pkgs as pkg}
						<li>
							<strong>{pkg.name}</strong> — {fmtMoney(pkg.normalPrice)} + GST off-peak,
							{fmtMoney(peakOf(pkg.normalPrice))} + GST peak season. {pkg.snippet} Includes:
							{pkg.items.join('; ')}.
						</li>
					{/each}
				</ul>
			{/each}
			<h3>Add-ons and extras</h3>
			<ul>
				{#each addOns as group}
					{#if group.permitting}
						<li><strong>{group.category}:</strong> {group.description}</li>
					{:else}
						{#each group.items as item}
							<li>
								<strong>{item.label}</strong>{#if item.price} — {fmtMoney(item.price)}{/if}:
								{item.detail}
							</li>
						{/each}
					{/if}
				{/each}
			</ul>
		</div>

		<!-- Header -->
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
				Pricing & Booking
			</p>
			<h1 class="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				Simple, transparent pricing
			</h1>
			<p class="mt-6 text-base leading-7 text-fg/75 sm:text-lg">
				Select the package category that best matches your event, build your quote, and
				request to book — all in one place.
			</p>
			<p class="mt-4 text-sm leading-6 text-fg/55">
				All packages include the first {FREE_KM} km of travel from our Esquimalt base. Peak-season
				dates (Friday evening through Sunday, July-September) carry a
				{Math.round((PEAK_MULTIPLIER - 1) * 100)}% seasonal rate.
			</p>
		</div>

		<!-- How it works / dry-hire benefit band -->
		<!-- <div class="mx-auto mt-12 max-w-3xl rounded-3xl border border-[rgb(var(--brand-accent))]/25 bg-[rgb(var(--brand-secondary))]/15 px-6 py-8 text-center sm:px-10">
			<p class="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--brand-accent))]">
				You bring the drinks, we bring the bar
			</p>
			<h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
				Buy exactly what you love - no markup
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-fg/75">
				You supply your own kegs, so you choose every pouring from the taps — and pay keg prices, not bar prices. In BC you can order kegs through the liquor store, and we bring the 1932 tap truck, the full tap system, the gear, and your licensed bartenders to pour it all.
			</p>
			<p class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-fg/60">
				Not sure how much to buy or how the permit works? We'll guide you through it — and we
				can handle the Special Event Permit for you as an add-on.
			</p>
		</div> -->

		<!-- Toggle cards -->
		<div id="choose-package" class="mx-auto mt-12 grid max-w-3xl scroll-mt-28 gap-4 sm:grid-cols-2">

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
							Grand & Celebratory
						</p>
						<h2 class="mt-3 text-2xl font-bold">Large Events</h2>
						<p class="mt-2 text-sm leading-6 text-fg/70">
							Full-service packages built for weddings, corporate events, festivals, and other large gatherings — longer timelines and a polished guest experience.
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
							Relaxed & Intimate
						</p>
						<h2 class="mt-3 text-2xl font-bold">Small Events</h2>
						<p class="mt-2 text-sm leading-6 text-fg/70">
							Flexible options for backyard parties, intimate get-togethers, birthdays, and smaller celebrations.
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
						{selected === 'wedding' ? 'Large Event Packages' : 'Small Event Packages'}
					</h2>
				</div>

				<div class="grid gap-6 items-start {selected === 'wedding' ? 'xl:grid-cols-3' : 'sm:grid-cols-2 max-w-2xl mx-auto'}">
					{#each packages as pkg}
						<article class="relative flex min-w-0 flex-col self-start rounded-3xl border bg-white/75 p-4 sm:p-6 shadow-sm
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
								{fmtMoney(pkg.normalPrice)} + GST
							</p>
							<p class="text-xs text-fg/50">
								Peak season (Fri eve-Sun, Jul-Sep): {fmtMoney(peakOf(pkg.normalPrice))} + GST
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
								</div>
							{/if}

							<!-- Price calculator toggle -->
							<button
								type="button"
								on:click={() => toggleCalc(pkg.name)}
								class="mt-3 flex w-full items-center justify-between rounded-2xl border border-[rgb(var(--brand-accent))]/40 bg-[rgb(var(--brand-accent))]/10 px-4 py-3 text-sm font-semibold text-[rgb(var(--brand-accent))] transition hover:bg-[rgb(var(--brand-accent))]/20"
							>
								<span>Build my quote & book</span>
								<span class="transition-transform duration-200 {calcOpen === pkg.name ? 'rotate-180' : ''}">↓</span>
							</button>

							{#if calcOpen === pkg.name && calc[pkg.name]}
								<div transition:slide={{ duration: 250 }} class="mt-4 min-w-0 space-y-4 rounded-2xl border border-fg/10 bg-fg/5 p-4">

									<div class="min-w-0">
										<label class="text-xs font-semibold uppercase tracking-wide text-fg/60" for="date-{pkg.name}">
											Event date
										</label>
										<input
											id="date-{pkg.name}"
											type="date"
											bind:value={calc[pkg.name].date}
											class="mt-1 w-full rounded-xl max-w-full min-w-0 border border-fg/15 bg-white px-3 py-2 text-sm"
										/>
										{#if calc[pkg.name].date}
											<p class="mt-1 text-xs {isPeakDate(calc[pkg.name].date) ? 'font-semibold text-[rgb(var(--brand-accent))]' : 'text-fg/50'}">
												{isPeakDate(calc[pkg.name].date)
													? 'Peak season rate applies (Fri evening-Sun, Jul-Sep)'
													: 'Off-peak rate applies'}
											</p>
										{/if}
									</div>

									{#if pkg.taps === 2}
										<div>
											<label class="text-xs font-semibold uppercase tracking-wide text-fg/60" for="taps-{pkg.name}">
												Extra tap lines ({fmtMoney(TAP_LINE_RATE)} each)
											</label>
											<select
												id="taps-{pkg.name}"
												bind:value={calc[pkg.name].extraTaps}
												class="mt-1 w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
											>
												<option value={0}>None (2 taps)</option>
												<option value={1}>+1 (3 taps)</option>
												<option value={2}>+2 (4 taps)</option>
											</select>
										</div>
									{/if}

									<div class="grid grid-cols-2 gap-3">
										<div>
											<label class="text-xs font-semibold uppercase tracking-wide text-fg/60" for="hours-{pkg.name}">
												Extra hours:
											</label>
											<select
												id="hours-{pkg.name}"
												bind:value={calc[pkg.name].extraHours}
												class="mt-1 w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
											>
												{#each [0, 1, 2, 3, 4, 5] as n}
													<option value={n}>{n === 0 ? 'None' : n}</option>
												{/each}
											</select>
										</div>
										<div>
											<label class="text-xs font-semibold uppercase tracking-wide text-fg/60" for="bartenders-{pkg.name}">
												Extra bartenders:
											</label>
											<select
												id="bartenders-{pkg.name}"
												bind:value={calc[pkg.name].extraBartenders}
												class="mt-1 w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
											>
												{#each [0, 1, 2, 3, 4, 5] as n}
													<option value={n}>{n === 0 ? 'None' : n}</option>
												{/each}
											</select>
										</div>
									</div>

									<label class="flex items-center gap-2 text-sm">
										<input type="checkbox" bind:checked={calc[pkg.name].cocktail} class="h-4 w-4 rounded border-fg/30" />
										Add a prebatched cocktail tap ({fmtMoney(COCKTAIL_RATE)})
									</label>

									<label class="flex items-center gap-2 text-sm">
										<input type="checkbox" bind:checked={calc[pkg.name].ferry} class="h-4 w-4 rounded border-fg/30" />
										Mainland event (ferry fee) ({fmtMoney(FERRY_RATE)} flat)
									</label>

									<div>
										<div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-fg/60">
											<label for="km-{pkg.name}">Distance from Esquimalt</label>
											<span>{calc[pkg.name].km} km</span>
										</div>
										<input
											id="km-{pkg.name}"
											type="range"
											min="0"
											max="500"
											step="5"
											bind:value={calc[pkg.name].km}
											class="mt-2 w-full"
										/>
										<p class="mt-1 text-xs text-fg/50">
											First {FREE_KM} km included.
											{#if calc[pkg.name].km > FREE_KM}
												{fmtMoney(mileageFee(calc[pkg.name].km))} travel fee ({calc[pkg.name].km - FREE_KM} km beyond the free zone at ${PER_KM_RATE}/km).
											{:else}
												No travel fee at this distance.
											{/if}
										</p>
									</div>

									<div class="rounded-xl bg-[rgb(var(--brand-primary))]/10 px-4 py-3 text-center">
										<p class="text-xs uppercase tracking-wide text-fg/55">Your estimated price</p>
										<p class="mt-1 text-2xl font-bold text-[rgb(var(--brand-primary))]">
											{fmtMoney(calcTotal(pkg, calc[pkg.name]))} <span class="text-sm font-normal text-fg/50">+ GST</span>
										</p>
									</div>

									<!-- Booking request form: submits the package + calculator selections
									     straight to our booking inbox. The server recomputes the total
									     itself rather than trusting the hidden fields below. -->
									<form
										method="POST"
										use:enhance
										class="space-y-3 border-t border-fg/10 pt-4"
									>
										<input type="hidden" name="packageName" value={pkg.name} />
										<input type="hidden" name="date" value={calc[pkg.name].date} />
										<input type="hidden" name="extraTaps" value={calc[pkg.name].extraTaps} />
										<input type="hidden" name="extraHours" value={calc[pkg.name].extraHours} />
										<input type="hidden" name="extraBartenders" value={calc[pkg.name].extraBartenders} />
										<input type="hidden" name="cocktail" value={calc[pkg.name].cocktail ? 'yes' : 'no'} />
										<input type="hidden" name="ferry" value={calc[pkg.name].ferry ? 'yes' : 'no'} />
										<input type="hidden" name="km" value={calc[pkg.name].km} />
										<input type="hidden" name="cf-turnstile-response" value={turnstileTokens[pkg.name] ?? ''} />

										<!-- Honeypot — left empty by real visitors, hidden from view -->
										<div class="hidden" aria-hidden="true">
											<label>
												Company
												<input type="text" name="company" tabindex="-1" autocomplete="off" />
											</label>
										</div>

										<p class="text-xs font-semibold uppercase tracking-wide text-fg/60">Your details</p>

										<input
											type="text"
											name="name"
											placeholder="Full name"
											required
											class="w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
										/>
										<input
											type="email"
											name="email"
											placeholder="Email"
											required
											class="w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
										/>
										<input
											type="tel"
											name="phone"
											placeholder="Phone (optional)"
											class="w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
										/>
										<input
											type="text"
											name="location"
											placeholder="Event location / venue (optional)"
											class="w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
										/>
										<textarea
											name="details"
											placeholder="Anything else we should know? (optional)"
											rows="2"
											class="w-full rounded-xl border border-fg/15 bg-white px-3 py-2 text-sm"
										></textarea>

										<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} bind:token={turnstileTokens[pkg.name]} />

										{#if $page.form?.packageName === pkg.name && $page.form?.message}
											<p class="text-sm font-medium text-red-600">{$page.form.message}</p>
										{/if}

										<button
											type="submit"
											class="inline-flex w-full items-center justify-center rounded-2xl bg-[rgb(var(--brand-accent))] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
										>
											Submit request
										</button>
									</form>
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
							{#if group.note}
								<p class="mb-4 text-xs italic leading-5 text-fg/55">{group.note}</p>
							{/if}
							<ul class="space-y-4">
								{#each group.items as item}
									<li class="border-b border-fg/8 pb-4 last:border-0 last:pb-0">
										<p class="text-sm font-semibold text-[rgb(var(--brand-primary))]">
											{item.label}{#if item.price}{/if}
										</p>
										<p class="mt-0.5 text-xs text-fg/60">{item.detail}</p>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
