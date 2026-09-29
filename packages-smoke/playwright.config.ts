import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4400',
  },
  webServer: {
    command: 'npm run start -- --host 127.0.0.1 --port 4400',
    url: 'http://127.0.0.1:4400',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
