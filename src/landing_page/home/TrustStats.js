import React from 'react';
import './TrustStats.css';
function TrustStats() {
    return (
        <div className='container p-10 mb-5'>
            <div className='row  p-10 ' >
                <div className='col-5'>
                    <h1 className='mb-5 fs-5'>Trust with confidence</h1>

                    <h2 className='fs-6'>Customer-first always</h2>
                    <p className='fs-7'>That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.</p>

                    <h2 className='fs-6'>No spam or gimmicks</h2>
                    <p className='fs-7'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href="#">Our philosophies.</a></p>

                    <h2 className='fs-6'>The Zerodha universe</h2>
                    <p className='fs-7'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>

                    <h2 className='fs-6'>Do better with money</h2>
                    <p className='fs-7'>With initiatives like <a href="#">Nudge</a> and <a href="#">Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.</p>

                </div>
                <div className='col-7 d-flex flex-column align-items-center justify-content-center'>
                    <img src='media/images/ecosystem.png' alt='Ecosystem Image' className='img-fluid' style={{ width: '75%' }} />
                    <div className='mt-4 mb-4 d-flex align-items-center justify-content-between max-width'>
                        <a href='#' className='fs-7 mx-5' style={{ textDecoration: 'none' }}>Explore our products<i class="fa-solid fa-arrow-right"></i></a>
                        <a href='#' className='fs-7' style={{ textDecoration: 'none' }}>Try Kite <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>


            </div>
            <div className='row'>
                <img src='media/images/pressLogos.png' alt='Press Logos' className='img-fluid' style={{ width: "75%", margin: '0 auto' }} />
            </div>
        </div>
    );
}

export default TrustStats;