import Axios from "axios";
import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER, SAVE_MOVIE, GET_USERS_SAVED, DELETE_SAVED_MOVIE, GET_USERS, SAVE_SHOW, DELETE_SAVED_SHOW } from "./types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode'

// if not return user a error
export const signup = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signup", user);
    // need to save token to localstorage 
    localStorage.setItem("token", data.token);
    // create method to set auth header with token on axios calls
    setAuthToken(data.token);
    // get user from token and set the usersId to the redux state with JWT-decode
    let { _id } = decode(data.token);
    // console.log(_id);
    dispatch({
      type: SIGNUP_USER,
      token: data.token,
      userId: _id
    });
    cb();
  } catch (error) {
    // console.log(error.response);
    cb(error.response.data);
  }
}

export const signin = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signin", user);
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    let { _id } = decode(data.token);
    const { data: dataTwo } = await Axios.get("/users/movies");
    // console.log(dataTwo, "User movies auth act");
    dispatch({
      type: SIGNIN_USER,
      token: data.token,
      userId: _id,
      movieIds: dataTwo.movieIds,
      movies: dataTwo.movies,
      shows: dataTwo.shows,
      showIds: dataTwo.showIds
    });
    cb();
  } catch (error) {
    // console.log(error.response.data);
    cb(error.response.data);
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem("token");
  setAuthToken(null);
  dispatch({
    type: SIGNOUT_USER
  });
}

export const getUserInfo = () => async dispatch => {
  try {
    const { data } = await Axios.get("/users");
    // console.log("data", data);
    dispatch({
      type: GET_USERS,
      userId: data._id,
      movieIds: data.movieIds,
      movies: data.movies,
      shows: data.shows,
      showIds: data.showIds
    })
    return data.username;
  } catch (error) {
    // console.log(error.response);
    // need to do something here if error from backend
    return undefined;
  }
}

export const saveUserLikedMovie = movie => async (dispatch, getState) => {
  // console.log("movie trying to save", movie);
  try {
    const { data } = await Axios.post("/users/movies", { movie });
    let { movieIds } = getState().auth;
    let updatedMovies = [...movieIds, data.savedMovieId];

    dispatch({
      type: SAVE_MOVIE,
      updatedMovies,
      movies: data.movies
    })
    return data;

  } catch (error) {
    console.log("error", error.response.data);
  }
}
export const saveUserLikedShow = show => async (dispatch, getState) => {
  // console.log("show trying to save", show);
  try {
    const { data } = await Axios.post("/users/shows", { show });
    let { showIds } = getState().auth;
    let updatedShows = [...showIds, data.savedShowId];

    dispatch({
      type: SAVE_SHOW,
      updatedShows,
      shows: data.shows
    })
    return data;

  } catch (error) {
    console.log("error", error.response.data);
  }
}



export const getUsersSavedMovies = () => async dispatch => {
  try {
    const { data } = await Axios.get("/users/movies");
    // console.log(data);
    dispatch({
      type: GET_USERS_SAVED,
      movies: data.movies,
      shows: data.shows
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteUsersSavedMovie = id => async (dispatch, getState) => {
  try {
    const { data } = await Axios.delete(`/users/movies/${id}`);
    let { movies } = data;
    let removedMovieId = data.removedMovie.movieId;
    let { movieIds } = getState().auth;
    let indexOfRemovedMovie = movieIds.indexOf(removedMovieId);
    let updatedMovies = [...movieIds.slice(0, indexOfRemovedMovie), ...movieIds.slice(indexOfRemovedMovie + 1)];
    dispatch({
      type: DELETE_SAVED_MOVIE,
      updatedMovies,
      movies
    });

  } catch (error) {
    console.log(error);
  }
}
export const deleteUsersSavedShow = id => async (dispatch, getState) => {
  try {
    const { data } = await Axios.delete(`/users/shows/${id}`);
    let { shows, removedShow } = data;
    let removedShowId = removedShow.showId;
    let { showIds } = getState().auth;
    let indexOfRemovedShow = showIds.indexOf(removedShowId);
    let updatedShows = [...showIds.slice(0, indexOfRemovedShow), ...showIds.slice(indexOfRemovedShow + 1)];
    dispatch({
      type: DELETE_SAVED_SHOW,
      updatedShows,
      shows
    });

  } catch (error) {
    console.log(error);
  }
}