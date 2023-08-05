<script setup lang="ts">
import { getProfile } from '~/lib/utils';

definePageMeta({
    middleware: 'auth'
});

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

// fetch profile data
const { data } = await useAsyncData('profile', async () => {
    const data = await getProfile(supabase);
    return data;
});
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 class="font-semibold text-4xl mb-4">Account</h2>
        <p class="font-medium mb-10">
            Hi {{ data?.profile.display_name ?? user.email }}, you can update your profile, email or password from here
        </p>

        <ul class="divide-y-2 divide-gray-200">
            <li class="flex justify-between hover:bg-blue-600 hover:text-blue-200">
                <NuxtLink class="block w-full p-3" to="/account/update">Update</NuxtLink>
            </li>
            <li class="flex justify-between hover:bg-blue-600 hover:text-blue-200">
                <NuxtLink class="block w-full p-3" to="/account/update-email">Update email</NuxtLink>
            </li>
            <li class="flex justify-between hover:bg-blue-600 hover:text-blue-200">
                <NuxtLink class="block w-full p-3" to="/account/update-password">Update password</NuxtLink>
            </li>
        </ul>
    </div>
</template>