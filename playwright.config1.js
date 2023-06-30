// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: 'firefox execution',
      use: {
        baseURL: 'https://tcsoftware-dev-ed.develop.lightning.force.com',
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      }
    },
    {
      name: 'safari',
      use: {
        baseURL: 'https://tcsoftware-dev-ed.develop.lightning.force.com',
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 12']
      }
    },
    {
      name: 'chrome',
      use: {
        baseURL: 'https://tcsoftware-dev-ed.develop.lightning.force.com',
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation']
      }
    }
  ]



});

