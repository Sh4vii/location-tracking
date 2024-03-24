const express = require('express');
const router = express.Router();

const upload = require('../middleware/Multer-config');

const User = require('../models/UsersDB');

router.get("/", async(req, res)=>{
  const userId = req.user.id;
  const user = await User.findOne({_id: userId});
  
  const userProfile = {...user.profile, email: user.username}
  
  
  try{
        res.render("profile", {userProfile: userProfile});
  }catch(err){
    console.log(err);
  }
})

router.post("/", async(req, res)=>{
  const userId = req.user.id;
  const profileData = req.body;
  
  const user = await User.findOne({_id: userId});
  
  const userProfile = {
    firstName: profileData.firstname,
    lastName: profileData.lastname,
    address: profileData.homeaddress
  }
  try{
    user.profile = userProfile;
    user.save();
    res.redirect("/profile");
  }catch(err){
    console.log(err);
  }
})

router.post('/dp', upload.single('image'), async(req, res) => {
  
  const userId = req.user.id;
  
  const user = await User.findOne({_id: userId});
  const profilePicture = req.file.filename;
  
  try{
     // Access uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  user.profilePicture = profilePicture;
  console.log(user);
  user.save();
  res.send('File uploaded successfully.');
   }catch(err){
     console.log(err);
   }
}
);
router.get('/dp', async(req, res)=>{
  const userId = req.user.id;
  
  const user = await User.findOne({_id: userId});
  const profilePicture = {profilePicture: user.profilePicture};
  
  try{
    res.json(profilePicture);
  }catch(err){
    console.log(err);
  }
})

module.exports = router;