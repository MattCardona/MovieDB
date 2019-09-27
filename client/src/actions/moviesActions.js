import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE } from './types';
import Axios from 'axios';

export const nowPlaying = () => dispatch => {
  Axios.get("/homepage")
    .then(({ data }) => {
      dispatch({
        type: NOW_PLAYING,
        movies: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}

export const popular = () => dispatch => {
  Axios.get("/popular")
    .then(({ data }) => {
      dispatch({
        type: POPULAR,
        movies: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}

export const topRated = () => dispatch => {
  Axios.get("/toprated")
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: TOP_RATED,
        movies: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}

export const searchedMovie = (movie) => dispatch => {
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