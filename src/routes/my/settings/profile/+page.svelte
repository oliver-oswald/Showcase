<script lang="ts">
    import { Icon, Pencil } from 'svelte-hero-icons'

    const showPreview = (event: Event) => {
        const target = event.target as HTMLInputElement
        const files = target.files as FileList

        if (files.length > 0){
            const src = URL.createObjectURL(files[0])
            const preview = document.getElementById('avatar-preview') as HTMLImageElement
            preview.src = src
        }
    }
</script>

<div class="flex flex-col w-full h-full">
    <form action="?/updateProfile" method="POST" class="flex flex-col space-y-2 w-full">
        <h3 class="text-2xl font-medium">Update Profile</h3>
        <div class="form-control w-full max-w-lg">
            <label for="avatar" class="label font-medium pb-1">
                <span class="label-text">
                    Profile Picture
                </span>
            </label>
            <label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
                <label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
                    <span class="btn btn-circle btn-sm btn-secondary">
                        <Icon class="w-4 h-4" src={Pencil} />
                    </span>
                </label>
                <div class="w-32 rounded-full">
                    <img src="https://placeimg.com/80/80/people" alt="user avatar" id="avatar-preview">
                </div>
            </label>
            <input type="file" name="avatar" id="avatar" hidden value="" accept="image/*" on:change={showPreview}>
        </div>
    </form>
</div>