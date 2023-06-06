import { test, expect } from '@playwright/test';
import { signIn, signOut, startSupabase, generateRandomEmail, signInWithCode } from './utils.js';

test.describe('Sign in user', () => {
	const prefix = 'signin';
	test.beforeAll(startSupabase);
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('signs in using magic link from email', async ({ page }) => {
		const email = generateRandomEmail(prefix);
		await signIn({ page, email, prefix });
	});

	test('user is logged in on a new tab', async ({ context, page }) => {
		const email = generateRandomEmail(prefix);
		await signIn({ page, email, prefix });
		const newTab = await context.newPage();
		await newTab.goto('/');
		const logoutButton = newTab.getByRole('button', { name: 'Sign out' });
		await expect(logoutButton).toHaveCount(1);
	});

	test('a logged out user goes to "/auth/sign" if they visit "/"', async ({ page }) => {
		await page.goto('/');
		await page.waitForURL('/auth/signin');
		const signInHeading = page.getByRole('heading', {
			name: 'Sign in'
		});
		await expect(signInHeading).toHaveText('Sign in');
	});
});

test.describe('Not logged in user', () => {
	test('cannot access update email page', async ({ page }) => {
		await page.goto('/account/update-email');
		const signInHeading = page.getByRole('heading', {
			name: 'Sign in'
		});
		await expect(signInHeading).toHaveText('Sign in');
	});
});

test.describe('User logs in using the otp flow', () => {
	const prefix = 'signin';
	test.beforeAll(startSupabase);
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('signs in using the otp token', async ({ page }) => {
		const email = generateRandomEmail(prefix);
		await signIn({ page, email, prefix });
		await signOut(page);
		await signInWithCode({ page, email, prefix });
	});
});
