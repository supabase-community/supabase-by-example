<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const user = useSupabaseUser()
</script>

<template>
    <h1>Welcome {{ user.email }}</h1>
</template>