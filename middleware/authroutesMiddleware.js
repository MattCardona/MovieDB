const Users = require("../models/Users");
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Must provide username and password" });

  Users.findOne({ username })
    .then(found => {
      if (found) return res.status(400).json({ error: "Username is already taken" });

      const user = new Users({ username });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ error: err });
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) return res.status(400).json({ error: err });
          user.password = hashedPassword;
          user.save()
            .then(newUser => {
              // here need to make a token to send back after user is created in the db
              res.status(200).json({ newUser });
            })
            .catch(err => res.status(400).json({ error: err }));
        })
      })
    })
    .catch(e => res.status(400).json({ error: e }));
}

const signin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Must provide username and password" });

  Users.findOne({ username })
    .then(found => {
      if (!found) return res.status(400).json({ error: "No one exists with that username" });
      bcrypt.compare(password, found.password, (err, response) => {
        if (err || !response) return res.status(400).json({ error: "Password is incorrect" });
        // need to return user a token on successful login
        return res.status(200).json({ msg: "Successfull signin" })
      })
    })
    .catch(e => res.status(400).json({ error: e }));
}

module.exports = { signup, signin };