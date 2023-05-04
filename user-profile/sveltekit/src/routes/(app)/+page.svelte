<script lang="ts">
	import type { Profile, ProfileInfo } from '$lib/utils';
	import get from 'just-safe-get';
	import type { PageData } from './$types';

	export let data: PageData;

	const profileInfo = get(data.profile as Profile, 'profiles_info.0') as ProfileInfo;
</script>

<div class="card w-4/12 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Welcome {data.profile?.display_name ?? data.session?.user?.email}</h2>
		{#if data.profile?.display_name}
			<p>
				Name: {profileInfo?.first_name}
				{profileInfo?.last_name}
			</p>
			<p>Display Name: {data.profile?.display_name}</p>
			<p>Dob: {profileInfo?.dob}</p>
			<p>Location: {profileInfo?.profile_location}</p>
			<h3 class="text-lg font-semibold mt-2">Bio</h3>
			<p>{data.profile?.bio}</p>
			<p class="text-right">
				<a href="{data.website}/{data.profile?.slug}" class="btn btn-md btn-outline">View Profile</a
				>
			</p>
		{/if}
	</div>
</div>
