import React from 'react';
import ChargesTable from './ChargesTable';
function AddOnServices() {
    const titleTable ="Charges for optional value added services";
    const columns = ['Service',	'Billing Frquency',	'Charges'];
    const rows = [
        {
        
        values:['Tickertape',	'Monthly / Annual',	'Free: 0 | Pro: 249/2399']
    },
    {
        
        values:['Smallcase',	'Per transaction',	'Free: 0 | Basic: 10 | Premium: 20']
    },
    {
        
        values:['Kite Connect',	'Monthly',	'Connect: 500 | Personal: Free']
    }
]
    return (  
        <ChargesTable tableTitle= {titleTable} columns={columns} rows={rows} />
    );
}

export default AddOnServices;