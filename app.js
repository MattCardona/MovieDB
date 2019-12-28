require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const { signup, signin } = require("./middleware/authroutesMiddleware");
const movies = require("./routes/movies");
const actors = require("./routes/actors");

let port = process.env.PORT || process.env.DEV_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/movies", movies);
app.use("/actors", actors);

app.post("/signup", signup, (req, res) => {
  res.json({ msg: "hello" })
})

app.post("/signin", signin, (req, res) => {
  res.json({ msg: "This is the signin page" })
})

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set my static folder
  app.use(express.static("client/build"));
  // anything besides the api routes load
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});