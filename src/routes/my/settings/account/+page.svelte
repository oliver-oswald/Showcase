<script lang="ts">
    import { Input, Modal } from "$lib/components";
	import type { PageData } from "./$types";

    export let form: any;
    export let data: PageData;

    let emailModalOpen: boolean;
    let usernameModalOpen: boolean;

    $: emailModalOpen = false;
    $: usernameModalOpen = false;
</script>

<div class="flex flex-col w-full h-full space-y-12">
    <div class="w-full">
        <h3 class="text-2xl font-medium">Change Email</h3>
        <div class="divider"></div>
        <Modal label="change-email" checked={emailModalOpen}>
            <span slot="trigger" class="btn btn-primary">Change Email</span>
            <h3 slot="heading">Change Your Email</h3>
            <form action="?/updateEmail" method="POST" class="space-y-2">
                <Input
                    id="email"
                    type="email"
                    required
                    value={form?.data?.email}
                    label="Enter your new email address"
                />
                <button type="submit" class="btn btn-primary w-full">Change my email</button>
            </form>
        </Modal>
    </div>
    <div class="w-full">
        <h3 class="text-2xl font-medium">Change Username</h3>
        <div class="divider mb-0.5"></div>
        <Input id="username" label="Username" value={data.user?.username} disabled/>
        <Modal label="change-username" checked={usernameModalOpen}>
            <span slot="trigger" class="btn btn-primary">Change Username</span>
            <h3 slot="heading">Change Your Username</h3>
            <form action="?/updateUsername" method="POST" class="space-y-2">
                <Input
                    id="username"
                    type="text"
                    required
                    value={form?.data?.username}
                    label="Enter your new username address"
                />
                <button type="submit" class="btn btn-primary w-full">Change my username</button>
            </form>
        </Modal>
    </div>
</div>