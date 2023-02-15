import { test, expect } from '@playwright/test';
import {
	signUp,
	signIn,
	signOut,
	forgotPassword,
	startSupabase,
	generateRandomEmail
} from './utils.js';

test.describe('Password reset flow', () => {
	const prefix = 'reset';
	const password = 'password123';
	const newPassword = 'password';
	test.beforeAll(startSupabase);

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('after signing up, go to forgot password', async ({ page }) => {
		const email = generateRandomEmail(prefix);
		await signUp({ page, email, password, prefix });
		await signOut(page);
		await forgotPassword({ page, email, prefix });
	});

	test('update password and login with new password', async ({ page }) => {
		const email = generateRandomEmail(prefix);
		await signUp({ page, email, password, prefix });
		await signOut(page);
		await forgotPassword({ page, email, prefix });
		await page.getByLabel('Password', { exact: true }).fill(newPassword);
		await page.getByLabel('Confirm Password').fill(newPassword);
		await page.keyboard.press('Enter');
		const successNotice = page.getByText('Your password was updated successfully.');
		await expect(successNotice).toHaveCount(1);
		await page.getByRole('link', { name: 'Sign out' }).click();
		await signIn({ page, email, password: newPassword });
	});
});
