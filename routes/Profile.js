const express = require('express');
const router = express.Router();

router.get("/", async(req, res)=>{
  const userId = req.user.id;
 console.log("flag", userId);
  try{
        res.render("profile");
  }catch(err){
    console.log(err);
  }
})

module.exports = router;