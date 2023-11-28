const mongoose = require('mongoose');

//Defining Schema
const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required: true,
    },

    //Other Fields
    household: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Household'
    }



})

//Create the User Model
const User = mongoose.model('User', userSchema);

//Exporting
module.exports = User;