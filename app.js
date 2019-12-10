require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const movies = require("./routes/movies");

let port = process.env.PORT || process.env.DEV_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/movies", movies);
// app.get("/", (req, res) => res.redirect("/homepage"))

// ============================
// actor / actresses routes
// ============================

// search for actor/actress
app.post("/search/person", (req, res) => {
  const { actor } = req.body;
  let encoded = encodeURIComponent(actor);
  axios.get(`https://api.themoviedb.org/3/search/person?api_key=${process.env.MOVIE_DB}&language=en-US&page=1&include_adult=false&query=${encoded}`)
    .then(res => res.data)
    .then(data => {
      let { results } = data;
      // console.log(data, "********");
      if (results.length > 0) {
        return res.status(200).json(results);
      } else {
        return res.status(400).json({ error: "No actor/actress found with that name" });
      }

    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      return res.status(404).json({ error: "No actor/actress found with that name" });
    });
});

// get popular actor/actresses as of now
app.get("/popularactors", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
    .then(res => res.data)
    .then(data => {
      let { results } = data;

      if (results.length > 0) {
        return res.status(200).json(results);
      } else {
        return res.status(400).json({ error: "No person found" });
      }
    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      return res.status(404).json({ error: "No person found" });
    });
});

// get specific actor/actress
app.get("/actor/:id", (req, res) => {
  let person_id = req.params.id;
  axios.get(`https://api.themoviedb.org/3/person/${person_id}?api_key=${process.env.MOVIE_DB}&language=en-US&append_to_response=combined_credits,images`)
    .then(res => res.data)
    .then(data => {
      // console.log(JSON.stringify(data, undefined, 2));
      return res.status(200).json(data);
    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      return res.status(404).json({ error: "No person found" });
    });
});


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