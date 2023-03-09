import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { supabase } }) => {
	const { session } = await parent();
	if (session) {
		await supabase.auth.signOut();
		throw redirect(303, '/auth/signin');
	}
};
