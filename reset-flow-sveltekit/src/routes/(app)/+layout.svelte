<svelte:head>
	<title>Reset Flow</title>
</svelte:head>

<main data-theme="winter">
	<div class="flex flex-col h-screen">
		<div class="navbar border-b border-gray-300 py-8 px-4">
			<div class="flex-1">
				<h1 class="font-semibold">
					<a href="/">Reset Flow</a>
				</h1>
			</div>
			<div class="flex-none space-x-10">
				<a class="btn btn-outline" href="/account">Account</a>
				<a class="block" href="/auth/signout">Sign out</a>
			</div>
		</div>
		<div class="grid place-items-center my-20 mx-2">
			<slot />
		</div>
	</div>
</main>
