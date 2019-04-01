const express = require("express");
const app = express();
const bodyParser = require("body-parser");


let port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));

// will show movies now playing
app.get("/homepage", (req, res) => {
  res.send("This will be the home route");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});