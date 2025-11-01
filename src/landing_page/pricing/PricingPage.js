import React from 'react';
import ChargesHeader from './ChargesHeader';
import AccountOpeningFees from './AccountOpeningFees';
import DematAMC from './DematAMC';
import AddOnServices from './AddOnServices';
import ChargesExplanation from './ChargesExplanation';
import ChargesForAccountOpening from './ChargesForAccountOpening';

function PricingPage() {
    return (  
        <>
            <ChargesHeader />
            <ChargesExplanation/>
            <AccountOpeningFees />
            <ChargesForAccountOpening/>
            <DematAMC />
            <AddOnServices />
        </>
    );
}

export default PricingPage;