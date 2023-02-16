import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { session } = await getSupabase(event);

	if (!session) {
		throw redirect(303, '/auth/signin');
	}

	return { session };
};
