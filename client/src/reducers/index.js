import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import actorsReducer from './actorsReducer';

export default combineReducers({
  movies: movieReducer,
  actors: actorsReducer
});