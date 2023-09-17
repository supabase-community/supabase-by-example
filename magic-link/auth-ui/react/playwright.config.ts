import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
    reuseExistingServer: true,
  },
  testDir: "./tests",
  reporter: "list",

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
