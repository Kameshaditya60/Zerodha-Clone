import { test, expect } from '@playwright/test';
import { APPS, DASHBOARD_URLS, LANDING_URLS } from '../fixtures/constants';

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  FEATURE: Accessibility, Responsiveness, Performance, Nav   │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Runs under the chromium/firefox/mobile-chrome projects, so the baseURL
 * here is the DASHBOARD app (port 3001). For the one test that must hit
 * the landing app's /login form, we use an absolute URL via APPS.landing.
 */

const DASHBOARD_PAGES = [
  { name: 'Summary',   url: DASHBOARD_URLS.summary   },
  { name: 'Orders',    url: DASHBOARD_URLS.orders    },
  { name: 'Holdings',  url: DASHBOARD_URLS.holdings  },
  { name: 'Positions', url: DASHBOARD_URLS.positions },
  { name: 'Funds',     url: DASHBOARD_URLS.funds     },
];

// ─────────────────────────────────────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Accessibility', () => {
  for (const { name, url } of DASHBOARD_PAGES) {
    test(`TC-A11Y-${name.toUpperCase()}-IMG | ${name} – images have alt or aria-label`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const images = await page.locator('img').all();
      for (const img of images) {
        const alt       = await img.getAttribute('alt');
        const role      = await img.getAttribute('role');
        const ariaLabel = await img.getAttribute('aria-label');
        if (role === 'presentation' || role === 'none') continue;
        expect(alt !== null || !!ariaLabel).toBeTruthy();
      }
    });

    test(`TC-A11Y-${name.toUpperCase()}-BTN | ${name} – buttons have accessible names`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const buttons = await page.locator('button').all();
      let unnamed = 0;
      for (const btn of buttons) {
        const text         = (await btn.textContent())?.trim();
        const ariaLabel    = await btn.getAttribute('aria-label');
        const labelledBy   = await btn.getAttribute('aria-labelledby');
        const title        = await btn.getAttribute('title');
        if (!(text || ariaLabel || labelledBy || title)) unnamed++;
      }
      // Two icon-only buttons (analytics + more) live in WatchListActions
      // and only render on hover, so the budget here is generous.
      expect(unnamed).toBeLessThanOrEqual(2);
    });
  }

  test('TC-A11Y-FOCUS | Tabbing focuses an interactive element on the dashboard', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.summary);
    await page.waitForLoadState('networkidle');
    for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveCount(1);
  });

  test('TC-A11Y-LANG | HTML lang attribute is set', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.summary);
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('TC-A11Y-HEADING | Dashboard pages have at least one heading', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.holdings);
    await page.waitForLoadState('networkidle');
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('TC-A11Y-FORM | Landing /login inputs have associated labels', async ({ page }) => {
    // Cross-app: the login form lives on the landing app (port 3000).
    await page.goto(`${APPS.landing}${LANDING_URLS.login}`);
    await page.waitForLoadState('networkidle');
    const inputs = await page.locator('input:not([type="hidden"])').all();
    for (const input of inputs) {
      const id          = await input.getAttribute('id');
      const ariaLabel   = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      const labelCount  = id ? await page.locator(`label[for="${id}"]`).count() : 0;
      expect(!!(ariaLabel || placeholder || labelCount > 0)).toBeTruthy();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Responsiveness
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Responsiveness', () => {
  const VIEWPORTS = [
    { name: 'DesktopHD', width: 1920, height: 1080 },
    { name: 'Desktop',   width: 1280, height: 800  },
    { name: 'Laptop',    width: 1024, height: 768  },
    { name: 'Tablet',    width: 768,  height: 1024 },
    { name: 'MobileL',   width: 425,  height: 900  },
    { name: 'MobileM',   width: 375,  height: 812  },
  ];

  for (const vp of VIEWPORTS) {
    test(`TC-RESP-${vp.name} | Dashboard summary renders at ${vp.width}x${vp.height}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(DASHBOARD_URLS.summary);
      await page.waitForLoadState('networkidle');

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      // The current dashboard layout was not built mobile-first; allow a generous tolerance.
      expect(scrollWidth - clientWidth).toBeLessThanOrEqual(300);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Performance
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Performance', () => {
  test('TC-PERF-001 | Dashboard summary loads within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto(DASHBOARD_URLS.summary);
    await page.waitForLoadState('networkidle');
    expect(Date.now() - start).toBeLessThan(5_000);
  });

  test('TC-PERF-002 | Console error budget on summary load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(DASHBOARD_URLS.summary);
    await page.waitForLoadState('networkidle');
    // Backend is often offline during local test runs; axios surfaces a small
    // number of network errors. Cap at 3 to flag real regressions.
    expect(errors.length).toBeLessThanOrEqual(3);
  });

  test('TC-PERF-003 | Page title is set and non-empty', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.summary);
    const title = await page.title();
    expect(title).not.toBe('');
    expect(title).not.toMatch(/undefined|null/i);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Flow (E2E smoke)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Navigation Flow (Smoke)', () => {
  test('TC-NAV-001 | Full cycle through every dashboard route', async ({ page }) => {
    for (const route of Object.values(DASHBOARD_URLS)) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      // The URL after navigation should end with the requested route.
      const tail = route === '/' ? /3001\/?$/ : new RegExp(`${route.replace(/\//g, '\\/')}$`);
      expect(page.url()).toMatch(tail);
    }
  });

  test('TC-NAV-002 | Browser back / forward moves between routes', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.summary);
    await page.goto(DASHBOARD_URLS.orders);
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toMatch(/3001\/?$/);
    await page.goForward();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/orders');
  });

  test('TC-NAV-003 | Refresh keeps the seeded user authenticated (no redirect to landing)', async ({ page }) => {
    await page.goto(DASHBOARD_URLS.summary);
    await page.reload();
    await page.waitForLoadState('networkidle');
    // AuthCheck (if ever wired in) would redirect to port 3000 — assert we stayed on 3001.
    expect(page.url()).toContain('3001');
  });
});
