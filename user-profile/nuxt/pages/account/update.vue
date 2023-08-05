<script setup lang="ts">
import { z, ZodError } from 'zod';
import { UpdateProfileSchema } from '~/lib/validationSchema';
import { formatError, getProfile } from '~/lib/utils';

definePageMeta({
    middleware: 'auth'
});

type FormData = z.infer<typeof UpdateProfileSchema>;

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

// fetch profile data
const { data } = await useAsyncData('profile', async () => {
    const data = await getProfile(supabase);
    return data;
});

const formData = reactive<FormData>({
    firstName: data.value?.profileInfo.first_name ?? "",
    lastName: data.value?.profileInfo.last_name ?? "",
    profileLocation: data.value?.profileInfo.profile_location ?? "",
    displayName: data.value?.profile.display_name ?? "",
    dob: data.value?.profileInfo.dob ?? "",
    bio: data.value?.profile.bio ?? ""
});
const errors = reactive<FormData>({
    firstName: "",
    lastName: "",
    profileLocation: "",
    displayName: "",
    dob: "",
    bio: ""
});
const message = ref("");
const formSuccess = ref(false);

const setErrors = (data: FormData) => {
    errors.firstName = data.firstName;
    errors.lastName = data.lastName;
    errors.profileLocation = data.profileLocation;
    errors.displayName = data.displayName;
    errors.dob = data.dob;
    errors.bio = data.bio;
}

const handleSubmit = async () => {
    // reset all states
    formSuccess.value = false;
    setErrors({
        firstName: "",
        lastName: "",
        profileLocation: "",
        displayName: "",
        dob: "",
        bio: ""
    });
    message.value = "";

    try {
        UpdateProfileSchema.parse(formData);
    } catch (err) {
        if (err instanceof ZodError) {
            const errs = formatError(err) as FormData;
            setErrors(errs);
            return;
        }
    }

    const { error } = await supabase.rpc("update_profile", {
        display_name: formData.displayName,
        bio: formData.bio ?? "",
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dob,
        profile_location: formData.profileLocation,
    });


    if (error) {
        message.value = error.message;
        return;
    }

    // reset form
    formSuccess.value = true;
    message.value = "Your profile was updated successfully.";
}
</script>

<template>
    <div class="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <Alert v-if="message" class="mb-10" :class="{ 'alert-info': formSuccess, 'alert-error': !formSuccess }">
            {{ message }}
        </Alert>
        <h2 class="font-semibold text-4xl mb-4">
            {{ data?.profile.display_name
                ? "Update Profile"
                : "Please complete your profile" }}
        </h2>
        <p class="font-medium mb-4">
            Hi {{ data?.profile.display_name ?? user.email }}, Enter your user profile info
            below
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="mb-4 md:grid md:grid-cols-6 gap-4">
                <div class="col-span-6 sm:col-span-3">
                    <div class="form-control">
                        <label for="first_name" class="label">First Name</label>
                        <input id="first_name" name="firstName" type="text" v-model="formData.firstName"
                            class="input input-bordered" />
                    </div>
                    <InputErrorMessage v-if="errors.firstName">{{ errors.firstName }}</InputErrorMessage>
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <div class="form-control">
                        <label for="last_name" class="label">Last Name</label>
                        <input id="last_name" name="lastName" type="text" v-model="formData.lastName"
                            class="input input-bordered" />
                    </div>
                    <InputErrorMessage v-if="errors.lastName">{{ errors.lastName }}</InputErrorMessage>
                </div>
            </div>
            <div class="form-control">
                <label for="display_name" class="label">Display Name</label>
                <input id="display_name" name="displayName" type="text" v-model="formData.displayName"
                    class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.displayName">{{ errors.displayName }}</InputErrorMessage>
            <div class="form-control">
                <label for="bio" class="label">Bio</label>
                <textarea id="bio" name="bio" class="textarea textarea-bordered textarea-lg w-full"
                    v-model="formData.bio" />
            </div>
            <InputErrorMessage v-if="errors.bio">{{ errors.bio }}</InputErrorMessage>
            <div class="form-control">
                <label for="dob" class="label">Date of birth</label>
                <input id="dob" name="dob" type="text" v-model="formData.dob" class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.dob">{{ errors.dob }}</InputErrorMessage>
            <div class="form-control">
                <label for="profile_location" class="label">Location</label>
                <input id="profile_location" name="profileLocation" type="text" v-model="formData.profileLocation"
                    class="input input-bordered" />
            </div>
            <InputErrorMessage v-if="errors.profileLocation">{{ errors.profileLocation }}</InputErrorMessage>
            <div class="form-control mt-6">
                <button class="btn btn-primary no-animation">Update</button>
            </div>
        </form>
    </div>
</template>