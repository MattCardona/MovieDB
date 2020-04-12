import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR, SEARCHED_MOVIE_NAV, APPEND_NOW_PLAYING, APPEND_SEARCH_MOVIE } from "../actions/types";

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
        movie: {},
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case APPEND_NOW_PLAYING:
      return {
        ...state,
        movie: {},
        movies: [...state.movies, ...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case POPULAR:
      return {
        ...state,
        movie: {},
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case TOP_RATED:
      return {
        ...state,
        movie: {},
        movies: [...action.movies],
        sliderMovies: action.movies.slice(0, 6)
      };
    case SEARCHED_MOVIE:
      return {
        ...state,
        // movies: [],
        movie: { ...action.movie }
      };
    case SEARCH_MOVIE:
      return {
        movies: [...action.searchMovie],
        sliderMovies: [],
        movie: {}
      };
    case APPEND_SEARCH_MOVIE:
      return {
        ...state,
        movie: {},
        sliderMovies: [],
        movies: [...state.movies, ...action.searchMovie]
      }
    case SEARCH_MOVIE_ERROR:
      return {
        movies: [],
        sliderMovies: [],
        movie: {}
      };
    case SEARCHED_MOVIE_NAV:
      return {
        movies: [],
        sliderMovies: [],
        movie: {}
      };
    default:
      return state;
  }
}