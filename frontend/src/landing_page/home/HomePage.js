import React from 'react';
import HeroBanner from './HeroBanner';
import TrustStats from './TrustStats';
import Navbar from '../Navbar';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Footer from '../Footer';
function HomePage() {
    return (
        <>
            <HeroBanner />
            <TrustStats />
            <Pricing />
            <Education />
            <OpenAccount />

        </>
    );
}

export default HomePage;