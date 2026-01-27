import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Resend } from 'resend';
import {
  TURNSTILE_SECRET_KEY,
  RESEND_API_KEY,
  RESEND_FROM,
  BOOKING_TO_EMAIL
} from '$env/static/private';
import BookingInquiry from '$lib/emails/BookingInquiry';
import { env } from '$env/dynamic/private';

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

export const actions: Actions = {
  default: async ({ request, getClientAddress }) => {
    const data = await request.formData();

    // Honeypot
    if (String(data.get('company') ?? '').trim().length > 0) {
      return fail(400, { message: 'Spam detected.' });
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const date = String(data.get('date') ?? '').trim();
    const location = String(data.get('location') ?? '').trim();
    const guests = String(data.get('guests') ?? '').trim();
    const details = String(data.get('details') ?? '').trim();

    const token = String(data.get('cf-turnstile-response') ?? '').trim();
    if (!token) return fail(400, { message: 'Please complete the CAPTCHA.' });

    if (!name || !email || !date || !location || !guests || !details) {
      return fail(400, { message: 'Please fill out all required fields.' });
    }

    const verify = await verifyTurnstile(token, getClientAddress());
    if (!verify.success) {
      return fail(400, { message: 'CAPTCHA verification failed. Please try again.' });
    }


const subject = `New Tap Truck inquiry – ${name} (${date})`;

const html = `
  <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.5;">
    <h2 style="margin:0 0 12px;">New booking inquiry</h2>

    <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
      <tr><td style="padding:6px 0;"><strong>Name:</strong></td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Email:</strong></td><td style="padding:6px 0;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Phone:</strong></td><td style="padding:6px 0;">${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Date:</strong></td><td style="padding:6px 0;">${escapeHtml(date)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Location:</strong></td><td style="padding:6px 0;">${escapeHtml(location)}</td></tr>
      <tr><td style="padding:6px 0;"><strong>Guests:</strong></td><td style="padding:6px 0;">${escapeHtml(guests)}</td></tr>
    </table>

    <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />

    <p style="margin:0 0 6px;"><strong>Details</strong></p>
    <div style="white-space: pre-wrap; background:#f9fafb; border:1px solid #e5e7eb; padding:12px; border-radius:10px;">
${escapeHtml(details)}
    </div>

    <p style="margin-top:16px; font-size:12px; color:#6b7280;">
      Source: taptruckvi.ca booking form<br/>
      IP: ${escapeHtml(getClientAddress())}
    </p>
  </div>
`;

const toEmail = env.BOOKING_TO_EMAIL;
const fromEmail = env.RESEND_FROM;
const resendKey = env.RESEND_API_KEY;

if (!toEmail || !fromEmail) {
  console.error('Missing env vars:', { toEmail, fromEmail });
  return fail(500, { message: 'Server email is not configured (missing env vars).' });
}

await resend.emails.send({
  from: fromEmail,
  to: toEmail,          // ✅ string (not array)
  replyTo: email,
  subject,
  html
});


    return { success: true };
  }
};

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
