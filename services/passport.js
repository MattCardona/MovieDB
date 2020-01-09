const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../models/Users");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRETKEY
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  Users.findById(payload._id)
    .then(user => {
      if (!user) return done(null, false);
      else {
        return done(null, user);
      }
    })
    .catch(e => done(e, false));
});

passport.use(jwtLogin);