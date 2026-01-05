import React from 'react';
function RightSection({ imageUrl, title, description, tryDemoLink, learnMoreLink, googlePlayLink, appStoreLink }) {
    return (
        <div className='container'>
            <div className='row align-items-center my-5'>
                 <div className='col-4'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className='d-flex'>
                <a href={learnMoreLink} className='ms-5'>Learn More</a>
                    </div>
                  </div>
                <div className='col-6 me-2'>
                    <img src={imageUrl} alt={title} className='img-fluid me-5' />
                </div>
               
            </div>
        </div>
    );
}

export default RightSection;