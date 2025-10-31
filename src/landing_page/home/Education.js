import React from 'react';
function Education() {
    return ( 
        <div className='container row mb-5' style={{margin:'0 auto'}}>
            <div className='col-6'>
                <img src='media/images/index-education.svg' alt='Education Image' className='img-fluid' style={{width:'100%'}} />
            </div>
            <div className='col-6 mt-5 pt-4'>
                <h2 className='fs-5'>Free and open market education</h2>
                <p className='fs-7'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                <p><a href='#' className='fs-6 mb-4' style={{ textDecoration: 'none' }}>Varsity<i class="fa-solid fa-arrow-right"></i></a> </p>

                <p className='fs-7'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                <p><a href='#' className='fs-6' style={{ textDecoration: 'none' }}>TradingQ&A<i class="fa-solid fa-arrow-right"></i></a> </p>
            </div>
        </div>
     );
}

export default Education;