const express = require('express');
const router = express.Router();

const User = require('../models/UsersDB');

router.get("/", async(req, res)=>{
  const userId = req.user.id;
  const user = await User.findOne({_id: userId});
  
  const locations = user.history;
 locations.sort((a, b) => b.date - a.date);
 
 console.log(locations);
 
  try{
        res.render("history", {locationHistory: locations});
  }catch(err){
    console.log(err);
  }
})

module.exports = router;