import { POPULAR_ACTORS } from "../actions/types";

const actorsInitialState = {
  actor: {},
  actors: [],
  cast: []
};

const actorsReducer = (state = actorsInitialState, action) => {
  switch (action.type) {
    case POPULAR_ACTORS:
      return {
        ...state,
        actors: [...action.actors]
      }
    default:
      return state;
  }
};

export default actorsReducer;