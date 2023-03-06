import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, parent }) => {
	const { session } = await parent();

	// only allow the signout subpath when visiting the auth path
	if (url.pathname !== '/auth/signout' && session) {
		throw redirect(303, '/');
	}
};
