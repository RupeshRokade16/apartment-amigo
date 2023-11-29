const User = require('../models/userModel');

async function loginUser(username,password) {
    const user = await User.findOne({username, password});
    return user
}


async function registerUser(username, email, password){
    const newUser = new User({username, email, password});
    await newUser.save();
    return newUser;
}


module.exports = {loginUser, registerUser};