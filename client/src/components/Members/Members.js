import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendUrlPrefix from '../../utils/backendUrlPrefix.js';
import './Members.css'

function Members(props) {
    const [members, setMembers] = useState([]);
    const householdID = props.householdID;

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch household members instead of hardcoded 'users'
            const membersResponse = await axios.get(`${backendUrlPrefix}/households/${householdID}/members`);
            const householdMembers = membersResponse.data;
            setMembers(householdMembers);
          } catch (error) {
            console.error('Error fetching data from the backend:', error);
          }
        };
    
        fetchData();
      }, [householdID]);
  
  
      return (
        <div>
          <ul>
            {members.map((member) => (
              <li key={member._id}>
                <h4>{member.username}</h4></li>
            ))}
          </ul>
        </div>
      );
    };


export default Members

