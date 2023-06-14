import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import {
  signUp,
  signIn,
  signOut,
  startSupabase,
  generateRandomEmail,
  generateRandomDob,
  generateRandomLocation,
} from "./utils.js";

test.describe("User profile", () => {
  const prefix = "up";
  const password = "password123";
  test.beforeAll(startSupabase);
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("new user can signup and create profile", async ({ page }) => {
    const displayName = faker.person.fullName();
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
    await page.getByLabel("First Name").fill(faker.person.firstName());
    await page.getByLabel("Last Name").fill(faker.person.lastName());
    await page.getByLabel("Display Name").fill(displayName);
    await page.getByLabel("Bio").fill(faker.lorem.sentence());
    await page.getByLabel("Date of birth").fill(generateRandomDob());
    await page.getByLabel("Location").fill(generateRandomLocation());
    await page.keyboard.press("Enter");
    const successNotice = page.getByText(
      "Your profile was updated successfully."
    );
    await expect(successNotice).toHaveCount(1);
    await page.getByRole("link", { name: "User Profile" }).click();
    const welcomeNotice = page.getByRole("heading", {
      name: `Welcome ${displayName}`,
    });
    await expect(welcomeNotice).toHaveText(`Welcome ${displayName}`);
  });

  test("new user cannot see landing page if profile is not setup", async ({
    page,
  }) => {
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
    await page.getByRole("link", { name: "User Profile" }).click();
    const welcomeNotice = page.getByRole("heading", {
      name: `Please complete your profile`,
    });
    await expect(welcomeNotice).toHaveText(`Please complete your profile`);
    await signOut(page);
    await signIn({ page, email, password });
    await expect(welcomeNotice).toHaveText(`Please complete your profile`);
  });

  test("user has a profile page", async ({ page }) => {
    const displayName = faker.person.fullName();
    const email = generateRandomEmail(prefix);
    await signUp({ page, email, password, prefix });
    await page.getByLabel("First Name").fill(faker.person.firstName());
    await page.getByLabel("Last Name").fill(faker.person.lastName());
    await page.getByLabel("Display Name").fill(displayName);
    await page.getByLabel("Bio").fill(faker.lorem.sentence());
    await page.getByLabel("Date of birth").fill(generateRandomDob());
    await page.getByLabel("Location").fill(generateRandomLocation());
    await page.keyboard.press("Enter");
    const successNotice = page.getByText(
      "Your profile was updated successfully."
    );
    await expect(successNotice).toHaveCount(1);
    await page.getByRole("link", { name: "User Profile" }).click();
    const welcomeNotice = page.getByRole("heading", {
      name: `Welcome ${displayName}`,
    });
    await expect(welcomeNotice).toHaveText(`Welcome ${displayName}`);
    await page.getByRole("link", { name: "View Profile" }).click();
    const profileInfo = page.getByText(`display_name: '${displayName}'`);
    await expect(profileInfo).toHaveCount(1);
  });
});
