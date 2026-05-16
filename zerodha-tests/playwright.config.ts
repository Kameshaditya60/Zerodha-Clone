import { defineConfig, devices } from '@playwright/test';

/**
 * This repo ships two React apps. Landing (frontend/, :3000) hosts the
 * Login/Signup forms; Dashboard (dashboard/, :3001) is everything post-login.
 * A single baseURL cannot serve both, so we run separate Playwright projects
 * with their own baseURLs.
 */
const LANDING_BASE_URL   = process.env.LANDING_BASE_URL   || 'http://localhost:3000';
const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL || 'http://localhost:3001';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list'],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    // ── Setup: seed dashboard-origin localStorage so Summary.js can read a
    //    known user and any AuthCheck wrapper (currently defined but unused)
    //    would pass. Output: playwright/.auth/dashboard.json ────────────────
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: DASHBOARD_BASE_URL },
    },

    // ── Unauthenticated landing-app tests (login form, accessibility on /login) ──
    {
      name: 'auth-tests',
      testMatch: /auth\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: LANDING_BASE_URL },
    },

    // ── Dashboard-app tests, reusing seeded localStorage ─────────────────────
    {
      name: 'chromium',
      testIgnore: /auth\.(spec|setup)\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: DASHBOARD_BASE_URL,
        storageState: 'playwright/.auth/dashboard.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testIgnore: /auth\.(spec|setup)\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: DASHBOARD_BASE_URL,
        storageState: 'playwright/.auth/dashboard.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-chrome',
      testIgnore: /auth\.(spec|setup)\.ts/,
      use: {
        ...devices['Pixel 5'],
        baseURL: DASHBOARD_BASE_URL,
        storageState: 'playwright/.auth/dashboard.json',
      },
      dependencies: ['setup'],
    },
  ],
});
