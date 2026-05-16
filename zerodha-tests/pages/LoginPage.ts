import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LANDING_URLS } from '../fixtures/constants';

/**
 * Targets frontend/src/landing_page/Login/LoginForm.js.
 * Reality check from that component:
 *   - The "user id" field is actually a mobile number (#number, type="number").
 *   - handleChange rejects ANY input containing non-digit characters — the
 *     whole entry is dropped if a non-digit is present.
 *   - The Login button is disabled until formData.number.length === 10
 *     (password length is NOT factored in).
 *   - There is no PIN/2FA step, no "Continue" button, no remember-me.
 *   - Errors render in <div class="alert alert-danger">.
 *   - "Forgot Password?" triggers a window.alert() — no navigation.
 */
export class LoginPage extends BasePage {
  readonly numberInput:    Locator;
  readonly passwordInput:  Locator;
  readonly loginBtn:       Locator;
  readonly forgotPassword: Locator;
  readonly switchToSignup: Locator;
  readonly errorAlert:     Locator;
  readonly numberLabel:    Locator;
  readonly passwordLabel:  Locator;

  constructor(page: Page) {
    super(page);
    this.numberInput    = page.locator('#number');
    this.passwordInput  = page.locator('#password');
    this.loginBtn       = page.getByRole('button', { name: /^login$/i });
    this.forgotPassword = page.getByRole('button', { name: /forgot password/i });
    this.switchToSignup = page.getByRole('button', { name: /sign up/i });
    this.errorAlert     = page.locator('.alert.alert-danger');
    this.numberLabel    = page.locator('label[for="number"]');
    this.passwordLabel  = page.locator('label[for="password"]');
  }

  async navigate() {
    await this.goto(LANDING_URLS.login);
  }

  async enterNumber(num: string) {
    await this.numberInput.fill(num);
  }

  async enterPassword(pwd: string) {
    await this.passwordInput.fill(pwd);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async loginWith(num: string, pwd: string) {
    await this.enterNumber(num);
    await this.enterPassword(pwd);
    await this.clickLogin();
  }

  async assertOnLoginPage() {
    await expect(this.numberInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
  }

  async assertPasswordMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async assertErrorVisible(message?: RegExp | string) {
    await expect(this.errorAlert).toBeVisible();
    if (message) await expect(this.errorAlert).toContainText(message);
  }
}
