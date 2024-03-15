const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

  const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String
  },
  history: []
})

userSchema.plugin(passportLocalMongoose);

const user =  new mongoose.model('User', userSchema);

module.exports = user;