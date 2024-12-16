// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { execSync } = require("child_process"); // Import child_process for Docker commands

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
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
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3100",
    headless: true, // For debugging, use headless: true for CI
    containerName: "demo-app-container", // Name of the Docker container
    dockerImage: "automaticbytes/demo-app", // Docker image name
    containerPort: 3100, // Port to map the app
    hostPort: 3100, // Host port for the app
    screenshot: "on", // Capture screenshots for all tests
    //video: 'on', // Capture video for all tests
    trace: "on-first-retry", // Optional: Collect trace for debugging
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }, // or 'chrome-beta'
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */

    //{
    //  name: "chromium",
    //  use: { ...devices["Desktop Chrome"] },
    //},
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    //{
    //  name: "webkit",
    //  use: { ...devices["Desktop Safari"] },
    //},
    //{
    //  name: "Microsoft Edge",
    //  use: { ...devices["Desktop Edge"], channel: "msedge" }, // or 'msedge-dev'
    //},
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Add Docker container management hooks */
  globalSetup: require.resolve("./utils/globalSetup"),
  globalTeardown: require.resolve("./utils/globalTeardown"),
});
