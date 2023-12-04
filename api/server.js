// Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./configure.env" });
const connectToDatabase = require('./db/conn');

// Set up the port, default to 5000 if not provided in the environment
const port = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for the app
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Include the routes defined in the "record" module
app.use(require("./routes/record"));

// Include the authentication Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api",authRoutes);

//Including controllers:
app.use(require("./controllers/toDoListController"));
app.use(require("./controllers/householdController"));
app.use(require("./controllers/ChoreController"));

connectToDatabase().catch((error) => process.exit(1));

// Start the Express app and listen on the specified port
app.listen(port, () => {
  // Log a message indicating that the server is running
  console.log(`Server is running on port: ${port}`);
});
