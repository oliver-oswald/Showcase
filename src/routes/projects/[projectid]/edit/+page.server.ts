import type { Project } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
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
		const formData = await request.formData();

		const thumbnail = formData.get('thumbnail') as File;

		if (thumbnail.size === 0) {
			formData.delete('thumbnail');
		}

		try {
			await locals.pb.collection('projects').update(params.projectid, formData);
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
