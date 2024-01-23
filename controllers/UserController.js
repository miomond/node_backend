const User = require("../models/User");// required module user
const bcrypt = require("bcrypt"); // required module bcrypt for password hashing
const mongoose = require('mongoose');


const register =async(_username,_email,_password)=>{

 let data = await User.create({ userName: _username, email: _email, password: _password });
 console.log(data);
  if (data) {
   console.log("register is done")
 }
 else {
   console.log("please again");
 }
}   


const login = async (req, res, next) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({ message: "Login not succesful" })
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

  module.exports = { register , login};
