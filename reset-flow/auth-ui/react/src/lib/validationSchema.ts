import { z } from 'zod';
import { email, password } from './validationRules';

export const AuthUserSchema = z.object({
	email: email(),
	password: password(6)
});

export const ForgotPasswordSchema = z.object({
	email: email()
});

export const UpdatePasswordSchema = z
	.object({
		password: password(6),
		passwordConfirm: password(6, 'Confirm Password')
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password does not match',
				path: ['passwordConfirm']
			});
		}
	});

export const UpdateEmailSchema = z
	.object({
		email: email(),
		emailConfirm: email('Confirm Email')
	})
	.superRefine(({ email, emailConfirm }, ctx) => {
		if (email !== emailConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Email Address does not match',
				path: ['emailConfirm']
			});
		}
	});
