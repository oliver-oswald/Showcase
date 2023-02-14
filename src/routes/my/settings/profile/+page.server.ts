import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		let data = await request.formData();
		const userAvatar = data.get('avatar') as File;

		if (userAvatar.size === 0) data.delete('avatar');

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id as string, data);

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
