import React from 'react';
import ChargesTable from './ChargesTable';
function DematAMC() {
    const tableTitle = "Demat AMC (Annual Maintenance Charge)";
    const columns = ['Value of holdings', 'AMC'];
    const rows = [
        {
            category: 'Up to ₹4 lakh',
            values: ['Free']
        },
        {
            category: '₹4 lakh - ₹10 lakh',
            values: ['₹ 100 per year, charged quarterly*']
        },
        {
            category: 'Above ₹10 lakh',
            values: ['₹ 300 per year, charged quarterly']
        }
        
    ];
    return (
        <>
       <ChargesTable columns={columns} rows={rows} tableTitle={tableTitle} />
       <p className='text-center'>* Lower AMC is applicable only if the account qualifies as a Basic Services Demat Account (BSDA). BSDA account holders cannot hold more than one demat account. To learn more about BSDA, <a href='http://localhost:3000/pricing'>click here</a>

</p> </>
    );
}

export default DematAMC;