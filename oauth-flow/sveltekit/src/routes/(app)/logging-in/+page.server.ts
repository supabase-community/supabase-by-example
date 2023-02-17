import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session } = await getSupabase(event);

	return { session };
};
