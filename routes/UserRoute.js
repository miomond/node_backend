const UserController=require("../controllers/UserController");


const route=require("express").Router()
const bcrypt=require("bcrypt");



route.post("/register",async(req,res)=>{   
    let { username, email,password } = req.body
    if (password.length <= 6) {
     return res.status(400).json({ message: "Password less than 6 characters" })
    }
    else{
        bcrypt.hash(password, 10, async function (err, hash) {
            let data = await UserController.register(username, email, hash)
            console.log(data);
            return res.status(200).json({ message: "done" })
        });
    }
})



exports.login = async (req, res, next) => {
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


module.exports = route;
