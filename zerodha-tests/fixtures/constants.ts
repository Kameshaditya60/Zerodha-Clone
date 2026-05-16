// ─── Test Data & Constants ────────────────────────────────────────────────────

/**
 * The repo ships two React apps on different ports plus a backend.
 * Tests use different baseURLs per Playwright project; helpers below
 * are absolute URLs for cross-app navigation when needed.
 */
export const APPS = {
  landing:   process.env.LANDING_BASE_URL   || 'http://localhost:3000',
  dashboard: process.env.DASHBOARD_BASE_URL || 'http://localhost:3001',
  backend:   process.env.BACKEND_BASE_URL   || 'http://localhost:5000',
} as const;

/**
 * A valid 10-digit Indian mobile (regex /^[6-9]\d{9}$/ enforced by the backend).
 * Tests do NOT actually log in via the OTP flow — auth.setup.ts seeds
 * dashboard-origin localStorage directly because dashboard/src/components/
 * AuthCheck.js gates on `localStorage.isAuthenticated === "true"` only.
 */
export const TEST_USER = {
  number:   '9999999999',
  password: 'Test@12345',
  name:     'Test User',
  email:    'testuser@zerodha.com',
};

/** Routes on the landing app (frontend/, port 3000). */
export const LANDING_URLS = {
  home:     '/',
  login:    '/login',
  signup:   '/signup',
  about:    '/about',
  products: '/products',
  pricing:  '/pricing',
  support:  '/support',
};

/**
 * Routes on the dashboard app (dashboard/, port 3001).
 * Notes:
 *   - The summary view is at "/", not "/dashboard".
 *   - "allHoldings" has a capital H, matching dashboard/src/components/Dashboard.js.
 *   - Menu.js writes the funds Link as `to="funds"` (no leading slash);
 *     from "/" it resolves to "/funds", but from another route it would
 *     resolve relatively.  We navigate directly to "/funds" in tests.
 */
export const DASHBOARD_URLS = {
  summary:   '/',
  orders:    '/orders',
  holdings:  '/allHoldings',
  positions: '/positions',
  funds:     '/funds',
  apps:      '/apps',
};

export const TIMEOUTS = {
  SHORT:  3_000,
  MEDIUM: 8_000,
  LONG:   15_000,
} as const;
