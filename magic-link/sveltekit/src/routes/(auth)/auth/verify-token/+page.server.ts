import { fault, formatError } from '$lib/utils';
import { AuthUserWithTokenSchema } from '$lib/validationSchema';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const { supabaseClient: supabase } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const token = formData.get('token') as string;

		try {
			AuthUserWithTokenSchema.parse({ email, token });
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return fail(400, { errors, email });
			}
		}

		const { error } = await supabase.auth.verifyOtp({
			email,
			token,
			type: 'magiclink'
		});

		if (error) {
			return fail(500, fault(error.message, { email }));
		}

		throw redirect(307, '/');
	}
};
