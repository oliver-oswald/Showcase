import type { Project } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUserProjects = async (userId: string) => {
		try {
			const projects = serializeNonPOJOs<Project[]>(
				await locals.pb.collection('projects').getFullList(undefined, {
					filter: `user = "${userId}"`
				})
			);
			return projects;
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
	};

	return {
		projects: getUserProjects(locals.user?.id as string)
	};
};

export const actions: Actions = {
	deleteProject: async ({ locals, request }) => {
		const { id } = Object.fromEntries(await request.formData()) as { id: string };

		try {
			await locals.pb.collection('projects').delete(id);
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
		return {
			success: true
		};
	}
};
