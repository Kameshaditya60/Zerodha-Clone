import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DASHBOARD_URLS } from '../fixtures/constants';

/**
 * Targets dashboard/src/components/Funds.js.
 * Reality from that component:
 *   - <div class="funds"> hero block with:
 *       <p>Instant, zero-cost fund transfers with UPI</p>
 *       <Link class="btn btn-green">Add funds</Link>      ← <a>, not <button>
 *       <Link class="btn btn-blue">Withdraw</Link>        ← <a>, not <button>
 *   - <div class="row"> with two <div class="col">:
 *       - Equity column: <div class="table"> with stacked
 *           <div class="data"><p>label</p><p>value</p></div> rows
 *           (Available margin, Used margin, Available cash, ..., Total Collateral)
 *       - Commodity column: <div class="commodity">
 *           <p>You don't have a commodity account</p>
 *           <Link class="btn btn-blue">Open Account</Link>
 *
 * There is no tab bar, no Add-funds modal, no amount input, no bank select.
 * NOTE: There is intentionally NO ChargesPage export — the dashboard does not
 * have a charges or brokerage-calculator screen in this codebase.
 */
export class FundsPage extends BasePage {
  readonly heroContainer:   Locator;
  readonly addFundsLink:    Locator;
  readonly withdrawLink:    Locator;
  readonly equityColumn:    Locator;
  readonly equityTable:     Locator;
  readonly equityRows:      Locator;
  readonly commodityColumn: Locator;
  readonly commodityNotice: Locator;
  readonly openAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heroContainer   = page.locator('.funds');
    this.addFundsLink    = page.getByRole('link', { name: /add funds/i });
    this.withdrawLink    = page.getByRole('link', { name: /withdraw/i });
    this.equityColumn    = page.locator('.col').filter({ hasText: /equity/i }).first();
    this.equityTable     = this.equityColumn.locator('.table').first();
    this.equityRows      = this.equityTable.locator('.data');
    this.commodityColumn = page.locator('.commodity');
    this.commodityNotice = this.commodityColumn.locator('p').first();
    this.openAccountLink = page.getByRole('link', { name: /open account/i });
  }

  async navigate() {
    await this.goto(DASHBOARD_URLS.funds);
  }
}
