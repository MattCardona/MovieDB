import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR, SEARCHED_MOVIE_NAV } from './types';
import Axios from 'axios';

export const nowPlaying = () => async dispatch => {
  try {
    const { data } = await Axios.get("/movies/homepage")
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
    const { data } = await Axios.get("/movies/popular");
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