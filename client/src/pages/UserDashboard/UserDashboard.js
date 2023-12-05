import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiCaller from '../../utils/apiCaller';
import AuthService from '../../services/authService';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    // Clear the token from localStorage
    AuthService.logout();

    // Set redirect to true to navigate to the login page
    setRedirect(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        //console.log('Token' ,token);
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
          console.log(headers)
          const response = await apiCaller.get('/api/userData', { headers });
          console.log('response data file ', response.data.user.household);
          
          setUserData(response.data.user);
          
        } else {
          // Token is not available, setRedirect to true
          setRedirect(true);
        }
      } catch (error) {
        // Handle errors
        console.error(error);

        // Check if the error is due to an invalid/expired token
        if (error.response && error.response.status === 401) {
          // Clear the invalid token and redirect to login
          AuthService.logout();
          setRedirect(true);
        }
      }
    };

    fetchUserData();
  }, []);

  // Redirect to login page if redirect state is true
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.username}!</p>
          <p>Household code, {userData.household}</p>
          {/* Render other user dashboard content */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
