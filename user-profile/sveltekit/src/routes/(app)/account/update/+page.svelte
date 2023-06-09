<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import Alert from '$lib/Alert.svelte';
	import InputErrorMessage from '$lib/InputErrorMessage.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	{#if form?.message && form?.message !== undefined}
		<Alert class="{form?.success ? 'alert-info' : 'alert-error'} mb-10">{form?.message}</Alert>
	{/if}
	<h2 class="font-semibold text-4xl mb-4">
		{data.profile?.display_name ? 'Update Profile' : 'Please complete your profile'}
	</h2>
	<p class="font-medium mb-4">
		Hi {data.profile?.display_name ?? data.session?.user.email}, Enter your user profile info below
	</p>

	<form
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<div class="mb-4 md:grid md:grid-cols-6 gap-4">
			<div class="col-span-6 sm:col-span-3">
				<div class="form-control">
					<label for="first_name" class="label">First Name</label>
					<input
						id="first_name"
						name="firstName"
						type="text"
						value={form?.firstName ?? data.profileInfo?.first_name ?? ''}
						class="input input-bordered"
					/>
				</div>
				{#if form?.errors?.firstName}
					<InputErrorMessage>{form?.errors?.firstName}</InputErrorMessage>
				{/if}
			</div>
			<div class="col-span-6 sm:col-span-3">
				<div class="form-control">
					<label for="last_name" class="label">Last Name</label>
					<input
						id="last_name"
						name="lastName"
						type="text"
						value={form?.lastName ?? data.profileInfo?.last_name ?? ''}
						class="input input-bordered"
					/>
				</div>
				{#if form?.errors?.lastName}
					<InputErrorMessage>{form?.errors?.lastName}</InputErrorMessage>
				{/if}
			</div>
		</div>
		<div class="form-control">
			<label for="display_name" class="label">Display Name</label>
			<input
				id="display_name"
				name="displayName"
				type="text"
				value={form?.displayName ?? data.profile?.display_name ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.displayName}
			<InputErrorMessage>{form?.errors?.displayName}</InputErrorMessage>
		{/if}
		<div class="form-control">
			<label for="bio" class="label">Bio</label>
			<textarea id="bio" name="bio" class="textarea textarea-bordered textarea-lg w-full"
				>{form?.bio ?? data.profile?.bio}</textarea
			>
		</div>
		{#if form?.errors?.bio}
			<InputErrorMessage>{form?.errors?.bio}</InputErrorMessage>
		{/if}
		<div class="form-control">
			<label for="dob" class="label">Date of birth</label>
			<input
				id="dob"
				name="dob"
				type="text"
				value={form?.dob ?? data.profileInfo?.dob ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.dob}
			<InputErrorMessage>{form?.errors?.dob}</InputErrorMessage>
		{/if}
		<div class="form-control">
			<label for="profile_location" class="label">Location</label>
			<input
				id="profile_location"
				name="profileLocation"
				type="text"
				value={form?.profileLocation ?? data.profileInfo?.profile_location ?? ''}
				class="input input-bordered"
			/>
		</div>
		{#if form?.errors?.profileLocation}
			<InputErrorMessage>{form?.errors?.profileLocation}</InputErrorMessage>
		{/if}`
		<div class="form-control mt-6">
			<button class="btn btn-primary no-animation">Update</button>
		</div>
	</form>
</div>
