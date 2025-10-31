import React from 'react';
import PlatformCard from './PlatformCard';
import { Link } from 'react-router-dom';
function ZerodhaUniverse() {
    return (
        <div className='container'>
            <div className='row text-center align-items-center'>
                <h2 className='mt-5 mb-5 fs-5'>Want to know more about our technology stack? Check out the Zerodha.tech blog.</h2>

                <h2 className='mt-5'> The Zerodha Universe</h2>
                <p className='text-muted'>Extend your trading and investment experience even further with our partner platforms</p>

            </div>
            <div className='container mt-4 mb-5'>
                <div className='row align-items-center justify-content-center text-center'>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
                        <PlatformCard
                            imageLogo="media/images/zerodhaFundhouse.png"
                            platformDiscriptionuu="Our asset management venture
that is creating simple and transparent index
funds to help you save for your goals.
" /> </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>
                        <PlatformCard
                            imageLogo="media/images/SmallcaseLogo.png"
                            platformDiscriptionuu="An investment platform that offers
portfolios of stocks and ETFs based on
various themes and strategies." />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4  mb-4'>
                        <PlatformCard
                            imageLogo="media/images/tijori.svg"
                            platformDiscriptionuu="A comprehensive dashboard that provides
insights into your investments, trades,
and tax reports across multiple platforms." />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4  mb-4'>
                        <PlatformCard
                            imageLogo="media/images/streakLogo.png"
                            platformDiscriptionuu="Our asset management venture
that is creating simple and transparent index
funds to help you save for your goals.
" />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4  mb-4'>
                        <PlatformCard
                            imageLogo="media/images/sensibullLogo.svg"
                            platformDiscriptionuu="An investment platform that offers
portfolios of stocks and ETFs based on
various themes and strategies." />
                    </div>
                    <div className='col-12 col-sm-6 col-md-4  mb-4'>
                        <PlatformCard
                            imageLogo="media/images/dittoLogo.png"
                            platformDiscriptionuu="A comprehensive dashboard that provides
insights into your investments, trades,
and tax reports across multiple platforms." />
                    </div>
                </div>

            </div>
            <div className='row text-center justify-content-center mb-5'>
                <Link to='/signup' className='btn btn-primary btn-lg' style={{width:'20%'}}>Sign up for free
                </Link>
            </div>
        </div>
    );
}

export default ZerodhaUniverse;