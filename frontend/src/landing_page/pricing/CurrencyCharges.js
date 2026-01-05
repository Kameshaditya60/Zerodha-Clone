import React from 'react';
import PricingTableView from './PricingTableView';

function CurrencyCharges() {
  const columns = ['Currency Futures'];
  
  const rows = [
    {
      category: 'Brokerage',
      values: ['0.03% or Rs. 20/executed order whichever is lower']
    },
    {
      category: 'CTT',
      values: ['No CTT']
    },
    {
      category: 'Transaction charges',
      values: ['NSE: 0.0009%']
    },
    {
      category: 'GST',
      values: ['18% on (brokerage + SEBI charges + transaction charges)']
    },
    {
      category: 'SEBI charges',
      values: ['₹10 / crore']
    },
    {
      category: 'Stamp charges',
      values: ['0.0001% or ₹10 / crore on buy side']
    }
  ];

  return <PricingTableView columns={columns} rows={rows} />;
}
export default CurrencyCharges;