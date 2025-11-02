import React from 'react'
import './InformationBoard.css';
function InformationBoard(params) {
    return (
        <div className='container info-board'>
            <div className='ms-3'>
                <li><a href='https://zerodha.com/marketintel/bulletin/432323/quantity-freeze-limits-for-indices-from-november-03-2025'>Quantity Freeze Limits for Indices from November 03, 2025</a></li>
                <li><a href='https://zerodha.com/marketintel/bulletin/249809/latest-intraday-leverages-mis-bo-co'>Latest Intraday leverages and Square-off timings</a></li>
            </div>
        </div>
    );
    
}

export default InformationBoard;