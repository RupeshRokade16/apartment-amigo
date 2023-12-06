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

  //Validation check
  const errors = validateRegistrationInput(username, email, password);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ message: "Validation Error", errors });
    return;
  }

  try {
    const newUser = await authService.registerUser(username, email, password);
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      // Duplicate key error (username already exists)
      res
        .status(400)
        .json({ message: "User already exists with this username or email" });
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

//Update user information (email and username only)
const updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email } = req.body;

    //console.log("REACHED HERE")

    if (!isValidUsername(username) || !isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid username or email format" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true } // Return the updated document
    );

    console.log("New user email and username", user.email, user.username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//validation functions
const isValidEmail = (email) => {
  // Add your email validation logic here
  // For example, you might use a regular expression to check the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email);
};

const isValidUsername = (username) => {
  // Add your username validation logic here
  // For example, you might check for a minimum length, maximum length, or specific character requirements
  return typeof username === "string" && username.length >= 3;
};

function validateRegistrationInput(username, email, password) {
  const errors = {};

  // Username validation
  if (!username || typeof username !== "string") {
    errors.username = "Username is required and must be a string";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    errors.email = "Email is required and must be a valid email address";
  }

  // Password validation
  if (!password || typeof password !== "string") {
    errors.password = "Password is required and must be a string";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
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
    const userId = req.userId; // Assuming you have middleware setting userId in the request
    //console.log("USERID - ",userId)
    // Check the action (create or join) and perform the corresponding logic
    if (action === "create") {
      // Create a new household
      const newHousehold = new Household({
        name: inputValue,
        members: [userId],
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

      console.log("user ", user);

      res.status(200).json({
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
      await user.save();

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

module.exports = {
  router,
  login,
  register,
  userData,
  createOrJoinHousehold,
  updateUserData,
};
