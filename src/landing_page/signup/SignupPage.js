import React from 'react';
import HeroBanner from './HeroBanner';
import AccountSteps from './AccountSteps';
import AccountBenifits from './AccountBenifits';
import AccountTypes from './AccountTypes';
import InvestmentOptions from './InvestmentOptions';
import FAQSection from './FAQSection';
import SignupCTA from './SignupCTA';
function SignupPage() {
    return (
        <>
            <HeroBanner />
            <InvestmentOptions />
            <AccountSteps />
            <AccountBenifits />
            <AccountTypes />
            <FAQSection />
            <SignupCTA />

        </>
    );
}

export default SignupPage;