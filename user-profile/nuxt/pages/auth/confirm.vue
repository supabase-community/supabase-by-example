<script setup lang="ts">
const route = useRoute();
const user = useSupabaseUser();

const next = route.query?.next?.toString() ?? '/';

watch(user, () => {
    if (user.value) {
        return navigateTo(next);
    }
}, { immediate: true });
</script>
<template>
    <div>Waiting for login...</div>
</template>
