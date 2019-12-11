const express = require("express");
const axios = require("axios");
const router = express.Router();

// will show movies now playing
router.get("/homepage", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      let { results } = data;
      // console.log(data.results);
      res.status(200).json(results);
    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      res.status(404).json({ msg: "There is nothing to show at this moment" });
    });

});

// will show popular movies
router.get("/popular", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      let { results } = data;
      // console.log(data.results);
      res.status(200).json(results);
    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      res.status(404).json({ msg: "There is nothing to show at this moment" });
    });

});

// will show top rated movies
router.get("/toprated", (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_DB}&language=en-US&page=1`)
    .then(res => {
      return res.data;
    })
    .then(data => {
      let { results } = data;
      // console.log(data.results);
      res.status(200).json(results);
    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      res.status(404).json({ msg: "There is nothing to show at this moment" });
    });

});


// will search for a specific movie/show title
router.post("/search", (req, res) => {
  const { movie } = req.body;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB}&language=en-US&page=1&include_adult=true&query=${movie}`)
    .then(res => res.data)
    .then(data => {
      let { results } = data;
      // console.log(data);
      if (results.length > 0) {
        return res.status(200).json(results);
      } else {
        return res.status(404).json({ error: "No movie/tv show found" });
      }

    })
    .catch(e => {
      // console.log(JSON.stringify(e, undefined, 2));
      return res.status(404).json({ error: "No movie/tv show found" });
    });
});

// will get more info on specific movie/show
router.get("/:id", (req, res) => {
  const { id } = req.params;

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB}&language=en-US&external_source=imdb_id`)
    .then(res => res.data)
    .then(data => res.status(200).json(data))
    .catch(e => {
      // console.log(e);
      res.status(404).redirect("/");
    });

});

module.exports = router;