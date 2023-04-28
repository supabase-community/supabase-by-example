import { fault } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Provider } from '@supabase/supabase-js';

export const actions: Actions = {
	default: async ({ url, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider;

		const options: { redirectTo: string; scopes?: string } = {
			redirectTo: `${url.origin}/auth/callback`
		};

		if (provider === 'azure') {
			options.scopes = 'email';
		}

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options
		});

		if (error) {
			return fail(500, fault('Server error. Try again later.'));
		}

		throw redirect(303, data.url);
	}
};
