import type { Project } from '$lib/types';
import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const getProject = async (projectId: string) => {
		try {
			const project = serializeNonPOJOs<Project>(
				await locals.pb.collection('projects').getOne(projectId)
			);
			return project;
		} catch (err) {
			console.error(err);
			throw error(500, 'Internal Server Error');
		}
	};

	return {
		project: getProject(params.projectid)
	};
};
