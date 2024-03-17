const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

  const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String,
  profile: {
    firstName: String,
    lastName: String,
    address: String
  },
  history: []
})

userSchema.plugin(passportLocalMongoose);

const user =  new mongoose.model('User', userSchema);

module.exports = user;