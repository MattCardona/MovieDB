import { SIGNUP_USER } from "../actions/types";

const initialState = {
  isAuthenticated: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        isAuthenticated: true,
        token: action.token
      }
    default:
      return state;
  }
}

export default authReducer;