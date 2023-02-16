import { updateProjectSchema } from '$lib/schemas';
import type { Project } from '$lib/types';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const project = serializeNonPOJOs<Project>(
			await locals.pb.collection('projects').getOne(params.projectid)
		);

		if (locals.user?.id === project.user) {
			return {
				project
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err) {
		console.error(err);
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	updateProject: async ({ request, locals, params }) => {
		const body = await request.formData();

		const thumb = body.get('thumbnail') as File;

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) { 
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectid, serialize(formData));
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}

		throw redirect(303, `/my/projects`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('projects').update(params.projectid, { thumbnail: null });
		} catch (err) {
			throw error(500, 'internal Server error');
		}
		return {
			success: true
		};
	}
};
