import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { url } = event;
	const { session } = await getSupabase(event);

	// only allow the signout subpath when visiting the auth path
	if (url.pathname !== '/auth/signout' && session) {
		throw redirect(303, '/');
	}
};
