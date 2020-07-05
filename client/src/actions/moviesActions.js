import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR, SEARCHED_MOVIE_NAV, APPEND_NOW_PLAYING, APPEND_SEARCH_MOVIE, SEARCHED_SHOW, FILTER_BY_POPULARITY } from './types';
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
    const { data } = await Axios.get("/movies/toprated/?page=1");
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
    const { data } = await Axios.post("/movies/search/?page=1", { movie: searchMovie });
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

export const appendMovies = (kind, page = 1, searchMovie, cb) => async dispatch => {
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
      case "searchMovie":
        // console.log("In search movie");
        {
          const { data } = await Axios.post(`/movies/search/?page=${page}`, { movie: searchMovie });
          dispatch({
            type: APPEND_SEARCH_MOVIE,
            searchMovie: data
          });
        }
        break;
      default:
        break;
    }

  } catch (error) {
    cb();
    // console.log(error.response);
  }
}

export const searchShow = id => async dispatch => {
  try {
    const { data } = await Axios.get(`/movies/show/${id}`);
    // console.log(data);
    await dispatch({
      type: SEARCHED_SHOW,
      show: data
    });
  } catch (error) {
    console.log(error);
  }
}

export const moreInfo = id => async () => {
  try {
    const { data } = await Axios.get(`/movies/videos/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
}

export const moreTVInfo = id => async () => {
  try {
    const { data } = await Axios.get(`/movies/tv/videos/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
}


export const filterByPopularity = () => ({ type: FILTER_BY_POPULARITY });