import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Set to true initially
  const [error, setError] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [redirectToHousehold, setRedirectToHousehold] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await AuthService.login({ username, password });

      if (result && result.token) {
        // Login successful, redirect to the user dashboard
        console.log("Here is the user", result.user)
        console.log("print statement ",  result.user.household==null);
        if (result.user.household == null){
          console.log("here")
          setRedirectToHousehold(true);
          
        } else {
          setRedirectToDashboard(true);
        }

      } else {
        // Handle login failure
        setError('Invalid username or password');
      }
    } catch (error) {
      // Handle errors
      setError('An error occurred during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkExistingToken = async () => {
      const token = localStorage.getItem('token');
      // if (token) {
      //   try{
      //     const userInfo = AuthService.getUserInfo();
      //   }
      //   // Redirect to userDashboard if a token exists
      //   setRedirectToDashboard(true);
      // }

      if (token){
        setRedirectToDashboard(true);
      }
      setIsLoading(false); // Set loading to false after the check
    };

    checkExistingToken();
  }, []); // Empty dependency array ensures it runs only once on mount

  if (isLoading) {
    // Render loading indicator or message while checking for the token
    return <p>Loading...</p>;
  }

  if (redirectToHousehold) {
    return <Navigate to="/householdSelection" />;
  }

  if (redirectToDashboard) {
    return <Navigate to="/userDashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
