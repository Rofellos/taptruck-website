import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { subscribeToMailerLite } from '$lib/server/mailerlite';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();

	// Honeypot
	if (String(data.get('company') ?? '').trim().length > 0) {
		return json({ ok: false, error: 'Spam detected.' }, { status: 400 });
	}

	const email = String(data.get('email') ?? '').trim().toLowerCase();

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
	}

	const result = await subscribeToMailerLite(email);

	if (!result.ok) {
		return json({ ok: false, error: result.error }, { status: 500 });
	}

	return json({ ok: true, message: result.message });
};
