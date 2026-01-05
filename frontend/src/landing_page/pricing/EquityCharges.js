import React from 'react';
import PricingTableView from './PricingTableView';
function EquityCharges() {
    const columns = ['','Equity delivery', 'Equity intraday', 'F&O - Futures', 'F&O - Options'];
    const rows = [
        {
            category: 'Brokerage',
            values: [
                 'Zero Brokerage',
        '0.03% or Rs. 20/executed order whichever is lower',
        '0.03% or Rs. 20/executed order whichever is lower',
        'Flat Rs. 20 per executed order'
      ]
    },
     {
      category: 'STT/CTT',
      values: [
        '0.1% on buy & sell',
        '0.025% on the sell side',
        '0.02% on the sell side',
        <ul key="stt" className="list-disc list-inside space-y-1">
          <li>0.125% of the intrinsic value on options that are bought and exercised</li>
          <li>0.1% on sell side (on premium)</li>
        </ul>
      ]
    },
    {
      category: 'Transaction charges',
      values: [
        <div key="tc1">NSE: 0.00297%<br/>BSE: 0.00375%</div>,
        <div key="tc2">NSE: 0.00297%<br/>BSE: 0.00375%</div>,
        <div key="tc3">NSE: 0.00173%<br/>BSE: 0</div>,
        <div key="tc4">NSE: 0.03503% (on premium)<br/>BSE: 0.0325% (on premium)</div>
      ]
    },
    {
      category: 'GST',
      values: Array(4).fill('18% on (brokerage + SEBI charges + transaction charges)')
    },
    {
      category: 'SEBI charges',
      values: Array(4).fill('₹10 / crore')
    },
    {
      category: 'Stamp charges',
      values: [
        '0.015% or ₹1500 / crore on buy side',
        '0.003% or ₹300 / crore on buy side',
        '0.002% or ₹200 / crore on buy side',
        '0.003% or ₹300 / crore on buy side'
      ]
    }

]
    return (
        <PricingTableView columns={columns} rows={rows} />
      );
}


export default EquityCharges;