import Axios from "axios";
import { SIGNUP_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

// if not return user a error
export const signup = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signup", user);
    // need to save token to localstorage 
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    dispatch({
      type: SIGNUP_USER,
      token: data.token
    });
    cb();
  } catch (error) {
    console.log(error.response);
  }
}