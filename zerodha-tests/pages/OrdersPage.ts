import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DASHBOARD_URLS } from '../fixtures/constants';

/**
 * Targets dashboard/src/components/Orders.js.
 * The real page is a stub: <div class="orders"><div class="no-orders">
 * <p>You haven't placed any orders today</p>
 * <Link to="/" class="btn">Get started</Link></div></div>.
 *
 * There is no tab bar, no order table, no filters, no search, no inline
 * order-detail panel. The Buy modal (BuyActionWindow) opens elsewhere —
 * triggered from a watchlist-item hover. See BuyWindow below.
 */
export class OrdersPage extends BasePage {
  readonly container:    Locator;
  readonly emptyMessage: Locator;
  readonly getStarted:   Locator;

  constructor(page: Page) {
    super(page);
    this.container    = page.locator('.orders');
    this.emptyMessage = page.locator('.no-orders p');
    this.getStarted   = page.getByRole('link', { name: /get started/i });
  }

  async navigate() {
    await this.goto(DASHBOARD_URLS.orders);
  }
}

/**
 * Targets dashboard/src/components/BuyActionWindow.js.
 * Opened from a watchlist item's "Buy" tooltip; rendered as
 * <div class="container" id="buy-window"> with:
 *   - <input id="qty" type="number">
 *   - <input id="price" type="number" step="0.05">
 *   - Buy / Cancel are <Link> elements (rendered as <a role="link">,
 *     NOT <button>).
 */
export class BuyWindow extends BasePage {
  readonly window:      Locator;
  readonly qtyInput:    Locator;
  readonly priceInput:  Locator;
  readonly buyBtn:      Locator;
  readonly cancelBtn:   Locator;
  readonly marginText:  Locator;

  constructor(page: Page) {
    super(page);
    this.window     = page.locator('#buy-window');
    this.qtyInput   = this.window.locator('#qty');
    this.priceInput = this.window.locator('#price');
    this.buyBtn     = this.window.getByRole('link', { name: /^buy$/i });
    this.cancelBtn  = this.window.getByRole('link', { name: /^cancel$/i });
    this.marginText = this.window.locator('.buttons span');
  }
}
