# 🧪 Zerodha Clone – Frontend Automation Test Suite

A production-grade **Playwright** test suite for the Zerodha Clone React application.
Covers authentication, all major pages, accessibility, responsiveness, performance, and E2E navigation flows.

---

## 📋 Feature Coverage

| # | Feature | Test File | Test Count |
|---|---------|-----------|------------|
| 1 | **Authentication** (Login, Logout, Validation, Security) | `auth.spec.ts` | 14 |
| 2 | **Dashboard** (Layout, Watchlist, Market Data, Nav) | `dashboard.spec.ts` | 16 |
| 3 | **Orders** (Tabs, Buy/Sell Modal, Validation, Filters) | `orders.spec.ts` | 15 |
| 4 | **Holdings** (Table, Summary, Search, P&L Colours) | `holdings-positions-funds-charges.spec.ts` | 8 |
| 5 | **Positions** (Day/Net Tabs, P&L, Exit All) | `holdings-positions-funds-charges.spec.ts` | 6 |
| 6 | **Funds** (Balance, Add/Withdraw Modals, Tabs) | `holdings-positions-funds-charges.spec.ts` | 7 |
| 7 | **Equity Charges & Brokerage Calculator** (Tabs, Inputs, Results) | `holdings-positions-funds-charges.spec.ts` | 15 |
| 8 | **Accessibility** (Alt text, ARIA, Labels, Focus, Headings) | `accessibility-responsive.spec.ts` | 12 |
| 9 | **Responsiveness** (6 viewport breakpoints) | `accessibility-responsive.spec.ts` | 7 |
| 10 | **Performance** (Load time, console errors, network failures) | `accessibility-responsive.spec.ts` | 4 |
| 11 | **Navigation / E2E Smoke** (Full page cycle, back/forward, refresh) | `accessibility-responsive.spec.ts` | 4 |
| — | **TOTAL** | — | **~108 tests** |

---

## 🏗️ Project Structure

```
zerodha-tests/
├── playwright.config.ts         # Multi-browser & multi-project config
├── tsconfig.json
├── package.json
│
├── fixtures/
│   └── constants.ts             # URLs, test data, stock symbols, enums
│
├── pages/                       # Page Object Models (POM)
│   ├── BasePage.ts              # Shared helpers: click, fill, assert, wait
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── OrdersPage.ts
│   ├── HoldingsPositionsPage.ts
│   └── FundsChargesPage.ts
│
├── tests/
│   ├── auth.setup.ts            # Global login → saves auth state to disk
│   ├── auth.spec.ts             # TC-AUTH-001 … TC-AUTH-014
│   ├── dashboard.spec.ts        # TC-DASH-001 … TC-DASH-016
│   ├── orders.spec.ts           # TC-ORD-001  … TC-ORD-015
│   ├── holdings-positions-      # TC-HOLD / TC-POS / TC-FUND / TC-CHG
│   │   funds-charges.spec.ts
│   └── accessibility-           # TC-A11Y / TC-RESP / TC-PERF / TC-NAV
│       responsive.spec.ts
│
├── reports/
│   ├── html-report/             # Auto-generated HTML report
│   ├── results.json             # Machine-readable results
│   └── screenshots/             # Captured on failure
│
└── playwright/
    └── .auth/
        └── user.json            # Saved auth state (gitignored)
```

---

## ⚡ Setup & Run

### Prerequisites
```bash
Node.js >= 18
```

### Install
```bash
npm install
npx playwright install          # Install browser binaries
```

### Configure base URL
Set `BASE_URL` to point to your running clone:
```bash
export BASE_URL=http://localhost:3000
```
Or edit `playwright.config.ts` → `use.baseURL`.

### Update credentials
Edit `fixtures/constants.ts` → `TEST_USER` with your test account.

---

## 🚀 Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless, all projects) |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Open Playwright interactive UI |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:mobile` | Mobile Chrome viewport |
| `npm run test:smoke` | Navigation smoke tests only |
| `npm run test:a11y` | Accessibility tests only |
| `npm run test:orders` | Orders tests only |
| `npm run test:charges` | Brokerage calculator tests |
| `npm run test:debug` | Debug mode (step through) |
| `npm run test:ci` | CI mode (parallel, no retries on pass) |
| `npm run test:report` | Open HTML report in browser |
| `npm run codegen` | Record new tests interactively |

---

## 🔑 Test ID Convention

```
TC-{MODULE}-{NUMBER}

TC-AUTH-001   Authentication tests
TC-DASH-001   Dashboard tests
TC-ORD-001    Orders tests
TC-HOLD-001   Holdings tests
TC-POS-001    Positions tests
TC-FUND-001   Funds tests
TC-CHG-001    Charges & brokerage calculator
TC-A11Y-*     Accessibility tests
TC-RESP-*     Responsive / viewport tests
TC-PERF-001   Performance tests
TC-NAV-001    E2E navigation smoke tests
```

Run a specific test by ID:
```bash
npm run test -- --grep "TC-CHG-011"
```

---

## 🛡️ Design Decisions

| Decision | Reason |
|----------|--------|
| **Page Object Model** | Separates locators from test logic; easy to update when UI changes |
| **Global auth setup** | Logs in once, reuses session → faster suite |
| **Graceful skips** | Tests skip (not fail) when a feature is absent, so suite works on partial implementations |
| **Multi-project config** | Chromium + Firefox + Mobile in one run |
| **JSON + HTML reporters** | CI-friendly machine output + human-readable HTML |
| **Screenshot/video on failure** | Instant root-cause visibility |

---

## 📊 Identified Features

Based on the README and standard Zerodha-clone implementations:

1. **Login / Logout** – User ID + Password + optional PIN 2FA
2. **Watchlist** – Add/remove stocks, live LTP, search
3. **Buy / Sell Order Placement** – Market, Limit, SL, SL-M order types
4. **Order Management** – Pending, Executed, Trade Book tabs; Modify/Cancel
5. **Holdings** – Portfolio view with P&L, returns, search, detail panel
6. **Positions** – Intraday (Day/Net) positions with Exit All
7. **Funds** – Equity/Commodity balance, Add Funds, Withdraw, Margin breakdown
8. **Equity Charges Layout** – Brokerage table per segment (Delivery/Intraday/F&O/Currency/Commodity)
9. **Brokerage Calculator** – Buy price × Sell price × Qty → STT, GST, SEBI, Stamp, Breakeven
10. **Tab Navigation** – Sidebar with active-state routing
11. **Market Indices** – NIFTY / SENSEX widgets
12. **Responsive Design** – Desktop, Tablet, Mobile viewports
13. **Accessibility** – ARIA labels, keyboard focus, semantic HTML
