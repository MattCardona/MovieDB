import { NOW_PLAYING, POPULAR } from './types';
import Axios from 'axios';

export const nowPlaying = () => dispatch => {
  Axios.get("/homepage")
    .then(({ data }) => {
      dispatch({
        type: NOW_PLAYING,
        movies: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}

export const popular = () => dispatch => {
  Axios.get("/popular")
    .then(({ data }) => {
      dispatch({
        type: POPULAR,
        movies: data
      })
    })
    .catch(e => {
      console.log(e);
    })
}