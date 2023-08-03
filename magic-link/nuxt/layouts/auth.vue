<template>
    <main data-theme="winter">
        <div class="flex flex-col h-screen">
            <div class="header border-b border-gray-300 py-8 px-4 mx-8 text-center">
                <h1 class="font-semibold">Magic Link + Otp Flow</h1>
            </div>
            <div class="grid place-items-center my-20 mx-2 sm:my-auto">
                <slot />
            </div>
        </div>
    </main>
</template>