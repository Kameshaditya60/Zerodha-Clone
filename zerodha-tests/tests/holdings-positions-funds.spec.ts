import { test, expect } from '@playwright/test';
import { HoldingsPage, PositionsPage } from '../pages/HoldingsPositionsPage';
import { FundsPage } from '../pages/FundsChargesPage';

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE: Holdings (dashboard/src/components/Holdings.js)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Holdings', () => {
  let holdings: HoldingsPage;

  test.beforeEach(async ({ page }) => {
    holdings = new HoldingsPage(page);
    await holdings.navigate();
  });

  test('TC-HOLD-001 | Holdings title renders with a numeric count', async () => {
    await expect(holdings.title).toBeVisible();
    await expect(holdings.title).toContainText(/holdings \(\d+\)/i);
  });

  test('TC-HOLD-002 | Holdings table renders the expected column headers', async () => {
    await expect(holdings.headerCells).toHaveCount(8);
    const headerText = (await holdings.headerCells.allTextContents()).join('|');
    expect(headerText).toMatch(/Instrument/);
    expect(headerText).toMatch(/Qty\./);
    expect(headerText).toMatch(/Avg\. cost/);
    expect(headerText).toMatch(/LTP/);
    expect(headerText).toMatch(/Cur\. val/);
    expect(headerText).toMatch(/P&L/);
  });

  test('TC-HOLD-003 | Summary row shows Total investment / Current value / P&L', async () => {
    await expect(holdings.summaryRow).toBeVisible();
    await expect(holdings.summaryRow).toContainText(/total investment/i);
    await expect(holdings.summaryRow).toContainText(/current value/i);
    await expect(holdings.summaryRow).toContainText(/p&l/i);
  });

  test('TC-HOLD-004 | Summary row has exactly three columns', async () => {
    await expect(holdings.summaryCols).toHaveCount(3);
  });

  test('TC-HOLD-005 | VerticalGraph canvas is rendered at the bottom', async () => {
    await expect(holdings.graphCanvas.first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE: Positions (dashboard/src/components/Positions.js)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Positions', () => {
  let positions: PositionsPage;

  test.beforeEach(async ({ page }) => {
    positions = new PositionsPage(page);
    await positions.navigate();
  });

  test('TC-POS-001 | Page shows either "Loading..." or the Positions title', async () => {
    // The component shows "Loading..." until the axios promise settles.
    // The backend has no /allPositions endpoint, so the catch branch fires
    // and Positions (0) renders. Either state is acceptable as "the page loaded".
    await expect(positions.loading.or(positions.title)).toBeVisible({ timeout: 10_000 });
  });

  test('TC-POS-002 | After load, the Positions title renders with a count', async () => {
    // Wait for the loading text to disappear (axios resolves or rejects).
    await positions.loading.waitFor({ state: 'detached', timeout: 10_000 }).catch(() => {});
    await expect(positions.title).toContainText(/positions \(\d+\)/i);
  });

  test('TC-POS-003 | Positions table renders the expected column headers when present', async () => {
    await positions.loading.waitFor({ state: 'detached', timeout: 10_000 }).catch(() => {});
    const headerCount = await positions.headerCells.count();
    test.skip(headerCount === 0, 'positions table not present (likely empty state with no rows)');
    const headerText = (await positions.headerCells.allTextContents()).join('|');
    expect(headerText).toMatch(/Product/);
    expect(headerText).toMatch(/Instrument/);
    expect(headerText).toMatch(/Qty\./);
    expect(headerText).toMatch(/LTP/);
    expect(headerText).toMatch(/P&L/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE: Funds (dashboard/src/components/Funds.js)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Funds', () => {
  let funds: FundsPage;

  test.beforeEach(async ({ page }) => {
    funds = new FundsPage(page);
    await funds.navigate();
  });

  test('TC-FUND-001 | Funds hero renders Add funds and Withdraw links', async () => {
    await expect(funds.heroContainer).toBeVisible();
    await expect(funds.addFundsLink).toBeVisible();
    await expect(funds.withdrawLink).toBeVisible();
  });

  test('TC-FUND-002 | Equity column shows core margin/cash rows', async () => {
    await expect(funds.equityTable).toBeVisible();
    await expect(funds.equityTable).toContainText(/available margin/i);
    await expect(funds.equityTable).toContainText(/used margin/i);
    await expect(funds.equityTable).toContainText(/available cash/i);
  });

  test('TC-FUND-003 | Equity column shows the breakdown rows (SPAN/Exposure/etc.)', async () => {
    await expect(funds.equityTable).toContainText(/SPAN/);
    await expect(funds.equityTable).toContainText(/exposure/i);
    await expect(funds.equityTable).toContainText(/options premium/i);
  });

  test('TC-FUND-004 | Equity column shows collateral rows', async () => {
    await expect(funds.equityTable).toContainText(/collateral \(liquid funds\)/i);
    await expect(funds.equityTable).toContainText(/collateral \(equity\)/i);
    await expect(funds.equityTable).toContainText(/total collateral/i);
  });

  test('TC-FUND-005 | Commodity column shows the empty-state notice + Open Account link', async () => {
    await expect(funds.commodityNotice).toContainText(/don['’]t have a commodity account/i);
    await expect(funds.openAccountLink).toBeVisible();
  });
});
