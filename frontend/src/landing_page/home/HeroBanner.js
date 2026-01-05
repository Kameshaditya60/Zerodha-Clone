import React from 'react';
function HeroBanner() {
    return (
        <div className='container'>
            <div className="row text-center mb-5" >
                <img src="media/images/homeHero.png" alt="Hero Banner" class="img-fluid" className="mb-5" />
                <h1 className='fs-4 mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.

                </p>
                <button className="btn btn-primary btn-lg fs-6 mt-3 " style={{ width: '20%', margin: '0 auto' }}>Sign up For Free</button>
            </div>


        </div>
    );
}

export default HeroBanner;