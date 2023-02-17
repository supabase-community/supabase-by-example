<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadingRelative from '$lib/LoadingRelative.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/dashboard');
		}
	}
</script>

<LoadingRelative />
<section class="fixed z-20 inset-0 overflow-y-auto">
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="fixed inset-0" aria-hidden="true">
			<div class="absolute inset-0 opacity-100" />
		</div>

		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>

		<div class="inline-block align-bottom transform sm:align-middle sm:max-w-2xl">
			<div class="text-center">
				<em class="text-2xl">
					"Because as we know, there are known knowns; there are things we know we know. We also
					know there are known unknowns; that is to say we know there are some things we do not
					know. But there are also unknown unknowns—the ones we don't know we don't know"
				</em>
			</div>
		</div>
	</div>
</section>
