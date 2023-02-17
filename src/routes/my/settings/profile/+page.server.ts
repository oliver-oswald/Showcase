import { updateProfileSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import type { Actions } from './$types';

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const body = await request.formData();
		const userAvatar = body.get('avatar') as File;

		if (userAvatar.size === 0) body.delete('avatar');

		const { errors, formData } = await validateData(body, updateProfileSchema);
		const { avatar, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id as string, serialize(formData));

			if (locals.user?.id) {
				locals.user.name = name;
				locals.user.avatar = avatar;
			}
		} catch (err) {
			console.error(err);
			throw error(400, 'Error updating profile');
		}

		return {
			success: true
		};
	}
};
