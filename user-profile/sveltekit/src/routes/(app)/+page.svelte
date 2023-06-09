<script lang="ts">
	export let data;
</script>

<div class="card w-4/12 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Welcome {data.profile?.display_name ?? data.session?.user?.email}</h2>
		{#if data.profile?.display_name}
			<p>
				Name: {data.profileInfo?.first_name}
				{data.profileInfo?.last_name}
			</p>
			<p>Display Name: {data.profile?.display_name}</p>
			<p>Dob: {data.profileInfo?.dob}</p>
			<p>Location: {data.profileInfo?.profile_location}</p>
			<h3 class="text-lg font-semibold mt-2">Bio</h3>
			<p>{data.profile?.bio}</p>
			<p class="text-right">
				<a href="{data.website}/{data.profile?.slug}" class="btn btn-md btn-outline">View Profile</a
				>
			</p>
		{/if}
	</div>
</div>
