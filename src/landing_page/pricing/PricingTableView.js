import React from 'react';
function PricingTableView({ columns, rows }) {
    return ( 
        <div className='container mb-5'>
            <table className='table table-bordered'>
                <thead className='table-light'>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className='text-center'>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className='text-center'>{row.category}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex} className='text-center'>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PricingTableView;