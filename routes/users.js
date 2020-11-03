const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Users = require("../models/Users");
const Movies = require("../models/Movies");

router.get("/", requireAuth, (req, res) => {
  const { _id } = req.user;

  Users.findById(_id).populate("movies").exec()
    .then(foundUser => {
      if (!foundUser) {
        // some type of error users was not found
        res.status(400).json({ "error": "Something went wrong" });
      }

      const { username, movies } = foundUser;
      const movieIds = movies.map(movie => movie.movieId);
      const user = { username, movies, movieIds, _id };
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(400).json(error);
    })
});

// here we can movies and tv shows ids for later use cases
router.get("/movies", requireAuth, (req, res) => {
  const { _id } = req.user;

  Users.findById(_id).populate("movies").exec()
    .then(user => {
      if (!user) {
        // some type of error users was not found
        return res.status(400).json({ "error": "Something went wrong" });
      }
      const moviesIds = user.movies.map(movie => movie.movieId);
      return res.status(200).json({ movies: moviesIds });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.post("/movies", requireAuth, (req, res) => {
  const { movie } = req.body;
  const { _id } = req.user
  // console.log({ movie, _id });
  Users.findById(_id)
    .then(foundUser => {
      if (!foundUser) return res.status(400).json({ "error": "Something went wrong" });
      new Movies(movie).save()
        .then(newmovie => {
          foundUser.movies.push(newmovie);
          foundUser.save()
            .then(updatedUser => {
              return res.status(200).json({
                "success": "Saved liked movie",
                savedMovieId: newmovie.movieId
              });
            })
            .catch(error => res.status(400).json({ "error": "Can not save movie at this time." }))
        })
        .catch(error => res.status(400).json({ "error": "Can not save movie at this time" }))
    })
    .catch(error => res.status(400).json({ "error": "Something went wrong" }));
});

router.delete("/movies/:id", requireAuth, (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  Users.findById(_id)
    .then(foundUser => {
      if (!foundUser) return res.status(400).json({ "error": "User was not found" });

      Movies.findByIdAndDelete(id)
        .then(removedMovie => {
          if (!removedMovie) return res.status(400).json({ "error": "Movie was not found" });

          return res.status(200).json({ "msg": "Success", removedMovie });
        })
        .catch(e => res.status(400).json({ "error": e }));

    })
    .catch(e => res.status(400).json({ "error": e }));

})


module.exports = router;