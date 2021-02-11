const mongoose = require("mongoose");

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
    minlength: 4
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies"
  }],
  shows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shows"
  }]
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;