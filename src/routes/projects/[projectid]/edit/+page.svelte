<script lang="ts">
	import { Input } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import { Icon, Trash } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/updateProject"
			method="post"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
		>
			<h3 class="text-3xl font-bold">Edit {data.project.name}</h3>
			<Input label="name" id="name" value={data.project.name ?? ''} />
			<Input label="tagline" id="tagline" value={data.project.tagline ?? ''} />
			<Input label="url" id="url" value={data.project.url ?? ''} />
			<div class="form-control w-full max-w-lg">
				<label for="description" class="label font-medium pb-1">
					<span class="label-text">Project description</span>
				</label>
				<textarea
					name="description"
					class="textarea textarea-bordered h-24 resize-none"
					value={data.project.description ?? ''}
				/>
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				{#if data.project.thumbnail}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon class="w-5 h-5 text-white" src={Trash} />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={data.project.thumbnail
									? getImageURL(
											data.project.collectionId,
											data.project.id,
											data.project.thumbnail,
											'80x80'
									  )
									: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.project.name}`}
								alt="project thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					class="file-input file-input-bordered w-full max-w-lg mt-2"
				/>
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
