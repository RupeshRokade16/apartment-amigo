const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Household = require('../models/householdModel');

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username and email are unique
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Get user details
router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('household');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user information
router.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Delete a user
router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Join a household
// Join a household
router.post('/users/:userId/join-household/:householdId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const householdId = req.params.householdId;
  
      const user = await User.findById(userId);
      const household = await Household.findById(householdId);
  
      if (!user || !household) {
        return res.status(404).json({ message: 'User or household not found' });
      }
  
      if (household.members.includes(userId)) {
        return res.status(400).json({ message: 'User is already a member of the household' });
      }
  
      household.members.push(userId);
      await household.save();
  
      user.household = householdId;
      await user.save();
  
      res.status(200).json({ message: 'User joined the household successfully', user, household });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // ...

// Get all members for a specific household
router.get('/households/:householdId/members', async (req, res) => {
    try {
      const householdId = req.params.householdId;
      const household = await Household.findById(householdId).populate('members');
      const members = household.members;
      res.json(members);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // ...
  
  

// Other user controller functions...

module.exports = router;
