<script lang="ts">
	import type { Project } from '$lib/types';
	import { getImageURL } from '$lib/utils';
	import { Modal } from '$lib/components';
	import { toast } from 'svelte-french-toast';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let project: Project;

	let modalOpen: boolean;

	$: modalOpen = false;

	let loading = false;
	const submitDeleteProject: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Project deleted successfully');
					await update();
					break;
				case 'error':
					toast.error("Couldn't delete project");
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={project.thumbnail
					? getImageURL(project.collectionId, project.id, project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/projects/{project.id}" class="font-semibold text-lg">{project.name}</a>
		<p>{project.tagline}</p>
	</div>
	<div class="flex items-center justify-end w-full sm:flex-row flex-col">
		<a href="/projects/{project.id}/edit" class="btn btn-outline w-full sm:w-fit">Edit Project</a>
		<Modal label={project.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error sm:ml-2 mt-2 sm:mt-0 w-full">Delete</span>
			<div slot="heading">
				<h3 class="text-2xl">Delete {project.name}</h3>
				<p class="text-base font-normal mt-2">
					Are you sure you want to delete this project? This action cannot be undone.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={project.id} class="btn btn-outline">Cancel</label>
				<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
					<input type="hidden" name="id" value={project.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
