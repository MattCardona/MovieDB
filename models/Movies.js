const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
	title: String,
	posterPath: String,
	backdropPath: String,
	movieId: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;