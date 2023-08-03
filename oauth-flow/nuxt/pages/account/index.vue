<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 class="font-semibold text-4xl mb-4">Account</h2>
        <p class="font-medium mb-10">
            Hi {{ user.email }}, this is your account page
        </p>
    </div>
</template>