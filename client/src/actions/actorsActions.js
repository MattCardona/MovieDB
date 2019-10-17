import Axios from "axios"
import { POPULAR_ACTORS } from "./types";

export const popularActors = () => async dispatch => {
  try {
    const response = await Axios.get("/popularactors");
    dispatch({
      type: POPULAR_ACTORS,
      actors: response.data
    });
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};