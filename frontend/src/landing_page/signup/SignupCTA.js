import React from 'react';
function SignupCTA() {
    return (
        <div className='container text-center d-flex'> 
          <div className='my-5 col-6'>
        <img src='./media/images/account_open.svg' alt='Signup CTA' className='img-fluid' />
          </div>
          <div className='col-6 justify-content-center align-items-center my-5 m-3'>
            <h1 className='mb-2'> Signup Now</h1>
            <p className='mt-5'>Or track your existing application</p>
            <form>
                <input type='number' placeholder='Enter Your Mobile Number' className='me-2 p-2 mb-2' /> <br/>
                <button type='submit' className='btn btn-primary p-2 '>Get OTP</button>
            </form>
            <p className='mt-3'> By proceeding, you agree to the Zerodha <a href='https://zerodha.com/terms-and-conditions'>terms</a>& <a href='https://zerodha.com/privacy-policy'> privacy policy </a></p>
            <hr/>
            <p>Looking to open NRI account? <a href='https://zerodha.com/open-account/nri'>Click Here</a></p>
          </div>
        </div>
    );
}

export default SignupCTA;