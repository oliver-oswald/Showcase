import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, data);
			locals.pb.authStore.clear();
		} catch (err) {
			console.error(err);
			throw error(400, 'Error updating password');
		}
		throw redirect(303, '/login');
	}
};
