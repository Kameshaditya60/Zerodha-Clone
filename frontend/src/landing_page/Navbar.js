import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <Link className='ml-10' class="navbar-brand" to={"/"}>
                    <img src='media/images/logo.svg' alt='Zerodha Logo' className='img-fluid' style={{ width: '120px' }} />
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent" className=''>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/signup">Signup</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/about">Abouts</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/products">Products</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/pricing">Pricing</Link>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link" to="/support">Support</Link>
                        </li>

                    </ul>
                    <form class="d-flex" role="search">
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;