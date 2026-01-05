import React from 'react';
function LeftSection({ imageUrl, title, description, tryDemoLink, learnMoreLink, googlePlayLink, appStoreLink,linkName,linkName2 }) {
    return (
        <div className='container'>
            <div className='row align-items-center my-5'>
                <div className='col-6 me-2'>
                    <img src={imageUrl} alt={title} className='img-fluid me-5' />
                </div>
                <div className='col-4'>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className='d-flex'>
                        <a href={tryDemoLink} className='me-3'>{linkName}</a>
                        <a href={learnMoreLink} className='ms-5'>{linkName2}</a>
                    </div>
                    <div className='mt-4'>
                        <a href={googlePlayLink} className='me-3'><img src='media/images/googlePlayBadge.svg' alt='Google Play' /></a>
                        <a href={appStoreLink} className='ms-2'><img src='media/images/appstoreBadge.svg' alt='App Store' /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;