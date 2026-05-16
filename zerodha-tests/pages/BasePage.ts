import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage – shared helpers inherited by every Page Object Model class.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async reload() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  // ── Waits ─────────────────────────────────────────────────────────────────

  async waitForSelector(selector: string, timeout = 8000) {
    return this.page.waitForSelector(selector, { timeout });
  }

  async waitForText(text: string, timeout = 8000) {
    return this.page.waitForSelector(`text=${text}`, { timeout });
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  async assertTitle(expected: string) {
    await expect(this.page).toHaveTitle(expected);
  }

  async assertUrl(expected: string | RegExp) {
    await expect(this.page).toHaveURL(expected);
  }

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async assertHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async assertText(locator: Locator, text: string | RegExp) {
    await expect(locator).toContainText(text);
  }

  async assertEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  async assertDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  // ── Interactions ──────────────────────────────────────────────────────────

  async clickAndWait(locator: Locator, event = 'networkidle') {
    await locator.click();
    await this.page.waitForLoadState(event as any);
  }

  async fillAndVerify(locator: Locator, value: string) {
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  // ── Screenshot ────────────────────────────────────────────────────────────

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async isElementPresent(selector: string): Promise<boolean> {
    return (await this.page.$$(selector)).length > 0;
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    await this.page.waitForTimeout(500);
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await this.page.waitForTimeout(300);
  }
}
