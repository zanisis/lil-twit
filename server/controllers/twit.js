const Twits = require('../models/twit');
const Tag = require('../models/hashtag');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})
const ObjectId = require('mongoose').Types.ObjectId;



let controllers = {}

//getTwitt
controllers.getTwitt = (req,res)=>{
  Twits.find()
  .sort({created_at: -1})
  .populate("user")
  .exec( (err, twits) => {
    if(err) res.send(err);
    res.send(twits)
  })
}

//postTwitt
controllers.postTwitt = (req,res)=>{
  let token = jwt.verify(req.headers.token, process.env.SECRET);
  if(token){
    console.log('token', token);

    let newTwit = new Twits({
        text : req.body.text,
        user : token._id,
        tags : []
    })

     var pattern = /(#\w+)/gi;
     var matches = newTwit.text.match(pattern);

     var final_matches = matches.map( m => m.replace(/#/, ''))

     final_matches.map( m => newTwit.tags.push(m) )
     console.log('show newTwit',newTwit);
     let getTag = newTwit.tags
    //  console.log(getTag);

     getTag.map((data)=>{
       Tag.findOne({tag : data}, (err, getIn)=>{
        //  console.log(getIn);
         if(!getIn){
           let newTag = new Tag({
             tag : data,
             twit :[newTwit._id]
           })

           newTag.save((err, done)=>{
             console.log('new tag create',done);
           })
         } else {
           console.log('kesini',getIn);
           getIn.count += 1
           getIn.twit.push(newTwit._id)

           getIn.save((err, done)=>{
             console.log('else', done);
           })
         }
       })
     })

     newTwit.save( (err, twit) => {
      if(err) res.send(err.message)
      res.send(twit)
    })
  }
}

//deleteTwitt
controllers.deleteTwitt = (req,res)=>{
  let token = jwt.verify(req.headers.token, process.env.SECRET);
  console.log('token', token);
  if(token){
    Twits.findByIdAndRemove(req.params.id, (err, twit) => {
     if(err) res.send(err)
     else {
       res.send({status : 'Delete Successfully'})
     }
   })
  }
}

module.exports = controllers;