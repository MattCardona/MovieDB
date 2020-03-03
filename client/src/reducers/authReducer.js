import { SIGNUP_USER, SIGNIN_USER, SIGNOUT_USER } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode';

let token = localStorage.getItem("token");
let userId = "";

const checkTokenExp = token => {
  const user = decode(token);
  const currentTime = Date.now() / 1000;

  if (user.exp < currentTime) {
    // console.log("token exp");
    token = null;
    localStorage.removeItem("token");
    window.location.href = '/signin';
    return false;
  } else {
    return true;
  }
}

if (token) {
  if (checkTokenExp(token)) {
    setAuthToken(token);
    userId = decode(token)._id;
  }
}

// let token = localStorage.getItem("token");
// let userId = "";
// if (token) {
//   setAuthToken(token);
//   userId = decode(token)._id;
// }

const initialState = {
  isAuthenticated: token,
  userId
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        isAuthenticated: action.token,
        userId: action.userId
      }
    case SIGNIN_USER:
      return {
        isAuthenticated: action.token,
        userId: action.userId
      }
    case SIGNOUT_USER:
      return {
        isAuthenticated: null,
        userId: ""
      }
    default:
      return state;
  }
}

export default authReducer;