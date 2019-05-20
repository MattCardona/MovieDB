require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

let port = process.env.PORT || process.env.DEV_PORT;

app.use(bodyParser.urlencoded({extended: false}));

// app.get("/", (req, res) => res.redirect("/homepage"))

// will show movies now playing
app.get("/homepage", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
  .then(res => {
    return res.data;
  })
  .then(data => {
    let {results} = data;
    // console.log(data.results);
    res.status(200).json(results);
  })
  .catch(e => {
    // console.log(JSON.stringify(e, undefined, 2));
    res.status(503).json({msg: "There is nothing to show at this moment"});
  });
  
});

// will search for a specific movie/show title
app.post("/movies", (req, res) => {
  const { movie } = req.body;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB}&language=en-US&page=1&include_adult=true&query=${movie}`)
  .then( res => res.data)
  .then(data => {
    let { results } = data;
    // console.log(data);
    if(results.length > 0){
      return res.status(200).json(results);
    }else{
      return res.status(400).json({error: "No movie/tv show found"});
    }
    
  })
  .catch(e => {
    // console.log(JSON.stringify(e, undefined, 2));
    return res.status(400).json({error: "No movie/tv show found"});
  });
});

// will get more info on specific movie/show
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB}&language=en-US&external_source=imdb_id`)
  .then(res => res.data)
  .then(data => res.status(200).json(data))
  .catch(e => {
    // console.log(e);
    res.status(404).redirect("/");
  });

});

// serve static assets in production
if(process.env.NODE_ENV === "production"){
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