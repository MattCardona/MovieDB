import { SIGNUP_USER, SIGNIN_USER } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import decode from 'jwt-decode'


let token = localStorage.getItem("token");
let userId = "";
if (token) {
  setAuthToken(token);
  userId = decode(token)._id;
}

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
    default:
      return state;
  }
}

export default authReducer;