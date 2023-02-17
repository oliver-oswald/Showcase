import { updatePasswordSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			console.error(err);
			throw error(400, 'Error updating password');
		}
		throw redirect(303, '/login');
	}
};
