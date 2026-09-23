// Single source of truth for package data, add-on rates, and the price
// calculator's math. Imported by both the pricing page (client-side display
// and live total) and its form action (server-side, authoritative total —
// never trust a price submitted from the browser).

export type Package = {
	name: string;
	snippet: string;
	normalPrice: number;
	highlight?: boolean;
	items: string[];
	hours: number;
	bartenders: number;
	taps: number;
};

export const weddingPackages: Package[] = [
	{
		name: 'The Classic Pour',
		snippet: 'A clean, elegant bar service for your big day.',
		normalPrice: 1700,
		hours: 4,
		bartenders: 1,
		taps: 4,
		items: [
			'Up to 4 hours of service',
			'Two licensed bartenders',
			'Four tap beverages',
			'Bottled wine/bubbly service',
			'Full truck setup & breakdown',
			'All tap equipment & dispensing hardware',
			'Ice & cooling for kegs',
			'Bar tools, cleaning towels & serving essentials',
			'Side bar setup for service'
		]
	},
	{
		name: 'Tap Truck Signature',
		snippet: 'The most popular choice - more taps, more time, two bartenders.',
		normalPrice: 2200,
		hours: 6,
		bartenders: 2,
		taps: 4,
		highlight: true,
		items: [
			'Up to 6 hours of service',
			'Two licensed bartenders',
			'Four tap beverages',
			'One optional custom tap cocktail + garnish',
			'Bottled wine/bubbly service',
			'Full truck setup & breakdown',
			'All tap equipment & dispensing hardware',
			'Ice & cooling for kegs',
			'Bar tools, cleaning towels & serving essentials',
			'Side bar setup for service'
		]
	},
	{
		name: 'Tap Truck Premium',
		snippet: 'The full experience - cocktails, styling, and everything taken care of.',
		normalPrice: 3000,
		hours: 8,
		bartenders: 2,
		taps: 4,
		items: [
			'Up to 8 hours of service',
			'Two licensed bartenders',
			'Four tap beverages',
			'Two optional custom tap cocktails + garnishes',
			'Custom drink menu + styling touches',
			'Bottled wine/bubbly service',
			'Full truck setup & breakdown',
			'All tap equipment & dispensing hardware',
			'Ice & cooling for kegs',
			'Bar tools, cleaning towels & serving essentials',
			'Side bar setup for service'
		]
	}
];

export const privatePackages: Package[] = [
	{
		name: 'Tap Truck Lite',
		snippet: 'A great intro to the truck experience for smaller gatherings.',
		normalPrice: 900,
		hours: 2,
		bartenders: 1,
		taps: 2,
		items: [
			'Up to 2 hours of service',
			'One licensed bartender',
			'Two tap beverages',
			'Full truck setup & breakdown',
			'All tap equipment & dispensing hardware',
			'Ice & cooling for kegs',
			'Bar tools, cleaning towels & serving essentials',
			'Side bar setup for service'
		]
	},
	{
		name: 'Tap Truck Full Pour',
		snippet: 'More taps, more time - perfect for a proper party.',
		normalPrice: 1200,
		hours: 3,
		bartenders: 1,
		taps: 4,
		items: [
			'Up to 3 hours of service',
			'One licensed bartender',
			'Four tap beverages',
			'Full truck setup & breakdown',
			'All tap equipment & dispensing hardware',
			'Ice & cooling for kegs',
			'Bar tools, cleaning towels & serving essentials',
			'Side bar setup for service'
		]
	}
];

export const allPackages: Package[] = [...weddingPackages, ...privatePackages];

export function findPackage(name: string): Package | undefined {
	return allPackages.find((p) => p.name === name);
}

// --- Peak season & add-on rates ---------------------------------------------
// Peak season: Friday evening through Sunday, July through September.
export const PEAK_MULTIPLIER = 1.2;
export const FREE_KM = 40;
export const PER_KM_RATE = 3;
export const HOUR_RATE = 150; // per bartender on site, per additional hour
export const BARTENDER_RATE = 250;
export const TAP_LINE_RATE = 100;
export const COCKTAIL_RATE = 200;
export const FERRY_RATE = 250;

export function peakOf(normal: number): number {
	return Math.round(normal * PEAK_MULTIPLIER);
}

export function fmtMoney(n: number): string {
	return '$' + Math.round(n).toLocaleString('en-CA');
}

