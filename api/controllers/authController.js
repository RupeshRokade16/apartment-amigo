const authService = require('../services/authService');

async function login(req,res) {
    const {username, password} = req.body;

    try{
        const user = await authService.loginUser(username, password);

        if(user){
            res.status(200).json({message: "Login successful", user});
        } else{
            res.status(401).json({message: "Invalid username or password"});
        }
    }
    catch (error){
        console.log(error)
        res.status(500).json({message: "Encountered server error"});
    }

}


async function register(req,res) {
    const {username, email, password} = req.body;

    try{
        const newUser = await authService.registerUser(username,email,password);
        res.status(201).json({message:"Registration successful", user: newUser})
    } catch(error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message :"Validation Error", errors: error.errors})
        } else {
            console.error(error);
            res.status(500).json({message :"Encountered server error"});
        }
    } 


}


module.exports= {login, register};