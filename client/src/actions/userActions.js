import Axios from "axios";
import { SIGNUP_USER } from "./types";
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
    console.log(_id);
    dispatch({
      type: SIGNUP_USER,
      token: data.token
    });
    cb();
  } catch (error) {
    console.log(error.response);
  }
}