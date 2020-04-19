import Axios from "axios"
import { POPULAR_ACTORS, SEARCH_ACTOR, ACTOR_INFO, APPEND_ACTORS_ACTRESSES } from "./types";

export const popularActors = () => async dispatch => {
  try {
    const { data } = await Axios.get("/actors/popularactors/?page=1");
    dispatch({
      type: POPULAR_ACTORS,
      actors: data
    });
    // console.log(response.data);
  } catch (error) {
    // need to handle error still
    console.log(error);
  }
};

export const searchActor = name => async dispatch => {
  try {
    const { data } = await Axios.post("/actors/search/person", { actor: name });
    // console.log(response.data);
    dispatch({
      type: SEARCH_ACTOR,
      actor: data
    })
  } catch (error) {
    // need to handle error still
    console.log(error);
  }
}

export const actorInfo = actorId => async dispatch => {
  try {
    const { data } = await Axios.get(`/actors/${actorId}`);
    dispatch({
      type: ACTOR_INFO,
      actor: data,
      cast: data.combined_credits.cast
    })
  } catch (error) {
    // need to handle error still
    console.log(error);
  }

}

export const appendActorActresses = (kind, page = 1, cb) => async dispatch => {
  try {
    switch (kind) {
      case "appendActorActresses":
        // console.log("in appendActorActresses");
        {
          const { data } = await Axios.get(`/actors/popularactors/?page=${page}`);
          dispatch({
            type: APPEND_ACTORS_ACTRESSES,
            actors: data
          })
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}