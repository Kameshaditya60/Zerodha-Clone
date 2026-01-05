import React from 'react';
import ChargesTable from './ChargesTable';
function ChargesForAccountOpening() {
    const tableTitle = "Charges for account opening";
    const columns = ['Type of Accounts', 'Charges (₹)'];
    const rows = [
        {
            category: 'Online Account',
            values: ['Free']
        },
        {
            category: 'Offline Account',
            values: ['Free']
        },
        {
            category: 'NRI account (offline only)',
            values: ['₹ 500']
        },
        {
            category: 'Partnership, LLP, HUF, or Corporate accounts (offline only)',
            values: ['₹ 500']
        }
    ];
    return (
       <ChargesTable columns={columns} rows={rows} tableTitle={tableTitle} />
    );
}

export default ChargesForAccountOpening;