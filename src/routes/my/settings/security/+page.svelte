<script>
	import { Input } from '$lib/components';
</script>

<div class="flex flex-col w-full h-full">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex flex-col space-y-2 w-full">
			<h3 class="text-2xl font-medium">Change Password</h3>
			<Input id="oldPassword" type="password" label="Old Password" required />
			<Input id="password" type="password" label="New Password" required />
			<Input id="passwordConfirm" type="password" label="Confirm New Password" required />
			<a href="/reset-password" class="text-primary hover:cursor-pointer hover:underline">
				Forgot your password?
			</a>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Update Password</button>
			</div>
		</form>
	</div>
</div>
