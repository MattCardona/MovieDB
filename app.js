require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");


let port = process.env.PORT || process.env.DEV_PORT;

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => res.redirect("/homepage"))

// will show movies now playing
app.get("/homepage", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
  .then(res => {
    return res.data;
  })
  .then(data => {
    res.json(data);
  })
  .catch(e => {
    console.log(JSON.stringify(e, undefined, 2));
    res.send('Oops something went wrong');
  })
  
});

// will search for a specific movie/show title
app.post("/movies", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB}&language=en-US&page=1&include_adult=true&query=${req.body.movie}`)
  .then( res => res.data)
  .then(data => res.json(data))
  .catch(e => {
    console.log(JSON.stringify(e, undefined, 2));
    res.send('Oops something went wrong');
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});