import React from 'react';
import ChargesHeader from './ChargesHeader';
import AccountOpeningFees from './AccountOpeningFees';
import DematAMC from './DematAMC';
import AddOnServices from './AddOnServices';
import ChargesExplanation from './ChargesExplanation';

function PricingPage() {
    return (  
        <>
            <ChargesHeader />
            <AccountOpeningFees />
            <DematAMC />
            <AddOnServices />
            <ChargesExplanation />
        </>
    );
}

export default PricingPage;