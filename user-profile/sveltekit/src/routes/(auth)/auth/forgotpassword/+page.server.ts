import { fault, formatError, success } from '$lib/utils';
import { ForgotPasswordSchema } from '$lib/validationSchema';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const { request, url } = event;
		const { supabaseClient: supabase } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email') as string;

		try {
			ForgotPasswordSchema.parse({ email });
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return fail(400, { errors, email });
			}
		}

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/logging-in?redirect=/account/update-password`
		});

		if (error) {
			return fail(500, fault('Server error. Try again later.', { email }));
		}

		return success('Please check your email for a password reset link to log into the website.');
	}
};
