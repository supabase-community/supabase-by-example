import type { ZodError } from 'zod';
import type { Database } from './schema';

export const formatError = (zodError: ZodError) => {
	const formattedErrors: Record<string, string> = {};
	zodError.errors.forEach((err) => {
		const k = err.path.pop() as string;
		if (formattedErrors[k] == null) {
			formattedErrors[k] = err.message;
		}
	});
	return formattedErrors;
};

export const success = <T extends Record<string, unknown> | undefined>(
	message: string,
	data?: T
) => ({
	success: true,
	message,
	...data
});

export const fault = <T extends Record<string, unknown> | undefined>(
	message: string,
	data?: T
) => ({
	success: false,
	message,
	...data
});

export type ProfileInfo = Database['public']['Tables']['profiles_info']['Row'];
export type Profiles = Database['public']['Tables']['profiles']['Row'];
export type Profile = Profiles & { profiles_info: ProfileInfo | ProfileInfo[] | null };

export const getProperty = <T extends object, K extends keyof T>(obj: T, key: K) => {
	if (obj && obj?.[key]) {
		// here we guard to make sure its not null
		if (!Array.isArray(obj[key])) {
			// here we guard to make sure it isn't an array
			return obj[key];
		}
	}
	return null;
};
