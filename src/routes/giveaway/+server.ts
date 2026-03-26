import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { subscribeToMailerLite } from '$lib/server/mailerlite';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	if (String(data.get('company') ?? '').trim().length > 0) {
		return json({ ok: false, error: 'Spam detected.' }, { status: 400 });
	}

	const email = String(data.get('email') ?? '').trim().toLowerCase();

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
	}

	const giveawayGroupId = env.MAILERLITE_GIVEAWAY_ID;

	if (!giveawayGroupId) {
		return json({ ok: false, error: 'Giveaway is not configured.' }, { status: 500 });
	}

	const result = await subscribeToMailerLite(email, giveawayGroupId);

	if (!result.ok) {
		return json({ ok: false, error: result.error }, { status: 500 });
	}

	return json({ ok: true, message: result.message });
};