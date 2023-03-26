import { formatError, fault, success } from '$lib/utils';
import { UpdateEmailSchema } from '$lib/validationSchema';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const emailConfirm = formData.get('emailConfirm') as string;

		try {
			UpdateEmailSchema.parse({ email, emailConfirm });
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return fail(400, { errors, email, emailConfirm });
			}
		}

		const { error } = await supabase.auth.updateUser({ email });

		if (error) {
			return fail(500, fault('Server error. Try again later.', { email }));
		}

		return success('Your email was updated successfully.');
	}
};
