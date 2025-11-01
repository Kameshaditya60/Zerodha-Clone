import React from 'react';
import './AccountSteps.css';

function AccountSteps() {
    return ( 
        <div className='container text-center my-5'>
            <h3>Steps to open a demat account with Zerodha</h3>
            <div className='d-flex flex-column flex-md-row justify-content-around align-items-center my-4'>
                <img src='./media/images/steps-acop.svg' alt='account opening steps' className='img-fluid my-4'/>
                <div className='steps-container'>
                    <div className='step-item'>
                        <div className='step-number'>1</div>
                        <div className='step-text'>Enter the requested details</div>
                    </div>
                    <hr/>
                    <div className='step-item'>
                        <div className='step-number'>2</div>
                        <div className='step-text'>Complete e-sign & verification</div>
                    </div>
                    <hr/>
                    <div className='step-item'>
                        <div className='step-number'>3</div>
                        <div className='step-text'>Start investing!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSteps;