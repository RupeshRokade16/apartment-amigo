import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import image from "../../assets/images/img-avatar.png";
import { Navigate, useNavigate } from "react-router-dom";
import apiCaller from "../../utils/apiCaller";
import AuthService from "../../services/authService";

const UserProfile = (props) => {
  const [userData, setUserData] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [household, setHousehold] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        //console.log('Token' ,token);
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          //console.log(headers)
          const response = await apiCaller.get("/api/userData", { headers });
          console.log("response data file ", response.data.user);
          console.log("Before USER DATA", userData);
          setUserData(response.data.user);
          console.log("user data after", userData);
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

  useEffect(() => {
    const fetchHouseholdData = async () => {
      try {
        const householdID = userData.household

        const response = await apiCaller.get(`/households/${householdID}`); // Replace 'householdData' with your actual API endpoint

        setHousehold(response.data);
        console.log("household data",response.data)
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 401) {
          AuthService.logout();
          setRedirect(true);
        }
      }
    };

    fetchHouseholdData();
  }, []);

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    console.log("here");

    navigate("/userDashboard");
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="card">
        <img
          src={image}
          className="img-fluid image"
          style={{ width: "100%" }}
        />

        <h1>
          <b>{userData.username}</b>
        </h1>
        <p>Your Email: {userData.email}</p>

        <p>
          You belong to the <b>{household.name}</b> household 
        </p>
        <button onClick={navigateToDashboard}>Dashboard</button>
      </div>
    </>
  );
};

export default UserProfile;
