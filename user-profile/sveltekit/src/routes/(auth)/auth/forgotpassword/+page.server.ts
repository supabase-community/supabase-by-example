import { fault, formatError, success } from '$lib/utils';
import { ForgotPasswordSchema } from '$lib/validationSchema';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url, locals: { supabase } }) => {
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
			redirectTo: `${url.origin}/logging-in?next=/account/update-password`
		});

		if (error) {
			return fail(500, fault('Server error. Try again later.', { email }));
		}

		return success('Please check your email for a password reset link to log into the website.');
	}
};
