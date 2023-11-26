const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});



// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require('mongoose');


// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;


// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));


// // Get MongoDB driver connection
// mongoose.connect(process.env.ATLAS_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// }).then(() => console.log("DB Connected"))
// .catch((err) => console.log("DB Connection error", err));

// // const dbo = require("./db/conn");
// //username : rupeshrokade19
// // pass : OQHrpWuRX5tvfsGP

// app.listen(port, () => {
//   // Perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });