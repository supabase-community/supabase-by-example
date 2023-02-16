import type { ZodError } from 'zod';

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
