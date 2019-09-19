import { NOW_PLAYING } from './types';
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