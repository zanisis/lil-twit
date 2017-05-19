const User = require('../models/user');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})

let controllers = {}

//get user
controllers.checkToken = (req,res)=>{
  console.log(req.headers.token);
  let decode = jwt.verify(req.headers.token, process.env.SECRET);
  console.log(decode);
  res.send(decode)
}

//sign up
controllers.signUp = (req,res)=>{
  let newUser = new User({
    username : req.body.username,
    password : passwordHash.generate(req.body.password),
    email : req.body.email
  })

  newUser.save((err,data)=>{
    res.send({status : 'Success Register'})
  })
}

//sign in
controllers.signIn = (req,res)=>{
    console.log('from passport',req.user);
    console.log(process.env.SECRET);
    var token = jwt.sign({ _id: req.user._id ,username: req.user.username }, process.env.SECRET, { expiresIn: '1d'});
    res.send({token : token, username : req.user.username })
}

module.exports = controllers;