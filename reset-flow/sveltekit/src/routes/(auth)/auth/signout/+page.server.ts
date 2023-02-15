import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { supabaseClient: supabase, session } = await getSupabase(event);
	if (session) {
		await supabase.auth.signOut();
		throw redirect(303, '/auth/signin');
	}
};
