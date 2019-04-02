require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


let port = process.env.PORT || process.env.DEV_PORT;

app.use(bodyParser.urlencoded({extended: false}));

// will show movies now playing
app.get("/homepage", (req, res) => {
  res.send("This will be the home route");
});

// will search for a specific movie/show title
app.post("/movies", (req, res) => {
  res.send("This will send back movie searched for");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});