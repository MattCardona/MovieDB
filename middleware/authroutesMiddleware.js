const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = ({ _id, username }) => {
  const token = jwt.sign({ _id, username }, process.env.SECRETKEY, { expiresIn: "1 day" });
  return token;
};

const signup = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Must provide username and password" });

  if (username.length < 4 || username.length > 15) return res.status(400).json({ username: "Username must be 4 characters long and no longer than 15 characters" });

  if (password.length < 4) return res.status(400).json({ password: "Password must be 4 characters or longer " });

  Users.findOne({ username })
    .then(found => {
      if (found) return res.status(400).json({ username: "Username is already taken" });

      const user = new Users({ username });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({ error: err });
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) return res.status(400).json({ error: err });
          user.password = hashedPassword;
          user.save()
            .then(newUser => {
              const token = createToken(newUser);
              res.status(200).json({ token });
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
      if (!found) return res.status(400).json({ username: "No one exists with that username" });
      bcrypt.compare(password, found.password, (err, response) => {
        if (err || !response) return res.status(400).json({ password: "Password is incorrect" });
        const token = createToken(found);
        return res.status(200).json({ token })
      })
    })
    .catch(e => res.status(400).json({ error: e }));
}

module.exports = { signup, signin };