export function isPeakDate(dateStr: string): boolean {
	if (!dateStr) return false;
	const d = new Date(dateStr + 'T12:00:00');
	if (isNaN(d.getTime())) return false;
	const month = d.getMonth() + 1; // 1-12
	const day = d.getDay(); // 0 = Sun ... 5 = Fri, 6 = Sat
	const isPeakMonth = month >= 7 && month <= 9;
	const isPeakDay = day === 5 || day === 6 || day === 0;
	return isPeakMonth && isPeakDay;
}

export function mileageFee(km: number): number {
	return Math.max(0, km - FREE_KM) * PER_KM_RATE;
}

export type CalcState = {
	date: string;
	extraTaps: number;
	extraHours: number;
	extraBartenders: number;
	cocktail: boolean;
	ferry: boolean;
	km: number;
};

export function freshCalc(): CalcState {
	return {
		date: '',
		extraTaps: 0,
		extraHours: 0,
		extraBartenders: 0,
		cocktail: false,
		ferry: false,
		km: 0
	};
}

// Clamp/sanitize values coming from a form submission (client input is
// never trusted for the final price).
function clampInt(n: number, min: number, max: number): number {
	if (!Number.isFinite(n)) return min;
	return Math.min(max, Math.max(min, Math.round(n)));
}

export function sanitizeCalc(pkg: Package, raw: Partial<CalcState>): CalcState {
	return {
		date: typeof raw.date === 'string' ? raw.date : '',
		extraTaps: pkg.taps === 2 ? clampInt(Number(raw.extraTaps ?? 0), 0, 2) : 0,
		extraHours: clampInt(Number(raw.extraHours ?? 0), 0, 5),
		extraBartenders: clampInt(Number(raw.extraBartenders ?? 0), 0, 5),
		cocktail: Boolean(raw.cocktail),
		ferry: Boolean(raw.ferry),
		km: clampInt(Number(raw.km ?? 0), 0, 500)
	};
}

export function calcTotal(pkg: Package, c: CalcState): number {
	const base = isPeakDate(c.date) ? peakOf(pkg.normalPrice) : pkg.normalPrice;
	const bartendersOnSite = pkg.bartenders + c.extraBartenders;
	const hoursFee = c.extraHours * HOUR_RATE * bartendersOnSite;
	const bartenderFee = c.extraBartenders * BARTENDER_RATE;
	const tapFee = c.extraTaps * TAP_LINE_RATE;
	const cocktailFee = c.cocktail ? COCKTAIL_RATE : 0;
	const ferryFee = c.ferry ? FERRY_RATE : 0;
	const travelFee = mileageFee(c.km);
	return base + hoursFee + bartenderFee + tapFee + cocktailFee + ferryFee + travelFee;
}

// Human-readable line-item breakdown, used to build the booking email.
export function describeCalc(pkg: Package, c: CalcState): string[] {
	const lines: string[] = [];
	const peak = isPeakDate(c.date);
	lines.push(`Package: ${pkg.name} (${fmtMoney(peak ? peakOf(pkg.normalPrice) : pkg.normalPrice)} ${peak ? 'peak season' : 'off-peak'} rate)`);
	if (c.date) lines.push(`Event date: ${c.date}${peak ? ' (peak season)' : ''}`);
	if (c.extraTaps > 0) lines.push(`Extra tap lines: ${c.extraTaps} (+${fmtMoney(c.extraTaps * TAP_LINE_RATE)})`);
	if (c.extraHours > 0) {
		const bartendersOnSite = pkg.bartenders + c.extraBartenders;
		lines.push(
			`Extra hours: ${c.extraHours} @ ${fmtMoney(HOUR_RATE)}/bartender x ${bartendersOnSite} bartender(s) (+${fmtMoney(c.extraHours * HOUR_RATE * bartendersOnSite)})`
		);
	}
	if (c.extraBartenders > 0) lines.push(`Extra bartenders: ${c.extraBartenders} (+${fmtMoney(c.extraBartenders * BARTENDER_RATE)})`);
	if (c.cocktail) lines.push(`Prebatched cocktail tap (+${fmtMoney(COCKTAIL_RATE)})`);
	if (c.ferry) lines.push(`Ferry required (+${fmtMoney(FERRY_RATE)})`);
	if (c.km > 0) {
		const fee = mileageFee(c.km);
		lines.push(`Distance from Esquimalt: ${c.km} km${fee > 0 ? ` (+${fmtMoney(fee)} travel, ${c.km - FREE_KM} km beyond the free ${FREE_KM} km zone)` : ' (within free zone)'}`);
	}
	lines.push(`Estimated total: ${fmtMoney(calcTotal(pkg, c))} + GST`);
	return lines;
}
