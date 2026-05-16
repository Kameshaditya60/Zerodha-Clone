import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { DASHBOARD_URLS } from '../fixtures/constants';

/**
 * Targets dashboard/src/components/TopBar.js + Menu.js + WatchList.js.
 * Reality check from those components:
 *   - TopBar has two indices: <div class="nifty"> and <div class="sensex">.
 *   - Menu renders <div class="menu-container"> containing <Link> elements
 *     for Dashboard / Orders / Holdings / Positions / Funds / Apps.
 *     There is no logout button — only a non-functional <div class="profile">
 *     toggle that opens nothing.
 *   - WatchList renders <div class="watchlist-container"> on EVERY dashboard
 *     route (it's outside the <Routes> in Dashboard.js), with:
 *       - <input class="search" placeholder="Search eg:infy,...">
 *           (note: no space after the colon)
 *       - <span class="counts"> N / 50 </span>
 *       - <ul class="list"> rendered TWICE in the current code (fetched stocks
 *           + static fixture), so item counts can be doubled.
 *       - Each <li> contains <div class="item"> with up/down indicators.
 *   - Buy/Sell buttons (.actions button.buy, .sell) only appear on hover.
 */
export class DashboardPage extends BasePage {
  // TopBar
  readonly topbar: Locator;
  readonly nifty:  Locator;
  readonly sensex: Locator;

  // Menu (sidebar / nav)
  readonly menuContainer: Locator;
  readonly navDashboard:  Locator;
  readonly navOrders:     Locator;
  readonly navHoldings:   Locator;
  readonly navPositions:  Locator;
  readonly navFunds:      Locator;
  readonly navApps:       Locator;
  readonly profile:       Locator;
  readonly avatar:        Locator;
  readonly username:      Locator;

  // Watchlist (rendered on every dashboard page)
  readonly watchlistContainer: Locator;
  readonly watchlistSearch:    Locator;
  readonly watchlistCount:     Locator;
  readonly watchlistItems:     Locator;

  // Summary greeting (Summary.js renders <div class="username"><h6>Hi,{name}!</h6>)
  readonly summaryGreeting: Locator;

  constructor(page: Page) {
    super(page);

    this.topbar = page.locator('.topbar-container');
    this.nifty  = page.locator('.nifty');
    this.sensex = page.locator('.sensex');

    this.menuContainer = page.locator('.menu-container');
    this.navDashboard  = page.getByRole('link', { name: 'Dashboard' });
    this.navOrders     = page.getByRole('link', { name: 'Orders' });
    this.navHoldings   = page.getByRole('link', { name: 'Holdings' });
    this.navPositions  = page.getByRole('link', { name: 'Positions' });
    this.navFunds      = page.getByRole('link', { name: 'Funds' });
    this.navApps       = page.getByRole('link', { name: 'Apps' });
    this.profile       = page.locator('.profile');
    this.avatar        = page.locator('.profile .avatar');
    this.username      = page.locator('.profile .username');

    this.watchlistContainer = page.locator('.watchlist-container');
    this.watchlistSearch    = page.locator('.watchlist-container input.search');
    this.watchlistCount     = page.locator('.search-container .counts');
    this.watchlistItems     = page.locator('.watchlist-container ul.list > li');

    this.summaryGreeting = page.locator('.username h6').first();
  }

  async gotoSummary()   { await this.goto(DASHBOARD_URLS.summary);   }
  async gotoOrders()    { await this.goto(DASHBOARD_URLS.orders);    }
  async gotoHoldings()  { await this.goto(DASHBOARD_URLS.holdings);  }
  async gotoPositions() { await this.goto(DASHBOARD_URLS.positions); }
  async gotoFunds()     { await this.goto(DASHBOARD_URLS.funds);     }

  async searchWatchlist(term: string) {
    await this.watchlistSearch.fill(term);
  }

  async clearWatchlistSearch() {
    await this.watchlistSearch.fill('');
  }
}
