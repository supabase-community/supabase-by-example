<script setup lang="ts">
import { getProfile, generateUrl } from '~/lib/utils';

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

const website = generateUrl(data.value?.profile.slug);
</script>

<template>
    <div class="card w-4/12 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Welcome {{ data?.profile.display_name ?? user?.email }}</h2>
            <template v-if="data?.profile.display_name">
                <p>
                    Name: {{ data.profileInfo.first_name }}
                    {{ data.profileInfo.last_name }}
                </p>
                <p>Display Name: {{ data.profile?.display_name }}</p>
                <p>Dob: {{ data.profileInfo?.dob }}</p>
                <p>Location: {{ data.profileInfo?.profile_location }}</p>
                <h3 class="text-lg font-semibold mt-2">Bio</h3>
                <p>{{ data.profile?.bio }}</p>
                <p class="text-right">
                    <a :href="website" class="btn btn-md btn-outline">View Profile</a>
                </p>
            </template>
        </div>
    </div>
</template>