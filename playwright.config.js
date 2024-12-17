import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  timeout: 30000, 
  use: {
    browserName: 'chromium', 
    headless: false, 
    baseURL: 'http://localhost:3100', 
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure', 
  },
  reporter: [
    ['list'],
    ['allure-playwright'], 
  ],
});


