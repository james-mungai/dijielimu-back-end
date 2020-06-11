const jwt = require('jsonwebtoken')
const User = require('../models/users')
const auth = async (req, res,next)=>{
    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = await jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY)
        
        const user =await User.findOne({_id:decoded._id})
       
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
       next()
    } catch (error) {
        console.log(error);
        
        res.status(401).send('authorisation error')
        
    }
    
    
}

module.exports = auth