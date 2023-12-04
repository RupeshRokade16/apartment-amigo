const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function loginUser(username, password) {
  const user = await User.findOne({ username, password });

  //const passwordMatch = await bcrypt.compare(password, user.password);
  const passwordMatch = password === user.password;

  if (user && passwordMatch) {
    //User authenticated, generate token
    const token = jwt.sign({ userID: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    //Returning token
    return { user, token };
  } else {
    return null; //Login failure
  }
}

async function registerUser(username, email, password) {
  const newUser = new User({ username, email, password });
  await newUser.save();
  return newUser;
}

async function getUserData(headers) {
  console.log('Printing :' , headers.authorization);
  const token = headers.authorization.replace("Bearer ", "");

  return new Promise((resolve, reject) => {
    jwt.verify(token, "your_secret_key", async (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err);
        reject(err);
      }

      console.log("Decoded token:", decoded); // Add this line for debugging

      const user = await User.findById(decoded.userID);

      if (user) {
        resolve({ user });
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = { loginUser, registerUser, getUserData };
