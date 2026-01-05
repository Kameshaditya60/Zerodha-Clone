import React from 'react';
function AccountBenifits() {
    return (
        <div className='container'>
            <div className='row'>
           <div className='text-center me-5 col-6'>
            <img src='./media/images/acop-benefits.svg' alt='Account Benefits' className='img-fluid my-4' style={{width:"80%"}}/>
            <p className=''>Benefits of opening a Zerodha demat account</p>

            </div>

            <div className='col-4 text-start'>
                <h3>Unbeatable pricing</h3>
                <p className='text-muted mb-5'>Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.</p>

                <h3>Best investing experience</h3>
                <p className='text-muted mb-5'>Simple and intuitive trading platform with an easy-to-understand user interface.</p>

                <h3>No spam or gimmicks</h3>
                <p className='text-muted mb-5'>Committed to transparency — no gimmicks, spam, "gamification", or intrusive push notifications.</p>

                <h3>The Zerodha universe</h3>
                <p className='text-muted'>More than just an app — gain free access to the entire ecosystem of our partner products.</p>

            </div>
            </div>
        </div>
    );
}

export default AccountBenifits;