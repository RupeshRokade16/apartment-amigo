// ShoppingList.js

import React, { useState, useEffect } from 'react';
import './ShoppingList.css'; // Import the CSS file
import axios from 'axios';

const ShoppingList = () => {
  const [toDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backendApiUrl = 'http://localhost:3001/tasks';
  useEffect(() => {
   

    const fetchData = async () => {
      try {
        const response = await axios.get(backendApiUrl);
        setToDoList(response.data);
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    };

    fetchData();
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObject = {
      task: newTask,
    };

    axios.post(backendApiUrl, newTaskObject)
      .then(response => {
        setToDoList([...toDoList, response.data]);
      })
      .catch(error => {
        console.error('Error adding task to the backend:', error);
      });

    setNewTask('');
  };

  const deleteTask = (taskId) => {
    axios.delete(`${backendApiUrl}/${taskId}`)
      .then(() => {
        setToDoList(toDoList.filter((task) => task._id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task from the backend:', error);
      });

    setEditingTask(null);
  };

  const toggleTaskStatus = (taskId) => {
    axios.patch(`${backendApiUrl}/${taskId}`, { completed: !toDoList.find(task => task._id === taskId).completed })
      .then(response => {
        const updatedList = toDoList.map((task) =>
          task._id === taskId ? response.data : task
        );
        setToDoList(updatedList);
      })
      .catch(error => {
        console.error('Error toggling task status in the backend:', error);
      });

    setEditingTask(null);
  };

  const startEditingTask = (task) => {
    setEditingTask({ ...task });
    setIsModalOpen(true);
  };

  const finishEditingTask = () => {
    axios.put(`${backendApiUrl}/${editingTask._id}`, { task: editingTask.task })
      .then(response => {
        const updatedList = toDoList.map((task) =>
          task._id === editingTask._id ? response.data : task
        );
        setToDoList(updatedList);
      })
      .catch(error => {
        console.error('Error updating task in the backend:', error);
      });

    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="shopping-list">
      <div className="add-task">
        <div className="input-container">
          <input
            type="text"
            placeholder="Add a new item"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <table>
        <tbody>
          {toDoList.map((task) => (
            <tr key={task._id} className={task.completed ? 'completed' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task._id)}
                />
              </td>
              <td>
                {editingTask && editingTask._id === task._id ? (
                  <div className="modal">
                    <input
                      type="text"
                      value={editingTask.task}
                      onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
                    />
                    <button onClick={finishEditingTask}>
                      <i className="fas fa-check"></i>
                    </button>
                    <button onClick={handleModalClose}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <span>{task.task}</span>
                )}
              </td>
              <td>
                <div>
                  <button onClick={() => startEditingTask(task)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button onClick={() => deleteTask(task._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingList;
