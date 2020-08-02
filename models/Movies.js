const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
	title: String
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;