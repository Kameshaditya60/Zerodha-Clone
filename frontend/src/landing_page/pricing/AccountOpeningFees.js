import React from 'react';
import EquityCharges from './EquityCharges';
import CurrencyCharges from './CurrencyCharges';
import CommodityCharges from './CommodityCharges';
import { useState, useEffect } from 'react';

function AccountOpeningFees() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#tab-', '');
    return hash || 'equities';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = `tab-${tabId}`;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#tab-', '');
      if (hash) setActiveTab(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabs = [
    { id: 'equities', label: 'Equity', component: EquityCharges },
    { id: 'currency', label: 'Currency', component: CurrencyCharges },
    { id: 'commodities', label: 'Commodity', component: CommodityCharges }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);
  const CurrentComponent = currentTab?.component;

  return (
    <div className="container p-4">
      <div className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {CurrentComponent && <CurrentComponent />}
    </div>
  );
}

export default AccountOpeningFees;
