<script lang="ts">
	export let data;
</script>

<div
	class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
>
	<h2 class="font-semibold text-4xl mb-4">Account</h2>
	<p class="font-medium mb-10">
		Hi {data.session?.user.email}, you can update your email from here
	</p>

	<ul class="divide-y-2 divide-gray-200">
		<li class="flex justify-between hover:bg-blue-600 hover:text-blue-200">
			<a class="block w-full p-3" href="/account/update-email">Update email</a>
		</li>
	</ul>
</div>
