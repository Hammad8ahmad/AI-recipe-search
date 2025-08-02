const jwt = require("jsonwebtoken")
const pool = require("../Model/db")

const requireAuth = async (req,res,next) => {

    // verify authentication

    const { authorization } = req.headers

    if(!authorization){

       return res.status(201).json({error:"Authorization token required"})
    }
    const token = authorization.split(" ")[1]
    
    try {
        const {id} = jwt.verify(token,process.env.SECRET)

        // Optionally, still check if user exists in DB
        const result = await pool.query("SELECT id FROM users WHERE id = $1", [id]);

       if (result.rows.length === 0) {
         return res.status(401).json({ error: "User not found" });
        }

        req.user = result.rows[0].id
        console.log("this is the req.user in require auth file",typeof(req.user))
        next()

        // console.log("this is the user: ", req)
    } catch (error) {
        console.log("this is the error",error)
        res.status(201).json({error:"Request is not authorized"})
    }


}

module.exports = {
    requireAuth
}