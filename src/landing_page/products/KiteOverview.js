import React from 'react';
import LeftSection from './LeftSection';
function KiteOverview() {
    return (
        <div className='container'>
            <LeftSection
                imageUrl='media/images/products-kite.png'
                title='Kite'
                description='Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.'
                linkName='Try Demo'
                tryDemoLink='https://kite-demo.zerodha.com/'
                linkName2='Learn More'
                learnMoreLink='https://zerodha.com/products/kite'
                googlePlayLink='https://play.google.com/store/apps/details?id=com.zerodha.kite3'
                appStoreLink='https://apps.apple.com/in/app/kite-zerodha/id1449453802'
            />
        </div>
    );
}

export default KiteOverview;