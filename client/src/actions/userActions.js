import Axios from "axios";

// add callback if creating account goes well
// if not return user a error
export const signup = user => async dispatch => {
  try {
    const { data } = await Axios.post("/signup", user);
    // dispatch to store signup
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}