import { test, expect } from '@playwright/test';
import { OrdersPage, BuyWindow } from '../pages/OrdersPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  FEATURE: Orders                                            │
 * │  Targets: Orders.js (empty-state stub) + BuyActionWindow.js │
 * └─────────────────────────────────────────────────────────────┘
 *
 * The Orders page is a stub. The actual order-placement UI is the
 * BuyActionWindow, which is opened from a watchlist item's Buy tooltip
 * on any dashboard route — not from /orders itself.
 */
test.describe('Orders page (empty-state stub)', () => {
  let orders: OrdersPage;

  test.beforeEach(async ({ page }) => {
    orders = new OrdersPage(page);
    await orders.navigate();
  });

  test('TC-ORD-001 | Orders container is rendered', async () => {
    await expect(orders.container).toBeVisible();
  });

  test('TC-ORD-002 | "You haven\'t placed any orders today" message is shown', async () => {
    await expect(orders.emptyMessage).toContainText(/haven['’]t placed any orders today/i);
  });

  test('TC-ORD-003 | "Get started" link routes back to the dashboard summary (/)', async ({ page }) => {
    await orders.getStarted.click();
    await expect(page).toHaveURL(/3001\/?$/);
  });
});

test.describe('Buy action window (opened from watchlist hover)', () => {
  let dashboard: DashboardPage;
  let buyWindow: BuyWindow;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    buyWindow = new BuyWindow(page);
    await dashboard.gotoSummary();
  });

  test('TC-ORD-004 | Hovering a watchlist item and clicking Buy opens the buy window', async ({ page }) => {
    const count = await dashboard.watchlistItems.count();
    test.skip(count === 0, 'watchlist is empty (backend offline + no static fixture)');

    await dashboard.watchlistItems.first().hover();
    await page.locator('.actions button.buy').first().click();

    await expect(buyWindow.window).toBeVisible();
    await expect(buyWindow.qtyInput).toBeVisible();
    await expect(buyWindow.priceInput).toBeVisible();
    await expect(buyWindow.buyBtn).toBeVisible();
    await expect(buyWindow.cancelBtn).toBeVisible();
  });

  test('TC-ORD-005 | Quantity input accepts numeric value', async ({ page }) => {
    const count = await dashboard.watchlistItems.count();
    test.skip(count === 0, 'watchlist is empty');

    await dashboard.watchlistItems.first().hover();
    await page.locator('.actions button.buy').first().click();
    await buyWindow.qtyInput.fill('10');
    await expect(buyWindow.qtyInput).toHaveValue('10');
  });

  test('TC-ORD-006 | Cancel link closes the buy window', async ({ page }) => {
    const count = await dashboard.watchlistItems.count();
    test.skip(count === 0, 'watchlist is empty');

    await dashboard.watchlistItems.first().hover();
    await page.locator('.actions button.buy').first().click();
    await buyWindow.cancelBtn.click();
    await expect(buyWindow.window).toBeHidden();
  });
});
