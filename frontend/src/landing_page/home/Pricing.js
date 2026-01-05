import React from 'react';

function Pricing() {
    return (
        <div className='container row mb-5' style={{margin:'0 auto'}}>
            <div className='col-4'>
                <h1 className='fs-5'>Unbeatable pricing</h1>
                <p className='fs-7'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                <p><a href='#' className='fs-6' style={{ textDecoration: 'none' }}>See our pricing plans  <i class="fa-solid fa-arrow-right"></i></a> </p>
            </div>
            <div className='col-8'>
                <div className='row'>
                <div className='col-4 d-flex align-items-center'>
                    <img src='media/images/pricing0.svg' alt='Pricing Image' className='img-fluid ' style={{width:'60%'}} />
                    <p className='fs-8'> Free account opening</p>
                </div>

                <div className='col-4 d-flex align-items-center'>
                    <img src='media/images/pricing0.svg' alt='Pricing Image' className='img-fluid' style={{width:'60%'}} />
                    <p className='fs-8'> Free equity delivery and direct mutual funds</p>
                </div>
                <div className='col-4 d-flex align-items-center'>
                    <img src='media/images/intradayTrades.svg' alt='Pricing Image' className='img-fluid' style={{width:'60%'}} />
                    <p className='fs-8'> Intraday and F&O</p>
                </div>
                </div>


            </div>
        </div>
    );
}

export default Pricing;