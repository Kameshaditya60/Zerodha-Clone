import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
function KiteConnectAPI() {
    return ( 
       <RightSection
           imageUrl='media/images/kiteconnect.png'
           title='Kite Connect API'
           description='Build your own trading platform with our powerful API. Get access to real-time market data, advanced charting tools, and a customizable interface.'
           tryDemoLink='https://kiteconnect.com/'
           learnMoreLink='https://kiteconnect.com/docs/v3/#introduction'
           googlePlayLink='https://play.google.com/store/apps/details?id=com.zerodhakite'
           appStoreLink='https://apps.apple.com/in/app/kite-by-zerodha/id1081194928'
       />
     );
}

export default KiteConnectAPI;