import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(307, '/auth/signin');
	}

	return { session };
};
