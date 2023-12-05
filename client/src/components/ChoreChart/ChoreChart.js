import React, { useState, useEffect } from 'react';
import './ChoreChart.css'; // Import the CSS file
import axios from 'axios';

const ChoreChart = (props) => {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState('');
  const [editingChore, setEditingChore] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);

  const householdID = props.householdID;
  //const householdID = '656dffd6e3baf8051351da1a'; // HARDCODED FOR NOW -- UPDATE DYNAMICALLY LATER
  const backendApiUrl = `http://localhost:5000/households/${householdID}/chores`; // Replace 'your_household_id'

  

  // ...

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch household members instead of hardcoded 'users'
      const membersResponse = await axios.get(`http://localhost:5000/households/${householdID}/members`);
      const householdMembers = membersResponse.data;

      const choresResponse = await axios.get(backendApiUrl);
      setChores(choresResponse.data);

      // Set household members to be used in the dropdown
      setMembers(householdMembers);
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };

  fetchData();
}, [backendApiUrl, householdID]);

// ...


  const addChore = () => {
    if (newChore.trim() === '') return;

    const newChoreObject = {
      choreName: newChore,
      assignee: null,
    };

    axios.post(backendApiUrl, newChoreObject)
      .then(response => {
        setChores([...chores, response.data]);
      })
      .catch(error => {
        console.error('Error adding chore to the backend:', error);
      });

    setNewChore('');
  };

  const deleteChore = (choreId) => {
    axios.delete(`${backendApiUrl}/${choreId}`)
      .then(() => {
        setChores(chores.filter((chore) => chore._id !== choreId));
      })
      .catch(error => {
        console.error('Error deleting chore from the backend:', error);
      });

    setEditingChore(null);
  };

  const toggleChoreStatus = (choreId) => {
    axios.patch(`${backendApiUrl}/${choreId}`, { completed: !chores.find(chore => chore._id === choreId).completed })
      .then(response => {
        const updatedList = chores.map((chore) =>
          chore._id === choreId ? response.data : chore
        );
        setChores(updatedList);
      })
      .catch(error => {
        console.error('Error toggling chore status in the backend:', error);
      });

    setEditingChore(null);
  };

  const startEditingChore = (chore) => {
    setEditingChore({ ...chore });
    setIsModalOpen(true);
  };

  const finishEditingChore = () => {
    const updatedChoreData = {
      choreName: editingChore.choreName,
      // Send assignee as an object containing the _id
      assignee: editingChore.assignee ? { _id: editingChore.assignee._id } : null,
    };
  
    axios.put(`${backendApiUrl}/${editingChore._id}`, updatedChoreData)
      .then(response => {
        const updatedList = chores.map((chore) =>
          chore._id === editingChore._id ? response.data : chore
        );
        setChores(updatedList);
      })
      .catch(error => {
        console.error('Error updating chore in the backend:', error);
      });
  
    setEditingChore(null);
    setIsModalOpen(false);
  };
  
  

  const handleModalClose = () => {
    setEditingChore(null);
    setIsModalOpen(false);
  };

  return (
    <div className="chore-chart">
      <div className="add-chore">
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new chore"
            value={newChore}
            onChange={(e) => setNewChore(e.target.value)}
          />
          <button className="add-button" onClick={addChore}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <table>
        <tbody>
          
          {chores.map((chore) => (
            <tr key={chore._id} className={chore.completed ? 'completed' : ''}>
              <td>
                <div>
                  <button onClick={() => startEditingChore(chore)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button onClick={() => deleteChore(chore._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
              <td>
                {editingChore && editingChore._id === chore._id ? (
                  <div className="modal">
                    <input
                      type="text"
                      value={editingChore.choreName}
                      onChange={(e) => setEditingChore({ ...editingChore, choreName: e.target.value })}
                    />
                    <button onClick={finishEditingChore}>
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={handleModalClose}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <span>{chore.choreName}</span>
                )}
              </td>
              <td>
              

{editingChore && editingChore._id === chore._id ? (
  // Edit mode - dropdown for assigning a user
  <div>
    <select
      value={editingChore.assignee ? editingChore.assignee : ''}
      onChange={(e) =>
        setEditingChore({
          ...editingChore,
          assignee: members.find((member) => member._id === e.target.value) || null,
        })
      }
    >
      <option value="">Select Assignee</option>
      {members.map((member) => (
        <option key={member._id} value={member._id}>
          {member.username}
        </option>
      ))}
    </select>
    <button onClick={finishEditingChore}>
      Save
    </button>
    <button onClick={handleModalClose}>
      Cancel
    </button>
  </div>
) : (
  // Display mode - show assigned user's name
 <span>
    {chore.assignee ? (
      members.find((member) => member._id === chore.assignee).username
    ) : (
      'Not Assigned'
    )}
  </span>
)}




              </td>

              <td>
                <button onClick={() => toggleChoreStatus(chore._id)}>
                  {chore.completed ? 'Uncomplete' : 'Complete'}
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChoreChart;

