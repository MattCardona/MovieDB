import Axios from "axios";
import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER } from "./types";
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
    dispatch({
      type: SIGNIN_USER,
      token: data.token,
      userId: _id
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