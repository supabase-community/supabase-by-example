<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/Alert.svelte';
	import InputErrorMessage from '$lib/InputErrorMessage.svelte';

	export let form;
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	{#if form?.message !== undefined}
		<Alert class="{form?.success ? 'alert-info' : 'alert-error'} mb-10">{form?.message}</Alert>
	{/if}
	<h2 class="font-semibold text-4xl mb-4">Sign in</h2>
	<p class="font-medium mb-4">Hi, Welcome back</p>
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
		<div class="form-control">
			<label for="token" class="label">Token</label>
			<input
				id="token"
				name="token"
				type="text"
				value={form?.token ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.token}
			<InputErrorMessage>{form?.errors?.token}</InputErrorMessage>
		{/if}
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Sign in</button>
		</div>
	</form>
</div>
