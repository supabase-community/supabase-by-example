import type {
  AuthUserSchema
} from "@/lib/validationSchema";
import { expect, type Page } from "@playwright/test";
import type { z } from "zod";
import { faker } from "@faker-js/faker";
import tcpPortUsed from "tcp-port-used";

type AuthUser = z.infer<typeof AuthUserSchema>;
type Auth = AuthUser & { page: Page; prefix?: string };

export const generateRandomEmail = (prefix = "test") =>
  `${prefix}+${faker.internet.exampleEmail()}`.toLocaleLowerCase();

export async function startSupabase() {
  const inUse = await tcpPortUsed.check(54321);
  if (inUse) {
    return;
  }
  console.warn(
    "Supabase not detected on its default port 54321 - Please start using the Supabase CLI"
  );
}

export async function signIn({ page, email, prefix }: Auth) {
  await page.getByLabel("Email").fill(email);
  await page.keyboard.press("Enter");
  const successNotice = page.getByText(
    "Please check your email for a magic link to log into the website."
  );
  await expect(successNotice).toHaveCount(1);
  await checkConfirmationEmail(page, prefix);
  const welcomeNotice = page.getByRole("heading", { name: `Welcome ${email}` });
  await expect(welcomeNotice).toHaveText(`Welcome ${email}`);
  const logoutButton = page.getByRole("button", { name: "Sign out" });
  await expect(logoutButton).toHaveCount(1);
}

export async function signInWithCode({ page, email, prefix }: Auth) {
  await page.getByLabel("Email").fill(email);
  await page.keyboard.press("Enter");
  const successNotice = page.getByText(
    "Please check your email for a magic link to log into the website."
  );
  await expect(successNotice).toHaveCount(1);
  const token = await checkConfirmationCodeEmail(page, prefix);
  await page.goto("/auth/verify-token");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Token").fill(token as string);
  await page.keyboard.press("Enter");
  const welcomeNotice = page.getByRole("heading", { name: `Welcome ${email}` });
  await expect(welcomeNotice).toHaveText(`Welcome ${email}`);
  const logoutButton = page.getByRole("button", { name: "Sign out" });
  await expect(logoutButton).toHaveCount(1);
}

export async function signOut(page: Page) {
  const logoutButton = page.getByRole("button", { name: "Sign out" });
  await expect(logoutButton).toHaveText("Sign out");
  await logoutButton.click();
  await page.waitForURL("/auth/signin");
}

async function checkConfirmationEmail(page: Page, prefix = "test") {
  await page.goto(`http://localhost:54324/m/${prefix}`);
  await page.locator(".message-list > :first-child").click();
  await page.getByRole("link", { name: "Confirm your email address" }).click();
}

async function checkConfirmationCodeEmail(page: Page, prefix = "test") {
  await page.goto(`http://localhost:54324/m/${prefix}`);
  await page.locator(".message-list > :first-child").click();
  const code = await page
    .getByText("Alternatively, enter the code")
    .textContent();
  const token = code?.split(":").pop()?.trim();
  return token;
}
