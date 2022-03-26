const express = require("express")

const userController= require("./controllers/user.controller")
const {register,login,generateToken}= require("./controllers/auth.controller")
const postController = require("./controllers/post.controller")
const passport = require("./configs/google_oauth")

const app = express()

app.use(express.json())

app.use("/users",userController)
app.post("/register",register)
app.post("/login",login)
app.use("/posts",postController)

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token = generateToken(req.user)
    res.status(200).send({useer:req.user,token})
  });

module.exports = app