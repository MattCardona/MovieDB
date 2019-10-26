import { POPULAR_ACTORS, SEARCH_ACTOR } from "../actions/types";

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
    case SEARCH_ACTOR:
      return {
        ...state,
        actors: [...action.actor]
      }
    default:
      return state;
  }
};

export default actorsReducer;