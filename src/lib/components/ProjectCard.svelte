<script lang="ts">
	import type { Project } from '$lib/types';
	import { getImageURL } from '$lib/utils';

	export let project: Project;
</script>

<div class="card mx-3 sm:mx-0 sm:w-72 bgbase-100 shadow-xl w-fit max-h-96">
	<figure
		class="rounded-t-xl overflow-hidden"
	>
		<img
			src={project?.thumbnail
				? getImageURL(project.collectionId, project.id, project.thumbnail)
				: `https://via.placeholder.com/500/4506CB/FFFFFF/?text=${project.name}`}
			alt="project thumbnail"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">{project.name}</h2>
		<p>{project.tagline}</p>
		<div class="card-actions justify-end">
			<a href="/projects/{project.id}" class="btn btn-primary">View Project</a>
		</div>
	</div>
</div>
