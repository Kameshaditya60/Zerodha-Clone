
import React from 'react';
import PricingTableView from './PricingTableView';

function CommodityCharges() {
  const columns = ['Commodity Futures'];
  
  const rows = [
    {
      category: 'Brokerage',
      values: ['0.03% or Rs. 20/executed order whichever is lower']
    },
    {
      category: 'CTT',
      values: ['0.01% on sell side (only on agricultural commodities)']
    },
    {
      category: 'Transaction charges',
      values: ['MCX: 0.0026%']
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
      values: ['0.002% or ₹200 / crore on buy side']
    }
  ];

  return <PricingTableView columns={columns} rows={rows} />;
}
export default CommodityCharges;