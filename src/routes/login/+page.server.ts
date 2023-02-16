import { loginUserSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), loginUserSchema);

		if (errors) { 
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			})
		}

		try {
			await locals.pb
				.collection('users')
				.authWithPassword(formData.email as string, formData.password as string);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.error(err);
			throw error(500, 'something went wrong logging in');
		}
		throw redirect(303, '/');
	}
};
