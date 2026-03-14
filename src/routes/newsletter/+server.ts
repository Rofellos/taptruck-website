import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();

  // Honeypot
  if (String(data.get('company') ?? '').trim().length > 0) {
    return json({ ok: false, error: 'Spam detected.' }, { status: 400 });
  }

  const email = String(data.get('email') ?? '').trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }

  // TODO: save email (Supabase/MailerLite/etc)
  return json({ ok: true });
};
