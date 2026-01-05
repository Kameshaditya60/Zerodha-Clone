import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div className='container text-center mb-5'>
            <h2>Page Not Found</h2>
            <p className='fs-7 mb-4'>Sorry, the page you are looking for does not exist.</p>
            <Link className='btn btn-primary btn-lg fs-6' to={"/"}>Go to Home</Link>
        </div>
    );
}

export default NotFound;