import React from 'react';
import LeftSection from './LeftSection';
function CoinOverview() {
    return ( 
      <LeftSection
          imageUrl='media/images/products-coin.png'
          title='Coin'
          description='Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.'
          tryDemoLink='https://coin.zerodha.com/'
          linkName='Coin'
          googlePlayLink='https://play.google.com/store/apps/details?id=com.zerodha.coin'
          appStoreLink='https://apps.apple.com/in/app/coin-zerodha/id1449453802'
      />
     );
}

export default CoinOverview;