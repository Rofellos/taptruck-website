import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Resend } from 'resend';
import { TURNSTILE_SECRET_KEY } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { findPackage, sanitizeCalc, calcTotal, describeCalc } from '$lib/pricing';

// This route now takes a form submission (live server needed), so it can't
// be prerendered. Override the site-wide prerender setting from +layout.ts.
export const prerender = false;

const resend = new Resend(env.RESEND_API_KEY);

async function verifyTurnstile(token: string, ip?: string) {
	const formData = new FormData();
	formData.append('secret', TURNSTILE_SECRET_KEY);
	formData.append('response', token);
	if (ip) formData.append('remoteip', ip);

	const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body: formData
	});

	if (!resp.ok) return { success: false };
	return (await resp.json()) as { success: boolean; 'error-codes'?: string[] };
}

function escapeHtml(input: string) {
	return input
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot
		if (String(data.get('company') ?? '').trim().length > 0) {
			return fail(400, { message: 'Spam detected.' });
		}

		const packageName = String(data.get('packageName') ?? '').trim();
		const pkg = findPackage(packageName);
		if (!pkg) {
			return fail(400, { packageName, message: 'Please select a valid package.' });
		}

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const location = String(data.get('location') ?? '').trim();
		const details = String(data.get('details') ?? '').trim();

		// Recompute the total server-side from the package + selections — the
		// number submitted from the browser is never trusted as the price.
		const calc = sanitizeCalc(pkg, {
			date: String(data.get('date') ?? ''),
			extraTaps: Number(data.get('extraTaps') ?? 0),
			extraHours: Number(data.get('extraHours') ?? 0),
			extraBartenders: Number(data.get('extraBartenders') ?? 0),
			cocktail: data.get('cocktail') === 'yes',
			ferry: data.get('ferry') === 'yes',
			km: Number(data.get('km') ?? 0)
		});

		const token = String(data.get('cf-turnstile-response') ?? '').trim();
		if (!token) return fail(400, { packageName, message: 'Please complete the CAPTCHA.' });

		if (!name || !email || !calc.date) {
			return fail(400, { packageName, message: 'Please fill out your name, email, and event date.' });
		}

		const verify = await verifyTurnstile(token, getClientAddress());
		if (!verify.success) {
			return fail(400, { packageName, message: 'CAPTCHA verification failed. Please try again.' });
		}

		const total = calcTotal(pkg, calc);
		const breakdown = describeCalc(pkg, calc);

		const subject = `New Booking Request – ${name} (${calc.date}) – ${pkg.name}`;

		const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.5;">
    <h2 style="margin:0 0 12px;">New Booking Request from Pricing Calculator</h2>

    <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
      <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td style="padding:6px 0;">${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Event date:</strong></td><td style="padding:6px 0;">${escapeHtml(calc.date)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Location:</strong></td><td style="padding:6px 0;">${escapeHtml(location)}</td></tr>
    </table>

    <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />

    <p style="margin:0 0 6px;"><strong>Selected package & pricing</strong></p>
    <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:12px; border-radius:10px;">
      <ul style="margin:0; padding-left:18px;">
        ${breakdown.map((line) => `<li>${escapeHtml(line)}</li>`).join('\n        ')}
      </ul>
    </div>

    ${
			details
				? `<p style="margin:16px 0 6px;"><strong>Additional details</strong></p>
    <div style="white-space: pre-wrap; background:#f9fafb; border:1px solid #e5e7eb; padding:12px; border-radius:10px;">
${escapeHtml(details)}
    </div>`
				: ''
		}

    <p style="margin-top:16px; font-size:12px; color:#6b7280;">
      Source: taptruckvi.ca pricing calculator<br/>
      IP: ${escapeHtml(getClientAddress())}
    </p>
  </div>
`;

		const toEmail = env.BOOKING_TO_EMAIL;
		const fromEmail = env.RESEND_FROM;

		if (!toEmail || !fromEmail) {
			console.error('Missing env vars:', { toEmail, fromEmail });
			return fail(500, { packageName, message: 'Server email is not configured (missing env vars).' });
		}

		await resend.emails.send({
			from: fromEmail,
			to: toEmail,
			replyTo: email,
			subject,
			html
		});

		throw redirect(303, '/thank-you');
	}
};
