<script setup lang="ts">
const supabase = useSupabaseClient();

const handleSignOut = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        await supabase.auth.signOut();
        navigateTo('/auth/signin');
    }
}
</script>

<template>
    <main data-theme="winter">
        <div class="flex flex-col h-screen">
            <div class="navbar border-b border-gray-300 px-4 w-full">
                <div class="flex-1">
                    <h1 class="font-semibold">
                        <NuxtLink to="/">User Profile</NuxtLink>
                    </h1>
                </div>
                <div class="flex-none space-x-10">
                    <NuxtLink class="btn btn-outline" to="/account">Account</NuxtLink>
                    <button class="block no-animation" @click="handleSignOut">Sign out</button>
                </div>
            </div>
            <div class="grid place-items-center my-20 mx-2">
                <slot />
            </div>
        </div>
    </main>
</template>