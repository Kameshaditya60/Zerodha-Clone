import React from 'react';
function ChargesTable({tableTitle, columns, rows}) {
    return (
        <div className='container'>
            <div>
                <h2 className='my-4'>{tableTitle}</h2>
                <table className='table table-bordered'>
                    <thead className='table-light'>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className='text-start'>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                       {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className='text-start'>{row.category}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex} className='text-start'>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
             </div>
            
        </div>
    );
}
export default ChargesTable;