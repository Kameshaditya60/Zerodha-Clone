import React from 'react';
function ChargesExplanation() {
    return (
        <div className="container d-flex my-5">

            <div style={{width:"30%"}} >
                <img src="./media/images/pricing0.svg" alt="Charges Explanation" className="img-fluid" />
                <h3>Free equity delivery</h3>
                <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
            </div>
             <div style={{width:"30%"}} >
                <img src="./media/images/intradayTrades.svg" alt="Charges Explanation" className="img-fluid" />
                <h3>Intraday and F&O trades</h3>
                <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
            </div>
             <div style={{width:"30%"}} >
                <img src="./media/images/pricing0.svg" alt="Charges Explanation" className="img-fluid" />
                <h3>Free direct MF</h3>
                <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
            </div>
           
        </div>
    );
}

export default ChargesExplanation;