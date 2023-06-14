import { test, expect } from "@playwright/test";
import {
  signUp,
  signIn,
  signOut,
  startSupabase,
  generateRandomEmail,
} from "./utils.js";

test.describe("Sign up user", () => {
  const prefix = "signup";
  const password = "password123";
  test.beforeAll(startSupabase);
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("new user can signup", async ({ page }) => {
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
  });

  test("after signing up, user can login from another machine", async ({
    page,
  }) => {
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
    await signOut(page);
    await signIn({ page, email, password });
  });

  test("user is logged in on a new tab", async ({ context, page }) => {
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
    const newTab = await context.newPage();
    await newTab.goto("/");
    const logoutButton = newTab.getByRole("button", { name: "Sign out" });
    await expect(logoutButton).toHaveCount(1);
  });

  test('a logged out user goes to "/auth/sign" if they visit "/"', async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForURL("/auth/signin");
    const signInHeading = page.getByRole("heading", {
      name: "Sign in",
    });
    await expect(signInHeading).toHaveText("Sign in");
  });
});

test.describe("Not logged in user", () => {
  test("cannot access update email page", async ({ page }) => {
    await page.goto("/account/update-email");
    const signInHeading = page.getByRole("heading", {
      name: "Sign in",
    });
    await expect(signInHeading).toHaveText("Sign in");
  });

  test("cannot access update password page", async ({ page }) => {
    await page.goto("/account/update-password");
    const signInHeading = page.getByRole("heading", {
      name: "Sign in",
    });
    await expect(signInHeading).toHaveText("Sign in");
  });
});
