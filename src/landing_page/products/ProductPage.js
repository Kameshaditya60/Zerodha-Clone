import React from 'react';
import ProductHeader from './ProductsHeader';
import KiteOverview from './KiteOverview';
import ConsoleOverview from './ConsoleOverview';
import CoinOverview from './CoinOverview';
import KiteConnectAPI from './KiteConnectAPI';
import VarsityMobile from './VarsityMobile';
import ZerodhaUniverse from './ZerodhaUniverse';

function ProductPage() {
    return (
        <>
            <ProductHeader />
            <KiteOverview />
            <ConsoleOverview />
            <CoinOverview />
            <KiteConnectAPI />
            <VarsityMobile />
            <ZerodhaUniverse />
        </>
    );
}

export default ProductPage;