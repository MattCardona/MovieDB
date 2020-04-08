import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR, SEARCHED_MOVIE_NAV, APPEND_NOW_PLAYING } from './types';
import Axios from 'axios';

export const nowPlaying = () => async dispatch => {
  try {
    const { data } = await Axios.get("/movies/homepage/?page=1");
    dispatch({
      type: NOW_PLAYING,
      movies: data
    })
  } catch (error) {
    console.log(error);
  }
}

export const popular = () => async dispatch => {
  try {
    const { data } = await Axios.get("/movies/popular/?page=1");
    dispatch({
      type: POPULAR,
      movies: data
    })
  } catch (error) {
    console.log(error);
  }
}

export const topRated = () => async dispatch => {
  try {
    const { data } = await Axios.get("/movies/toprated");
    dispatch({
      type: TOP_RATED,
      movies: data
    })
  } catch (error) {
    console.log(error);
  }
}


export const searchMovie = (searchMovie, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/movies/search", { movie: searchMovie });
    dispatch({
      type: SEARCH_MOVIE,
      searchMovie: data
    });
  } catch (e) {
    dispatch({
      type: SEARCH_MOVIE_ERROR
    })
    cb(e.response.data.error);
  }
}

export const searchedMovie = movie => async dispatch => {
  try {
    const { data } = await Axios.get(`/movies/${movie}`);
    dispatch({
      type: SEARCHED_MOVIE,
      movie: data
    })
  } catch (error) {
    console.log(error);
  }
}

export const searchedMovieNav = () => ({ type: SEARCHED_MOVIE_NAV });

export const appendMovies = (kind, page = 1, cb) => async dispatch => {
  try {
    switch (kind) {
      case "nowPlaying":
        // console.log("in nowplaying switch");
        {
          const { data } = await Axios.get(`/movies/homepage/?page=${page}`);
          dispatch({
            type: APPEND_NOW_PLAYING,
            movies: data
          });
        }
        break;
      case "popular":
        // console.log("in popular switch", `page ${page}`);
        {
          const { data } = await Axios.get(`/movies/popular/?page=${page}`);
          dispatch({
            type: APPEND_NOW_PLAYING,
            movies: data
          });
        }
        break;
      case "topRated":
        // console.log("in toprated");
        {
          const { data } = await Axios.get(`/movies/toprated/?page=${page}`);
          dispatch({
            type: APPEND_NOW_PLAYING,
            movies: data
          });
        }
        break;
    }

  } catch (error) {
    console.log(error);
  }
}