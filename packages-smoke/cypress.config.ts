import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    // CI-friendly defaults
    chromeWebSecurity: false,
    // Increase timeouts for CI stability
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    // Retry configuration for flaky tests
    retries: {
      runMode: 2, // Retry failed tests in CI
      openMode: 0, // No retries in development
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
