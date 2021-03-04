const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Users = require("../models/Users");
const Movies = require("../models/Movies");
const Shows = require("../models/Shows");

router.get("/", requireAuth, (req, res) => {
  const { _id } = req.user;
  Users.findById(_id).populate("movies").populate("shows").exec()
    .then(foundUser => {
      if (!foundUser) {
        // some type of error users was not found
        res.status(400).json({ "error": "Something went wrong" });
      }

      const { username, movies, shows } = foundUser;
      const movieIds = movies.map(movie => movie.movieId);
      const showIds = shows.map(show => show.showId);
      const user = { username, movies, movieIds, shows, showIds, _id };
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(400).json(error);
    })
});

// here we can movies and tv shows ids for later use cases
router.get("/movies", requireAuth, (req, res) => {
  const { _id } = req.user;

  Users.findById(_id).populate("movies").populate("shows").exec()
    .then(user => {
      if (!user) {
        // some type of error users was not found
        return res.status(400).json({ "error": "Something went wrong" });
      }
      const { movies, shows } = user;
      const movieIds = movies.map(movie => movie.movieId);
      const showIds = shows.map(show => show.showId);
      return res.status(200).json({ movieIds, movies, shows, showIds });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.post("/movies", requireAuth, (req, res) => {
  const { movie } = req.body;
  const { _id } = req.user
  // console.log({ movie, _id });
  Users.findById(_id).populate("movies").exec()
    .then(foundUser => {
      if (!foundUser) return res.status(400).json({ "error": "Something went wrong" });
      new Movies(movie).save()
        .then(newmovie => {
          foundUser.movies.push(newmovie);
          foundUser.save()
            .then(updatedUser => {

              return res.status(200).json({
                "success": "Saved liked movie",
                savedMovieId: newmovie.movieId,
                movies: updatedUser.movies
              });
            })
            .catch(error => res.status(400).json({ "error": "Can not save movie at this time." }))
        })
        .catch(error => res.status(400).json({ "error": "Can not save movie at this time" }))
    })
    .catch(error => res.status(400).json({ "error": "Something went wrong" }));
});

router.post("/shows", requireAuth, (req, res) => {
  const { show } = req.body;
  const { _id } = req.user
  // console.log({ movie, _id });
  Users.findById(_id).populate("shows").exec()
    .then(foundUser => {
      if (!foundUser) return res.status(400).json({ "error": "Something went wrong" });
      new Shows(show).save()
        .then(newShow => {
          foundUser.shows.push(newShow);
          foundUser.save()
            .then(updatedUser => {
              return res.status(200).json({
                "success": "Saved liked show",
                savedShowId: newShow.showId,
                shows: updatedUser.shows
              });
            })
            .catch(error => res.status(400).json({ "error": "Can not save show at this time." }))
        })
        .catch(error => res.status(400).json({ "error": "Can not save show at this time" }))
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

          Users.findById(_id).populate("movies").exec()
            .then(updatedUser => {
              if (!updatedUser) return res.status(400).json({ "error": "User was not found" });
              const { movies } = updatedUser;
              return res.status(200).json({ "msg": "Success", removedMovie, movies });
            })
            .catch(error => {
              res.status(400).json(error);
            })
          // return res.status(200).json({ "msg": "Success", removedMovie, user: foundUser });
        })
        .catch(e => res.status(400).json({ "error": e }));

    })
    .catch(e => res.status(400).json({ "error": e }));

});

router.delete("/shows/:id", requireAuth, (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  Users.findById(_id)
    .then(foundUser => {
      if (!foundUser) return res.status(400).json({ "error": "User was not found" });
      Shows.findByIdAndDelete(id)
        .then(removedShow => {
          if (!removedShow) return res.status(400).json({ "error": "Show was not found" });

          Users.findById(_id).populate("shows").exec()
            .then(updatedUser => {
              if (!updatedUser) return res.status(400).json({ "error": "User was not found" });
              const { shows } = updatedUser;
              return res.status(200).json({ "msg": "Success", removedShow, shows });
            })
            .catch(error => {
              res.status(400).json(error);
            })
          // return res.status(200).json({ "msg": "Success", removedMovie, user: foundUser });
        })
        .catch(e => res.status(400).json({ "error": e }));

    })
    .catch(e => res.status(400).json({ "error": e }));

})


module.exports = router;