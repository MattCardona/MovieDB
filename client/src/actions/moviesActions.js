import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR } from './types';
import Axios from 'axios';

export const nowPlaying = () => async dispatch => {
  try {
    const { data } = await Axios.get("/homepage")
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
    const { data } = await Axios.get("/popular");
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
    const { data } = await Axios.get("/toprated");
    dispatch({
      type: TOP_RATED,
      movies: data
    })
  } catch (error) {
    console.log(error);
  }
}

export const searchedMovie = movie => dispatch => {
  Axios.get(`/movies/${movie}`)
    .then(({ data }) => {
      dispatch({
        type: SEARCHED_MOVIE,
        movie: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}

export const searchMovie = (searchMovie, cb) => dispatch => {
  Axios.post("/movies", { movie: searchMovie })
    .then(({ data }) => {
      // console.log(data, "movies");
      dispatch({
        type: SEARCH_MOVIE,
        searchMovie: data
      })
    })
    .catch(e => {
      dispatch({
        type: SEARCH_MOVIE_ERROR
      })
      cb(e.response.data.error);
    })
}