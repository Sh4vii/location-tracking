const express = require('express');
const router = express.Router();

router.post("/", async(req, res)=>{
  const locationData = req.body;
  try{
        res.render("locations", {locationHistory: locationData});
  }catch(err){
    console.log(err);
  }
})

module.exports = router;