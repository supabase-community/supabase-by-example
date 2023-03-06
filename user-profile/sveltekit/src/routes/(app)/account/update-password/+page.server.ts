import { formatError, fault, success } from '$lib/utils';
import { UpdatePasswordSchema } from '$lib/validationSchema';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	return { session };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;

		try {
			UpdatePasswordSchema.parse({ password, passwordConfirm });
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return fail(400, { errors, password });
			}
		}

		const { error } = await supabase.auth.updateUser({ password });

		if (error) {
			return fail(500, fault('Server error. Try again later.', { email }));
		}

		return success('Your password was updated successfully.');
	}
};
