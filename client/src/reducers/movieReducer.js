import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR } from "../actions/types";

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
    case SEARCH_MOVIE:
      return {
        movies: [...action.searchMovie],
        sliderMovies: [],
        movie: {}
      };
    case SEARCH_MOVIE_ERROR:
      return {
        movies: [],
        sliderMovies: [],
        movie: {}
      };
    default:
      return state;
  }
}