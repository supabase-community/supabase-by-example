<script setup lang="ts">
import { z, ZodError } from 'zod';
import { UpdatePasswordSchema } from '~/lib/validationSchema';
import { formatError } from '~/lib/utils';

definePageMeta({
    middleware: 'auth'
});

type FormData = z.infer<typeof UpdatePasswordSchema>;

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const formData = reactive<FormData>({
    password: "",
    passwordConfirm: ""
});
const errors = reactive<FormData>({
    password: "",
    passwordConfirm: ""
});
const message = ref("");
const formSuccess = ref(false);

const setErrors = (data: FormData) => {
    errors.password = data.password;
    errors.passwordConfirm = data.passwordConfirm;
}

const handleSubmit = async () => {
    // reset all states
    formSuccess.value = false;
    setErrors({ password: "", passwordConfirm: "" });
    message.value = "";

    try {
        UpdatePasswordSchema.parse(formData);
    } catch (err) {
        if (err instanceof ZodError) {
            const errs = formatError(err) as FormData;
            setErrors(errs);
            return;
        }
    }

    const { error } = await supabase.auth.updateUser({
        password: formData.password,
    });

    if (error) {
        message.value = error.message;
        return;
    }

    // reset form
    formData.password = "";
    formData.passwordConfirm = "";
    formSuccess.value = true;
    message.value = "Your password was updated successfully.";
}
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <Alert v-if="message" class="mb-10" :class="{ 'alert-info': formSuccess, 'alert-error': !formSuccess }">
            {{ message }}
        </Alert>
        <h2 class="font-semibold text-4xl mb-4">Update Password</h2>
        <p class="font-medium mb-4">
            Hi {{ user.email }}, Enter your new password below and confirm it
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="form-control">
                <label for="password" class="label">Password</label>
                <input id="password" name="password" type="password" v-model="formData.password"
                    class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.password">{{ errors.password }}</InputErrorMessage>
            <div class="form-control">
                <label for="passwordConfirm" class="label">Confirm Password</label>
                <input id="passwordConfirm" name="passwordConfirm" type="password" v-model="formData.passwordConfirm"
                    class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</InputErrorMessage>
            <div class="form-control mt-6">
                <button class="btn btn-primary no-animation">Update Password</button>
            </div>
        </form>
    </div>
</template>