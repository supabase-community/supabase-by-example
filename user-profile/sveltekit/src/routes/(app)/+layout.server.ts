import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { url } = event;
	const { session, supabaseClient: supabase } = await getSupabase(event);

	const user = session?.user;

	// get profile and profile_info
	const { data: profile } = await supabase
		.from('profiles')
		.select(`*, profiles_info(*)`)
		.match({ id: user?.id })
		.maybeSingle();

	if (url.pathname !== '/account/update' && profile && profile.display_name == null) {
		throw redirect(307, '/account/update');
	}

	return { session, profile, website: url.origin };
};
