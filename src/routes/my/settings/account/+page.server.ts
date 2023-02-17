import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

type Fail ={
	data: {
		username?: string | undefined,
        email?: string | undefined
	},
	errors: {
		username?: string[] | undefined,
		email?: string[] | undefined
	}
}

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			} as Fail);
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err) {
			console.error(err);
			throw error(400, 'Error updating email');
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			}as Fail);
		}

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${formData.username}"`);
		} catch (err: any) {
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user?.id as string, { username: formData.username });
					if (locals.user) {
						locals.user.username = username;
					}
					return {
						success: true
					};
				} catch (err) {
					console.error(err);
					throw error(400, 'Error updating username');
				}
			}
			console.error(err);
			throw error(err.status, err.message);
		}
	}
};
