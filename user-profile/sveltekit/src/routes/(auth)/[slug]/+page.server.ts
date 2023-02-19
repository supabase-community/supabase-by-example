import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { params, url } = event;
	const { session, supabaseClient: supabase } = await getSupabase(event);

	const { data: profile } = await supabase
		.from('profiles')
		.select(`*, profiles_info(first_name, last_name)`)
		.match({ slug: params.slug })
		.single();

	return { session, profile, website: url.origin };
};
