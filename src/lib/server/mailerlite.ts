import { env } from '$env/dynamic/private';

export async function subscribeToMailerLite(email: string, groupIdOverride?: string) {
	const token = env.MAILERLITE_API_TOKEN;
	const defaultGroupId = env.MAILERLITE_GROUP_ID;
	const groupId = groupIdOverride ?? defaultGroupId;

	if (!token || !groupId) {
		console.error('Missing MailerLite env vars');
		return { ok: false, error: 'Server is not configured.' };
	}

	try {
		const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				groups: [groupId]
			})
		});

		const result = await res.json().catch(() => null);

		if (!res.ok) {
			console.error('MailerLite error:', result);
			return {
				ok: false,
				error: result?.message ?? 'Could not subscribe right now.'
			};
		}

		return { ok: true, message: 'Thanks — you’re on the list.' };
	} catch (error) {
		console.error('Newsletter signup failed:', error);
		return { ok: false, error: 'Network error. Please try again.' };
	}
}