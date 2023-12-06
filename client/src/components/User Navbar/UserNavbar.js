  import React from 'react';
  import Navbar from 'react-bootstrap/Navbar';
  import Nav from 'react-bootstrap/Nav';
  import { Link } from 'react-router-dom';

  import './UserNavbar.css';

  const UserNavbar = (props) => {
    const {user, handleLogout} = props;
    const userProfilePath = '/profile';
    // const userProfileProps = user ; // Replace with your actual prop and value

    return (
      <div>
        {/* Pass custom props using the "to" prop and the "state" object */}
        <Link to={{ pathname: userProfilePath, state: {user} }} className='site-title'>
          Profile {user.username}
        </Link>
  
        <ul>
          <li>
            {/* You can also pass props in a similar way for other Links */}
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  export default UserNavbar;