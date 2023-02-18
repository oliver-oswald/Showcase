<script lang="ts">
	import type { User } from '$lib/types';
	import { getImageURL } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	const { user } = data.project.expand as User;
</script>

<div class="flex flex-col w-full mt-4">
	<div class="avatar">
		<div class="w-20 rounded">
			<img
				src={data.project?.thumbnail
					? getImageURL(data.project.collectionId, data.project.id, data.project.thumbnail, '80x80')
					: `https://via.placeholder.com/80/4506CB/FFFFFF/?text=${data.project.name}`}
				alt="project thumbnail"
			/>
		</div>
	</div>
	<div class="flex flex-row items-baseline gap-2">
		<h1 class="text-2xl font-bold mt-4">
			{data.project.name}
		</h1>
		<p>by</p>
		<h2 class="font-bold">{user.name}</h2>
		<div class="avatar translate-y-2.5">
			<div class="w-10 rounded-full">
				<img
					src={user?.avatar
						? getImageURL(user?.collectionId, user?.id, user?.avatar)
						: `https://ui-avatars.com/api/?name=${user?.name}`}
					alt="User avatar"
				/>
			</div>
		</div>
	</div>
	<p class="text-2xl font-light mt-2">
		{data.project.tagline}
	</p>
	<p>{data.project.description}</p>
</div>
