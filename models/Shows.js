const mongoose = require("mongoose");

const showsSchema = new mongoose.Schema({
  name: String,
  posterPath: String,
  backdropPath: String,
  showId: String,
  voteAverage: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Shows = mongoose.model("Shows", showsSchema);

module.exports = Shows;