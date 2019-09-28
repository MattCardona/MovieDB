import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE } from "../actions/types";

let moviesInitialState = {
  movies: [],
  movie: {},
  sliderMovies: []
};

export default (state = moviesInitialState, action) => {
  switch (action.type) {
    case NOW_PLAYING:
      return {
        ...state,
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case POPULAR:
      return {
        ...state,
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case TOP_RATED:
      return {
        ...state,
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case SEARCHED_MOVIE:
      return {
        movies: [],
        sliderMovies: [],
        movie: { ...action.movie }
      };
    default:
      return state;
  }
}