// HouseholdSelection.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const HouseholdSelection = () => {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [redirect, setRedirect] = useState(false);
  const[dashboardRedirect, setDashboardRedirect] = useState(false);

  useEffect(() => {
    const checkExistingToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setRedirect(true);
      }
    };

    checkExistingToken();
  }, []);

  const handleShow = (selectedAction) => {
    setAction(selectedAction);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setAction('');
    setInputValue('');
  };

  const handleConfirm = async () => {
    // Handle confirmation logic based on the selected action and input value
    try {
        // Handle confirmation logic based on the selected action and input value
        console.log(`Action: ${action}, Input Value: ${inputValue}`);
  
        // Call the function to create or join a household
        const response = await AuthService.createOrJoinHousehold(action, inputValue);
  
        console.log("MAIN PAGE", response);
        if (response){
          setDashboardRedirect(true);
        }
        // You can add further logic here, such as updating state or navigating to another page
        handleClose();
      } catch (error) {
        // Handle errors
        console.error('Error creating or joining household:', error);
      }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (dashboardRedirect) {
    return <Navigate to="/userDashboard" />;
  }

  return (
    <div>
      <h2>Household Selection</h2>
      <Button variant="primary" onClick={() => handleShow('create')}>
        Create New Household
      </Button>{' '}
      <Button variant="success" onClick={() => handleShow('join')}>
        Join Existing Household
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action === 'create' ? 'Create New Household' : 'Join Existing Household'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHousehold">
              <Form.Label>
                {action === 'create' ? 'Enter Household Name:' : 'Enter Household ID:'}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={action === 'create' ? 'Household Name' : 'Household ID'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HouseholdSelection;
