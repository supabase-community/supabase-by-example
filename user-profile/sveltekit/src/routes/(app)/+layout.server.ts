import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(307, '/auth/signin');
	}

	const user = session?.user;

	// get profile and profile_info
	const { data: profile } = await supabase
		.from('profiles')
		.select(`*, profiles_info(*)`)
		.match({ id: user?.id })
		.maybeSingle();

	// allow only update, update-password, update-email paths
	const allowedPaths = ['/account/update', '/account/update-email', '/account/update-password'];
	if (!allowedPaths.includes(url.pathname)) {
		if (url.pathname !== '/account/update' && profile && profile.display_name == null) {
			throw redirect(307, '/account/update');
		}
	}

	return { profile, website: url.origin };
};
