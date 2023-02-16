import { createProjectSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { serialize } from 'object-to-formdata';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail') as File;

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		body.append('user', locals.user?.id as string);

		const { formData, errors } = await validateData(body, createProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
            return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
        }
		try {
			await locals.pb.collection('projects').create(serialize(formData));
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}

		throw redirect(303, '/my/projects');
	}
};
