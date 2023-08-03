<script setup lang="ts">
import { z, ZodError } from 'zod'
import { UpdateEmailSchema } from '~/lib/validationSchema'
import { formatError } from '~/lib/utils';

type FormData = z.infer<typeof UpdateEmailSchema>

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const formData = reactive<FormData>({
    email: "",
    emailConfirm: ""
})
const errors = reactive<FormData>({
    email: "",
    emailConfirm: ""
})
const message = ref("")
const formSuccess = ref(false)

const setErrors = (data: FormData) => {
    errors.email = data.email
    errors.emailConfirm = data.emailConfirm
}

const handleSubmit = async () => {
    // reset all states
    formSuccess.value = false
    setErrors({ email: "", emailConfirm: "" })
    message.value = ""

    try {
        UpdateEmailSchema.parse(formData)
    } catch (err) {
        if (err instanceof ZodError) {
            const errs = formatError(err) as FormData
            setErrors(errs)
            return
        }
    }

    const { error } = await supabase.auth.updateUser({
        email: formData.email,
    })

    if (error) {
        message.value = error.message
        return
    }

    // reset form
    formData.email = ""
    formData.emailConfirm = ""
    formSuccess.value = true
    message.value = "Your email was updated successfully."
}
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <Alert v-if="message" class="mb-10" :class="{ 'alert-info': formSuccess, 'alert-error': !formSuccess }">
            {{ message }}
        </Alert>
        <h2 class="font-semibold text-4xl mb-4">Update Email</h2>
        <p class="font-medium mb-4">
            Hi {{ user.email }}, Enter your new email below and confirm it
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <label for="email" class="label">Email</label>
                <input id="email" name="email" type="text" v-model="formData.email" class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.email">{{ errors.email }}</InputErrorMessage>
            <div class="form-control">
                <label for="emailConfirm" class="label">Confirm Email</label>
                <input id="emailConfirm" name="emailConfirm" type="text" v-model="formData.emailConfirm"
                    class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.emailConfirm">{{ errors.emailConfirm }}</InputErrorMessage>
            <div class="form-control mt-6">
                <button class="btn btn-primary no-animation">Update Email</button>
            </div>
        </form>
    </div>
</template>