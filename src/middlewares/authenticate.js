require('dotenv').config()
const jwt = require("jsonwebtoken")

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
         jwt.verify(token, process.env.secret_key,(err,decoded)=>{
        if(err) return reject(err)

        return resolve(decoded)
    })
    })
    
}


const authenticate = async (req,res,next)=>{
    if(!req.headers.authorization)
    res.status(400).send({msg:"Authorization token not found or incorrect"})

    if(!req.headers.authorization.startsWith("Bearer "))
    res.status(400).send({msg:"Authorization token not found or incorrect"})

    const token = req.headers.authorization.trim().split(" ")[1]
    let decoded;
    try{
        decoded = await verifyToken(token)
    }catch(err){
        return res.status(500).send({msg:"Authorization token not found or incorrect"})
    }
    
   req.user = decoded.user
  return next()
}

module.exports = authenticate