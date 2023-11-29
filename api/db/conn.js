const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectToDatabase;


// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (err) {
//         // Call the callback with the error if there's an issue with the connection
//         console.log("Error connecting to MongoDB", err)
//         return callback(err);
//       }

//       _db = db.db("employees");
//       console.log("Successfully connected to MongoDB.");

//       // Call the callback once the connection is successful
//       return callback(null);
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };

// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try{
//     await mongoose.connect('mongodb://localhost:27017/apartmentAmigosDatabase');
//     console.log('Connected to MongoDB');
//   }
//   catch(error) {
//     console.log('Error -', error);
//   }
// }
// module.exports = connectDB
