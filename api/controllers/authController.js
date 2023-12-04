const authService = require("../services/authService");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const result = await authService.loginUser(username, password);

    if (result) {
      res
        .status(200)
        .json({
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
  console.log('Reached here ', req.body.authorization )
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

module.exports = { router, login, register, userData };
