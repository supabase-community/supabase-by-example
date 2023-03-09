import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: profile } = await supabase
		.from('profiles')
		.select(`*, profiles_info(first_name, last_name)`)
		.match({ slug: params.slug })
		.single();

	return { session, profile, website: url.origin };
};
