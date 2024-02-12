import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium Vite",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4001" },
    },
    {
      name: "Chromium Core",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4002" },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: "npm run vite:preview",
      url: "http://localhost:4001",
    },
    {
      command: "npm run core:preview",
      url: "http://localhost:4002",
    },
  ],
});
