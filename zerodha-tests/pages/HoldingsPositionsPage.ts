import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DASHBOARD_URLS } from '../fixtures/constants';

/**
 * Targets dashboard/src/components/Holdings.js.
 * Reality from that component:
 *   - <h3 class="title">Holdings (N)</h3>
 *   - <div class="order-table"><table>
 *       <tr>HEADERS</tr>         ← first row holds the column headers
 *       <tr>data row</tr> ...
 *     </table></div>
 *     Headers: Instrument | Qty. | Avg. cost | LTP | Cur. val | P&L | Net chg. | Day chg.
 *   - <div class="row"> with three <div class="col">: Total investment / Current value / P&L
 *   - <canvas> from VerticalGraph at the bottom
 * There is no tab bar, no row-detail panel, no search input, no exit actions.
 *
 * Data is fetched from http://localhost:5000/allHoldings — note this is the
 * legacy top-level route, not /api/holdings. If backend is offline the table
 * is empty but the title and summary still render.
 */
export class HoldingsPage extends BasePage {
  readonly title:       Locator;
  readonly table:       Locator;
  readonly headerCells: Locator;
  readonly dataRows:    Locator;
  readonly summaryRow:  Locator;
  readonly summaryCols: Locator;
  readonly graphCanvas: Locator;

  constructor(page: Page) {
    super(page);
    this.title       = page.locator('h3.title');
    this.table       = page.locator('.order-table table');
    this.headerCells = this.table.locator('th');
    this.dataRows    = this.table.locator('tr:not(:first-child)');
    this.summaryRow  = page.locator('.row').first();
    this.summaryCols = this.summaryRow.locator('.col');
    this.graphCanvas = page.locator('canvas');
  }

  async navigate() {
    await this.goto(DASHBOARD_URLS.holdings);
  }
}

/**
 * Targets dashboard/src/components/Positions.js.
 * Structure mirrors Holdings: <h3 class="title">Positions (N)</h3> +
 * <div class="order-table"><table>HEADERS+rows</table></div>.
 * Headers: Product | Instrument | Qty. | Avg. | LTP | P&L | Chg.
 *
 * Data is fetched from http://localhost:5000/allPositions — note this
 * route is NOT registered on the backend (only /api/positions is mounted),
 * so the request will 404 and the component will fall out of "Loading..."
 * with positions == [].
 */
export class PositionsPage extends BasePage {
  readonly loading:     Locator;
  readonly title:       Locator;
  readonly table:       Locator;
  readonly headerCells: Locator;
  readonly dataRows:    Locator;

  constructor(page: Page) {
    super(page);
    this.loading     = page.getByText(/^Loading\.\.\.$/);
    this.title       = page.locator('h3.title');
    this.table       = page.locator('.order-table table');
    this.headerCells = this.table.locator('th');
    this.dataRows    = this.table.locator('tr:not(:first-child)');
  }

  async navigate() {
    await this.goto(DASHBOARD_URLS.positions);
  }
}
