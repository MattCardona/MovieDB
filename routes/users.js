const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportServices = require("../services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const Users = require("../models/Users");

router.get("/", requireAuth, (req, res) => {
  res.status(200).json({ "sucess": "working on the user routes" });
});

module.exports = router;