<script lang="ts">
    import { Input, Modal } from "$lib/components";

    export let form: any;

    let emailModalOpen: boolean;

    $: emailModalOpen = false;
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
</div>