<svelte:head>
	<title>User Profile</title>
</svelte:head>

<main data-theme="winter">
	<div class="flex flex-col h-screen">
		<div class="navbar border-b border-gray-300 py-8 px-4">
			<div class="flex-1">
				<h1 class="font-semibold">
					<a href="/">User Profile</a>
				</h1>
			</div>
			<div class="flex-none space-x-10">
				<a class="btn btn-outline" href="/account">Account</a>
				<form action="/auth/signout" method="post">
					<button class="btn btn-ghost">Sign out</button>
				</form>
			</div>
		</div>
		<div class="grid place-items-center my-20 mx-2">
			<slot />
		</div>
	</div>
</main>
