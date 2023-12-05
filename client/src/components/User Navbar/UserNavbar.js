import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import './UserNavbar.css';

const UserNavbar = ({handleLogout}) => {
  return (
    <Nav className="nav">
        <a href='/userDashboard' className='site-title'>
            Profile
        </a>

        <ul>
            <li>
                <a href="#" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </Nav>
  );
};

export default UserNavbar;