import Axios from "axios";
import { SIGNUP_USER } from "./types";

export const signup = (user, cb) => async dispatch => {
  try {
    const { data } = await Axios.post("/signup", user);
    dispatch({
      type: SIGNUP_USER,
      token: data.token
    });
    cb();
  } catch (error) {
    console.log(error);
  }
}