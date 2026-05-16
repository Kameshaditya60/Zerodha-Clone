import { test as setup } from '@playwright/test';
import path from 'path';
import { TEST_USER } from '../fixtures/constants';

const authFile = path.join(__dirname, '../playwright/.auth/dashboard.json');

/**
 * Seeds dashboard-origin localStorage so:
 *   1. Summary.js can render a deterministic greeting from `user.name`.
 *   2. Any future AuthCheck wrapper (defined in
 *      dashboard/src/components/AuthCheck.js but not currently wired into
 *      Dashboard.js) would pass on `isAuthenticated === "true"`.
 *
 * We intentionally bypass the production OTP/SMS flow because tests must
 * be deterministic and the backend's SMS provider is real.
 */
setup('seed dashboard auth state', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate((user) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userNumber', user.number);
    localStorage.setItem('token', 'fake-test-jwt');
    localStorage.setItem('user', JSON.stringify({
      id:           'test-user-id',
      number:       user.number,
      name:         user.name,
      email:        user.email,
      isVerified:   true,
      isRegistered: true,
    }));
  }, TEST_USER);

  await context.storageState({ path: authFile });
});
