import React from 'react';
function PlatformCard({imageLogo, platformDiscriptionuu}) {
    return ( 
        <div className='text-center align-'>
            <img src={imageLogo} alt="Platform Logo" className='img-fluid mb-3' style={{width:"70%"}} />
            <p className='text-muted fs-7'>{platformDiscriptionuu}</p>
        </div>
     );
}

export default PlatformCard;