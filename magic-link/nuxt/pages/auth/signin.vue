<script setup lang="ts">
import { z, ZodError } from 'zod'
import { AuthUserSchema } from '~/lib/validationSchema'
import { formatError } from '~/lib/utils';

definePageMeta({
    layout: "auth",
})

type FormData = z.infer<typeof AuthUserSchema>

const supabase = useSupabaseClient()
const formData = reactive<FormData>({
    email: ""
})
const errors = reactive<FormData>({
    email: ""
})
const message = ref("")
const formSuccess = ref(false)

const setErrors = (data: FormData) => {
    errors.email = data.email
}

const handleSubmit = async () => {
    // reset all states
    formSuccess.value = false
    setErrors({ email: "" })
    message.value = ""

    try {
        AuthUserSchema.parse(formData)
    } catch (err) {
        if (err instanceof ZodError) {
            const errs = formatError(err) as FormData
            setErrors(errs)
            return
        }
    }

    const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
            emailRedirectTo: `${useRuntimeConfig().public.baseUrl}/auth/confirm`
        }
    })

    if (error) {
        message.value = error.message
        return
    }

    // reset form
    formData.email = ""
    formSuccess.value = true
    message.value = "Please check your email for a magic link to log into the website."
}
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <Alert v-if="message" class="mb-10" :class="{ 'alert-info': formSuccess, 'alert-error': !formSuccess }">
            {{ message }}
        </Alert>
        <h2 class="font-semibold text-4xl mb-4">Sign in</h2>
        <p class="font-medium mb-4">Hi, Welcome back</p>
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <label for="email" class="label">Email</label>
                <input id="email" name="email" type="text" v-model="formData.email" class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.email">{{ errors.email }}</InputErrorMessage>
            <div class="form-control mt-6">
                <button class="btn btn-primary no-animation">Sign in</button>
            </div>
        </form>
    </div>
</template>