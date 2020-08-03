const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Users = require("../models/Users");
const Movies = require("../models/Movies");

router.get("/", requireAuth, (req, res) => {
  const { _id } = req.user;

  Users.findById(_id)
    .populate("movies")
    .exec()
    .then(foundUser => {
      if (!foundUser) {
        // some type of error users was not found
        res.status(400).json({ "error": "Something went wrong" });
      }
      const { username, movies } = foundUser;
      const user = { username, movies };
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(400).json(error);
    })
});



module.exports = router;