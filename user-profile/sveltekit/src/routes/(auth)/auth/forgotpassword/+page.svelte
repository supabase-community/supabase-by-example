<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/Alert.svelte';
	import InputErrorMessage from '$lib/InputErrorMessage.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	{#if form?.message !== undefined}
		<Alert class="{form?.success ? 'alert-info' : 'alert-error'} mb-10">{form?.message}</Alert>
	{/if}

	<h2 class="font-semibold text-4xl mb-4">Forgot password</h2>
	<p class="font-medium mb-4">Looks like you've forgotten your password</p>
	<form class="" method="post" use:enhance>
		<div class="form-control">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				name="email"
				type="text"
				value={form?.email ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.email}
			<InputErrorMessage>{form?.errors?.email}</InputErrorMessage>
		{/if}
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Send</button>
		</div>
	</form>
	<div class="pt-4 text-center">
		Not registered yet? <a href="/auth/signup" class="underline text-blue-500">Create an account</a>
	</div>
</div>
