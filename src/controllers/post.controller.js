const express = require("express")

const Post = require("../models/post.model")
const authenticate = require("../middlewares/authenticate")
const authorise = require("../middlewares/authorise")
const router = express.Router()

router.post("",authenticate,async (req,res)=>{

    req.body.userid = req.user._id

    try{
      const post = await Post.create(req.body)
      return res.status(201).send(post)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.patch("/:id",authenticate,authorise(["admin","seller"]),async (req,res)=>{
  try{
    const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).send(post)
  }catch(err){
      return res.status(400).send({message:err.message})
  }
})

module.exports = router