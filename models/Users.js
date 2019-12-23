const mongoose = require("mongoose");

// need to add a movies array to ref movies they have saved 
// need to add a movies array to ref movies they have favorited

// need to add a shows array to ref shows they have saved
// need to add a shows array to ref shows they have favorited

// need to add a actor/actresses array to ref actor/actresses they have favorited

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 15,
  }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;