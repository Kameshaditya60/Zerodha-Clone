import React from 'react';
import HeroBanner from './HeroBanner';
import AccountSteps from './AccountSteps';
import AccountBenifits from './AccountBenifits';
import AccountTypes from './AccountTypes';
import InvestmentOptions from './InvestmentOptions';
import FAQSection from './FAQSection';
import SignupCTA from './SignupCTA';
import OpenAccount from '../OpenAccount';
function SignupPage() {
    return (
        <>
            <HeroBanner />
             <SignupCTA />
            <InvestmentOptions />
            <AccountSteps />
            <AccountBenifits />
            <AccountTypes />
            <FAQSection />
            <OpenAccount/>

           

        </>
    );
}

export default SignupPage;