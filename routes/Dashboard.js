const express = require('express');
const router = express.Router();

const User = require('../models/UsersDB');

router.get("/",  async(req, res)=>{
  const userId = req.user.id;
  try{
        res.render("dashboard");
  }catch(err){
    console.log(err);
  }
})
router.post("/", async(req, res)=>{
  const userId = req.user.id;
  const newLocation = req.body;
  
  console.log(userId, newLocation);

const user = await User.findOne({ _id: userId });

user.history.push(newLocation)

user.save();
})

module.exports =  router;