import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHouseholds, setTotalHouseholds] = useState(0);
  const [selectedHouseholdId, setSelectedHouseholdId] = useState('');
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // Function to fetch household members based on the selected id
  const fetchHouseholdMembers = async () => {
    // fetchHouseholdMembersById(selectedHouseholdId).then(data => setHouseholdMembers(data));
  };

  // Function to remove a member from a household
  const removeMemberFromHousehold = async (memberId) => {
    // removeMember(selectedHouseholdId, memberId).then(() => fetchHouseholdMembers());
  };

  const handleLogout = () => {
    // Simulate logout by removing the fake token
    localStorage.removeItem('token');
    // Set the state to trigger the redirect
    setRedirectToLogin(true);
  };

  useEffect(() => {
    const checkExistingToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If the token is not present, redirect to the admin login page
        setRedirectToLogin(true);
      }
    };

    checkExistingToken();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Use the Navigate component directly instead of returning it from the render function
  if (redirectToLogin) {
    return <Navigate to="/adminLogin" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Page</h2>

      <div className="mb-3">
        <p>Total Number of Users: {totalUsers}</p>
        <p>Total Number of Households: {totalHouseholds}</p>
      </div>

      <div className="mb-3">
        <h3>Select Household by ID</h3>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={selectedHouseholdId}
            onChange={(e) => setSelectedHouseholdId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchHouseholdMembers}>
            Select Household
          </button>
        </div>
      </div>

      {selectedHouseholdId && (
        <div>
          <h3>Household Members</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Member Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {householdMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeMemberFromHousehold(member.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
