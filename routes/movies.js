const express = require("express");
const axios = require("axios");
const router = express.Router();

// will show movies now playing
router.get("/homepage", (req, res) => {
  const { page } = req.query;
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB}&language=en-US&page=${page}`)
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
  const { page } = req.query;
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB}&language=en-US&page=${page}`)
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
  const { page } = req.query;
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_DB}&language=en-US&page=${page}`)
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
  const { page } = req.query;
  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_DB}&language=en-US&page=${page}&include_adult=true&query=${movie}`)
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

// will get more info on specific movie
router.get("/:id", (req, res) => {
  const { id } = req.params;

  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB}&language=en-US&external_source=imdb_id&append_to_response=watch/providers`)
    .then(res => res.data)
    .then(data => {
      let usProviders = data["watch/providers"].results["US"];
      return res.status(200).json({ ...data, "watch/providers": usProviders })
    })
    .catch(e => {
      // console.log(e);
      res.status(404).redirect("/");
    });

});

// will get more info on specific tv show
router.get("/show/:id", (req, res) => {
  const { id } = req.params;

  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.MOVIE_DB}&language=en-US&external_source=imdb_id`)
    .then(res => res.data)
    .then(data => res.status(200).json(data))
    .catch(e => {
      // console.log(e);
      res.status(404).redirect("/");
    });

});

// get videos recomendations, similar
router.get("/videos/:id", (req, res) => {
  const { id } = req.params;
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB}&language=en-US&external_source=imdb_id&append_to_response=videos,recommendations,similar`)
    .then(res => res.data)
    .then(data => res.status(200).json(data))
    .catch(e => {
      // console.log(e);
      res.status(404).redirect("/");
    });

});

router.get("/tv/videos/:id", (req, res) => {
  const { id } = req.params;

  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.MOVIE_DB}&append_to_response=videos,recommendations,similar`)
    .then(res => res.data)
    .then(data => res.status(200).json(data))
    .catch(e => {
      // console.log(e);
      res.status(404).redirect("/");
    });

})

module.exports = router;