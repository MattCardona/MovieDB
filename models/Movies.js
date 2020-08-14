const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
	title: String,
	posterPath: String,
	backdropPath: String,
	movieId: String
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;