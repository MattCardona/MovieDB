const Users = require("../models/Users");
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Must provide username and password" });

  Users.findOne({ username })
    .then(found => {
      if (found) return res.status(400).json({ error: "Username is already taken" });
      new Users({ username, password }).save()
        .then(newUser => {
          return res.status(200).json({ msg: newUser });
        })
        .catch(e => res.status(400).json({ error: "Could not save new user" }));
    })
    .catch(e => res.status(400).json({ error: e }));
}

const signin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Must provide username and password" });

  Users.findOne({ username })
    .then(found => {
      if (!found) return res.status(400).json({ error: "No one exists with that username" });
      if (found.password !== password) return res.status(400).json({ error: "Password is incorrect" });
      return res.status(200).json({ msg: "Successfull signin" })
    })
    .catch(e => res.status(400).json({ error: e }));
}

module.exports = { signup, signin };