import { NOW_PLAYING, POPULAR, TOP_RATED, SEARCHED_MOVIE, SEARCH_MOVIE, SEARCH_MOVIE_ERROR, SEARCHED_MOVIE_NAV, APPEND_NOW_PLAYING, APPEND_SEARCH_MOVIE, SEARCHED_SHOW, FILTER_BY_POPULARITY, FILTER_BY_RATING } from "../actions/types";

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
    case SEARCHED_SHOW:
      return {
        ...state,
        // movies: [],
        movie: { ...action.show }
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
    case FILTER_BY_POPULARITY:
      {
        let filter = state.movies.sort((a, b) => b.popularity - a.popularity);
        // console.log("after", filter);
        return {
          movies: [...filter],
          movie: {},
          sliderMovies: filter.slice(0, 6)
        }
      }
    case FILTER_BY_RATING:
      {
        let filter = state.movies.sort((a, b) => b.vote_average - a.vote_average);
        return {
          movies: [...filter],
          movie: {},
          sliderMovies: filter.slice(0, 6)
        }
      }
    default:
      return state;
  }
}