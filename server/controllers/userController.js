const bcrypt  = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { findUserByEmail, createUser} = require("../Services/userService.js")


const createToken = (id) => {

    return jwt.sign({id},process.env.SECRET,{expiresIn:"2d"})
}

const loginUser = async (req,res) => {

    res.json({msg:"login user"})

}

const signupUser = async (req,res) => {

    try {

    const {email,password} = req.body

    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email must be valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password must be strong")
    }

    const exists = await findUserByEmail(email)     
    if(exists){
       throw Error("Email already in use") 
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    
    const user = await createUser(email,hashedPassword)

    // Creating a token
    
    token = createToken(user.id)
    res.status(200).json({email: user.email,token })
    } catch (error) {
      res.status(400).json({error:error.message})
    }
    

}

module.exports = {

    loginUser,
    signupUser
}
