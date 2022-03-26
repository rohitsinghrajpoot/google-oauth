const User = require("../models/user.model")

const jwt = require("jsonwebtoken")
require('dotenv').config()
const generateToken = (user)=>{
    return jwt.sign({user}, process.env.secret_key)
}



const register = async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email})

        if(user){
            return res.status(400).send({message:"email already exist"})
        }
        user = await User.create(req.body)

        const token = generateToken(user)

        return res.status(200).send({user,token})
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
}

const login = async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).send({message:"wrong email or password"})
        }

        const match = user.checkPassword(req.body.password)

        if(!match){
            return res.status(400).send({message:"wrong email or password"})
        }
    
        const token = generateToken(user)
        res.status(200).send(user)
    }catch(err){
        return res.status(500).send({msg:err.msg})
    }
}

module.exports = {register,login,generateToken}