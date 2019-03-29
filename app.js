const express = require("express");
const app = express();

let port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This will be the home route");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});