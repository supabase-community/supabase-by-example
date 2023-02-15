<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import InputErrorMessage from '$lib/InputErrorMessage.svelte';
	import Alert from '$lib/Alert.svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	{#if form?.message !== undefined}
		<Alert class="{form?.success ? 'alert-info' : 'alert-error'} mb-10">{form?.message}</Alert>
	{/if}
	<h2 class="font-semibold text-4xl mb-4">Update Email</h2>
	<p class="font-medium mb-4">
		Hi {data.session?.user.email}, Enter your new email below and confirm it
	</p>
	<form class="" method="post" use:enhance>
		<div class="form-control">
			<label for="email" class="label">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form?.email ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.email}
			<InputErrorMessage>{form?.errors?.email}</InputErrorMessage>
		{/if}
		<div class="form-control">
			<label for="emailConfirm" class="label">Confirm Email</label>
			<input
				id="emailConfirm"
				name="emailConfirm"
				type="email"
				value={form?.emailConfirm ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.emailConfirm}
			<InputErrorMessage>{form?.errors?.emailConfirm}</InputErrorMessage>
		{/if}
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Update Email</button>
		</div>
	</form>
</div>
