const authService = require("../services/authService");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Household = require("../models/householdModel");
const User = require("../models/userModel");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const result = await authService.loginUser(username, password);

    if (result) {
      res.status(200).json({
        message: "Login successful",
        user: result.user,
        token: result.token,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Encountered server error" });
  }
}

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const newUser = await authService.registerUser(username, email, password);
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Encountered server error" });
    }
  }
}

async function userData(req, res) {
  console.log("Reached here ", req.body.authorization);
  try {
    // No need to check for token presence here; authMiddleware will handle it
    const result = await authService.getUserData(req.headers);

    if (result) {
      res.status(200).json({
        message: "User data retrieved successfully",
        user: result.user,
      });
    } else {
      res.status(401).json({ message: "Invalid token or user data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Encountered server error" });
  }
}

const router = express.Router();

// Example of a protected route that checks if the token is valid
router.get("/validateToken", authMiddleware, (req, res) => {
  // If the middleware is reached, the token is valid
  res.status(200).json({ message: "Token is valid" });
});

const createOrJoinHousehold = async (req, res) => {
  try {
    //console.log("!")
    const result = await authService.getUserData(req.headers);
    
    const { action, inputValue } = req.body;
    //console.log("---------------" ,result);
    //console.log("XXXXXXXXX")
    const userId = req.userId // Assuming you have middleware setting userId in the request
    //console.log("USERID - ",userId)
    // Check the action (create or join) and perform the corresponding logic
    if (action === "create") {
      // Create a new household
      const newHousehold = new Household({
        name: inputValue,
        members : [userId]
      });
      
      await newHousehold.save();

      const user = await User.findById(userId);
      //console.log("Household object" ,newHousehold);
      
      //console.log("Before" ,userId)
      // Update the user with the new household ID
      // const user = await User.findByIdAndUpdate(userId, {
      //   household: newHousehold._id,
      // });

      user.household = newHousehold._id;
      await user.save();

      console.log("user ",user)

      res
        .status(200)
        .json({
          message: "Household created successfully",
          household: newHousehold,
        });
    } else if (action === "join") {
      // Join an existing household
      const household = await Household.findById(inputValue);

      if (!household) {
        return res.status(404).json({ message: "Household not found" });
      }

      // Add the user to the household members
      household.members.push(userId);
      await household.save();

      // Update the user with the new household ID
      // const user = await User.findByIdAndUpdate(userId, {
      //   household: household._id,
 //     });

      const user = await User.findById(userId);
      user.household = household._id;
      await household.save();


      res
        .status(200)
        .json({ message: "Joined household successfully", household });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error creating or joining household:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { router, login, register, userData, createOrJoinHousehold };
