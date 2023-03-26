import { formatError, fault, success } from '$lib/utils';
import { UpdateProfileSchema } from '$lib/validationSchema';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const displayName = formData.get('displayName') as string;
		const bio = formData.get('bio') as string;
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const dob = formData.get('dob') as string;
		const profileLocation = formData.get('profileLocation') as string;

		try {
			UpdateProfileSchema.parse({
				displayName,
				bio,
				firstName,
				lastName,
				dob,
				profileLocation
			});
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return fail(400, { errors, displayName, bio, firstName, lastName, dob, profileLocation });
			}
		}

		const { error } = await supabase.rpc('update_profile', {
			display_name: displayName,
			bio,
			first_name: firstName,
			last_name: lastName,
			dob,
			profile_location: profileLocation
		});

		if (error) {
			let errorMessage = 'Server error. Try again later.';
			let displayNameError = null;
			if (error.message.includes('duplicate')) {
				displayNameError = 'Display Name is already in use, please choose a different name';
				errorMessage = '';
			}
			console.log({ error });
			return fail(
				500,
				fault(errorMessage, {
					errors: {
						displayName: displayNameError
					},
					displayName,
					bio,
					firstName,
					lastName,
					dob,
					profileLocation
				})
			);
		}

		return success('Your profile was updated successfully.', {
			displayName,
			bio,
			firstName,
			lastName,
			dob,
			profileLocation
		});
	}
};
