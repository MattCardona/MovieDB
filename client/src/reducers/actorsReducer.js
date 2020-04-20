import { POPULAR_ACTORS, SEARCH_ACTOR, ACTOR_INFO, APPEND_ACTORS_ACTRESSES } from "../actions/types";

const actorsInitialState = {
  actor: {},
  actors: [],
  cast: []
};

const actorsReducer = (state = actorsInitialState, action) => {
  switch (action.type) {
    case POPULAR_ACTORS:
      return {
        actor: {},
        cast: [],
        actors: [...action.actors]
      }
    case SEARCH_ACTOR:
      return {
        actor: {},
        cast: [],
        actors: [...action.actor]
      }
    case ACTOR_INFO:
      return {
        actors: [],
        actor: { ...action.actor },
        cast: [...action.cast]
      }
    case APPEND_ACTORS_ACTRESSES:
      return {
        actors: [...state.actors, ...action.actors],
        actor: {},
        cast: []
      }
    default:
      return state;
  }
};

export default actorsReducer;