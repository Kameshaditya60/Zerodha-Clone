import React from 'react';

function CompanyStats() {
    return ( 
        <div className='container'>
              <div className='row mt-5' >
                <hr className='mb-5' />
                <div className='col-6'>
                    <p className='text-muted fs-6' >We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
                    <p className='text-muted fs-6' >
                        Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.
                    </p>
                    <p className='text-muted fs-6' >
                        Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
                </div>

                <div className='col-6'>
                    <p className='text-muted fs-6' >
                        In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>

                    <p className='text-muted fs-6' >
                        <a href="https://rainmatter.com">Rainmatter</a> , our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>

                    <p className='text-muted fs-6' >
                        And yet, we are always up to something new every day. Catch up on the latest updates on our <a href="https://zerodha.com/z-connect">blog</a> or see what the media is <a href="https://zerodha.com/media">saying about us</a> or learn more about our business and product <a href="https://zerodha.com/about/philosophy/">philosophies</a>.   </p>
                </div>
            </div>
            </div>
     );
}

export default CompanyStats;