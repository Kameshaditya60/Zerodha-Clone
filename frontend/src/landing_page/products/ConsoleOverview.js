import React from 'react';
import RightSection from './RightSection';
function ConsoleOverview() {
    return ( 
      <RightSection
          imageUrl='media/images/products-console.png'
          title='Console'
          description='Our powerful trading console for advanced users. Get access to real-time market data, advanced charting tools, and a customizable interface.'
          tryDemoLink='https://console-demo.zerodha.com/'
          learnMoreLink='https://zerodha.com/products/console'
          googlePlayLink='https://play.google.com/store/apps/details?id=com.zerodha.console'
          appStoreLink='https://apps.apple.com/in/app/console-zerodha/id1449453802'
      />
     );
}

export default ConsoleOverview;