<script lang="ts">
	import type { Profile, ProfileInfo } from '$lib/utils';
	import type { PageData } from './$types';
	import get from 'just-safe-get';

	export let data: PageData;

	const profileInfo = get(data.profile as Profile, 'profiles_info.0') as ProfileInfo;
</script>

<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
	<div class="rounded-lg shadow-xl bg-gray-900 text-white">
		<div class="border-b border-gray-800 px-8 py-3">
			<div class="inline-block w-3 h-3 mr-2 rounded-full bg-red-500" />
			<div class="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300" />
			<div class="inline-block w-3 h-3 mr-2 rounded-full bg-green-400" />
		</div>
		<div class="px-8 py-6">
			<p>
				<em class="text-blue-400">const</em> <span class="text-green-400">aboutMe</span>
				<span class="text-pink-500">=</span> <em class="text-blue-400">function</em>() &#123;
			</p>
			<p>&nbsp;&nbsp;<span class="text-pink-500">return</span> &#123;</p>
			{#if data.profile?.display_name}
				<p>
					&nbsp;&nbsp;&nbsp;&nbsp;display_name: <span class="text-yellow-300"
						>'{data.profile?.display_name}'</span
					>,
				</p>
				{#if profileInfo}
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;first_name: <span class="text-yellow-300"
							>'{profileInfo.first_name}'</span
						>,
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;last_name: <span class="text-yellow-300"
							>'{profileInfo.last_name}'</span
						>,
					</p>
				{/if}

				<p>
					&nbsp;&nbsp;&nbsp;&nbsp;profile: <span class="text-yellow-300"
						>'<a
							href="{data.website}/{data.profile?.slug}"
							class="text-yellow-300 hover:underline focus:border-none"
							>{data.website}/{data.profile?.slug}</a
						>'</span
					>,
				</p>
				<p>
					&nbsp;&nbsp;&nbsp;&nbsp;bio: <span class="text-yellow-300">'{data.profile?.bio}'</span>,
				</p>
			{:else}
				<p>
					&nbsp;&nbsp;&nbsp;&nbsp;error: <span class="text-yellow-300">'No Profile found!'</span>,
				</p>
			{/if}
			<p>&nbsp;&nbsp;&#125;</p>
			<p>&#125;</p>
		</div>
	</div>
</div>
