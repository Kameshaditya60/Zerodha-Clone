import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LANDING_URLS } from '../fixtures/constants';

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  FEATURE: Login (landing app, port 3000)                    │
 * │  Targets: frontend/src/landing_page/Login/LoginForm.js      │
 * └─────────────────────────────────────────────────────────────┘
 *
 * The real form uses 10-digit mobile + password (no email, no PIN, no 2FA).
 * The Login button is disabled until the number is exactly 10 digits.
 * Non-digit input is silently dropped by handleChange in LoginForm.js.
 */
test.describe('Login (landing app)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-AUTH-001 | Login form renders number + password + submit', async () => {
    await loginPage.assertOnLoginPage();
  });

  test('TC-AUTH-002 | Password field is masked', async () => {
    await loginPage.assertPasswordMasked();
  });

  test('TC-AUTH-003 | Login button is disabled before number reaches 10 digits', async () => {
    await expect(loginPage.loginBtn).toBeDisabled();
    await loginPage.enterNumber('12345');
    await expect(loginPage.loginBtn).toBeDisabled();
  });

  test('TC-AUTH-004 | Login button enables once a 10-digit number is entered', async () => {
    await loginPage.enterNumber('9876543210');
    await expect(loginPage.loginBtn).toBeEnabled();
  });

  test('TC-AUTH-005 | Submitting unregistered credentials surfaces an error', async () => {
    // Requires the backend (port 5000) to be running so the request reaches it.
    // If backend is down, the catch branch in LoginForm.js still shows an error.
    await loginPage.loginWith('6000000001', 'WrongPass!');
    await expect(loginPage.errorAlert).toBeVisible({ timeout: 10_000 });
  });

  test('TC-AUTH-006 | Both inputs have associated <label for=...>', async () => {
    await expect(loginPage.numberLabel).toBeVisible();
    await expect(loginPage.passwordLabel).toBeVisible();
  });

  test('TC-AUTH-007 | Forgot Password button fires an alert dialog', async ({ page }) => {
    let dialogText = '';
    page.once('dialog', async (dialog) => {
      dialogText = dialog.message();
      await dialog.dismiss();
    });
    await loginPage.forgotPassword.click();
    // Give the alert a moment to fire.
    await page.waitForTimeout(200);
    expect(dialogText).toMatch(/forgot password/i);
  });

  test('TC-AUTH-008 | Page URL is /login (not the marketing home /)', async ({ page }) => {
    expect(page.url()).toContain(LANDING_URLS.login);
  });

  test('TC-AUTH-009 | Login page has a heading announcing the form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /login to zerodha/i })).toBeVisible();
  });
});
