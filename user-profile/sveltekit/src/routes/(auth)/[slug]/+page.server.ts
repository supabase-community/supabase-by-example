import get from 'just-safe-get';
import type { PageServerLoad } from './$types';
import type { Profile, ProfileInfo } from '$lib/utils';

export const load: PageServerLoad = async ({ params, url, locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: profile } = await supabase
		.from('profiles')
		.select(`*, profiles_info(first_name, last_name)`)
		.match({ slug: params.slug })
		.single();

	const profileInfo = get(profile as Profile, 'profiles_info') as ProfileInfo;

	return { session, profile, profileInfo, website: url.origin };
};
