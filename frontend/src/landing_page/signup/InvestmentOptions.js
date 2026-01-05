import React from 'react';
import { Link } from 'react-router-dom';
function InvestmentOptions() {
    return (
        <div className='container text-center align-item-center '>
            <h2>Investment options with Zerodha demat account</h2>
            <div className='my-4 container'>
                <div className='row justify-content-around flex-wrap my-4'>
                    <div className='col-md-12 col-lg-6   d-flex text-start' >
                        <img src='./media/images/stocks-acop.svg' alt='Stocks' className='img-fluid' />

                        <div className='ms=2'>
                            <h3 className='mt-3'>Stocks</h3>
                            <p>Invest in all exchange-listed securities</p>
                        </div>
                    </div>
                    <div className='d-flex col-md-12 col-lg-6 text-start ' >
                        <img src='./media/images/mf-acop.svg' alt='Stocks' className='img-fluid' />
                       <div className='ms=2'>
                         <h3 className='mt-3'>Mutual Funds</h3>
                        <p>Invest in commission-free direct mutual funds</p>
                       </div>
                    </div>
                    <div className='d-flex col-md-12 col-lg-6 text-start' >
                        <img src='./media/images/ipo-acop.svg' alt='Stocks' className='img-fluid' />
                       <div className='mss=2'>
                         <h3 className='mt-3'>IPO</h3>
                        <p>Apply to the latest IPOs instantly via UPI</p>
                       </div>
                    </div>
                    <div className='d-flex col-md-12 col-lg-6 text-start' >
                        <img  src='./media/images/fo-acop.svg' alt='Stocks' className='img-fluid me-3 ' />
                        <div className='ms=2'>
                            <h3 className='mt-3'>Futures  Options</h3>
                        <p>Hedge and mitigate market risk through simplified F&O trading</p>
                        </div>
                    </div>

                </div>

            </div>
            <Link to='/investments' className='btn btn-primary my-3' style={{margin:'0 auto'}}>Explore Investments</Link>
        </div>
    );
}

export default InvestmentOptions;