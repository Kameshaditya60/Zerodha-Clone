import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { TEST_USER } from '../fixtures/constants';

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  FEATURE: Dashboard (dashboard app, port 3001)              │
 * │  Targets: TopBar.js, Menu.js, WatchList.js, Summary.js      │
 * └─────────────────────────────────────────────────────────────┘
 */
test.describe('Dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.gotoSummary();
  });

  // ── TopBar ───────────────────────────────────────────────────────────────

  test('TC-DASH-001 | TopBar shows NIFTY 50 and SENSEX widgets', async () => {
    await expect(dashboard.nifty).toBeVisible();
    await expect(dashboard.sensex).toBeVisible();
    await expect(dashboard.nifty).toContainText('NIFTY 50');
    await expect(dashboard.sensex).toContainText('SENSEX');
  });

  test('TC-DASH-002 | TopBar container is rendered', async () => {
    await expect(dashboard.topbar).toBeVisible();
  });

  // ── Menu / Nav ───────────────────────────────────────────────────────────

  test('TC-DASH-003 | Menu container is rendered', async () => {
    await expect(dashboard.menuContainer).toBeVisible();
  });

  test('TC-DASH-004 | All six primary nav links are present', async () => {
    await expect(dashboard.navDashboard).toBeVisible();
    await expect(dashboard.navOrders).toBeVisible();
    await expect(dashboard.navHoldings).toBeVisible();
    await expect(dashboard.navPositions).toBeVisible();
    await expect(dashboard.navFunds).toBeVisible();
    await expect(dashboard.navApps).toBeVisible();
  });

  test('TC-DASH-005 | Profile section shows avatar and placeholder username', async () => {
    await expect(dashboard.profile).toBeVisible();
    await expect(dashboard.avatar).toBeVisible();
    await expect(dashboard.username).toBeVisible();
  });

  // ── Watchlist ────────────────────────────────────────────────────────────

  test('TC-DASH-006 | Watchlist container is visible on summary', async () => {
    await expect(dashboard.watchlistContainer).toBeVisible();
  });

  test('TC-DASH-007 | Watchlist search input is focusable', async () => {
    await dashboard.watchlistSearch.focus();
    await expect(dashboard.watchlistSearch).toBeFocused();
  });

  test('TC-DASH-008 | Watchlist search accepts and clears input', async () => {
    await dashboard.searchWatchlist('RELIANCE');
    await expect(dashboard.watchlistSearch).toHaveValue('RELIANCE');
    await dashboard.clearWatchlistSearch();
    await expect(dashboard.watchlistSearch).toHaveValue('');
  });

  test('TC-DASH-009 | Watchlist counter renders an "N / 50" badge', async () => {
    await expect(dashboard.watchlistCount).toBeVisible();
    await expect(dashboard.watchlistCount).toContainText('/ 50');
  });

  test('TC-DASH-010 | Hovering a watchlist item reveals buy/sell actions', async ({ page }) => {
    const count = await dashboard.watchlistItems.count();
    test.skip(count === 0, 'watchlist is empty (backend offline + no static fixture)');
    await dashboard.watchlistItems.first().hover();
    await expect(page.locator('.actions button.buy').first()).toBeVisible();
    await expect(page.locator('.actions button.sell').first()).toBeVisible();
  });

  // ── Summary ──────────────────────────────────────────────────────────────

  test('TC-DASH-011 | Summary greets the seeded user by name', async () => {
    // auth.setup.ts seeded user.name = TEST_USER.name
    await expect(dashboard.summaryGreeting).toContainText(TEST_USER.name);
  });

  test('TC-DASH-012 | Summary shows Equity, Holdings, P&L sections', async ({ page }) => {
    await expect(page.getByText(/equity/i).first()).toBeVisible();
    await expect(page.getByText(/holdings \(\d+\)/i)).toBeVisible();
    await expect(page.getByText(/p&l/i).first()).toBeVisible();
  });

  // ── Navigation ───────────────────────────────────────────────────────────

  test('TC-DASH-013 | Click Orders nav → /orders', async ({ page }) => {
    await dashboard.navOrders.click();
    await expect(page).toHaveURL(/\/orders$/);
  });

  test('TC-DASH-014 | Click Holdings nav → /allHoldings (capital H)', async ({ page }) => {
    await dashboard.navHoldings.click();
    await expect(page).toHaveURL(/\/allHoldings$/);
  });

  test('TC-DASH-015 | Click Positions nav → /positions', async ({ page }) => {
    await dashboard.navPositions.click();
    await expect(page).toHaveURL(/\/positions$/);
  });

  test('TC-DASH-016 | Click Funds nav → /funds (relative Link in Menu.js)', async ({ page }) => {
    await dashboard.navFunds.click();
    await expect(page).toHaveURL(/funds$/);
  });

  test('TC-DASH-017 | Click Apps nav → /apps', async ({ page }) => {
    await dashboard.navApps.click();
    await expect(page).toHaveURL(/\/apps$/);
  });
});
