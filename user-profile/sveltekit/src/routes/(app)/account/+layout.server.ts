import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session) {
		throw redirect(307, '/auth/signin');
	}

	return { session };
};
