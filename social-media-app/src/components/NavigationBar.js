import React from 'react';
import { useNavigate } from 'react-router';

export default function NavigationBar() {
    const navigate = useNavigate();
    const handleClickNav = (e, page) => {
        e.preventDefault();
        switch (page) {
            case 'Home':
                return navigate('/');
            case 'Users':
                return navigate('/users');
            case 'Posts':
                return navigate('/posts');
            default:
                break;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand pointer" onClick={ (e) => handleClickNav(e, 'Home') }>Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active pointer" aria-current="page" onClick={ (e) => handleClickNav(e, 'Users') }>Users</a>
                        </li>
                        {/* <li className="nav-item">
                        <a className="nav-link active pointer" aria-current="page" onClick={(e) => handleClickNav(e, 'Posts')}>Posts</a>
                    </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
