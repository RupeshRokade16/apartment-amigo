// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./configure.env" });

// Set up the port, default to 5000 if not provided in the environment
const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for the app
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Include the routes defined in the "record" module
app.use(require("./routes/record"));

// Import the function to connect to the MongoDB database
const dbo = require("./db/conn");

// Start the Express app and listen on the specified port
app.listen(port, () => {
  
  // Perform a database connection when the server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });

  // Log a message indicating that the server is running
  console.log(`Server is running on port: ${port}`);
});
