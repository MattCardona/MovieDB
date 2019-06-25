import React from 'react'

const MovieSearchBar = (props) => {
  return (
    <div className="container-fluid" id="search-container">
      <form onSubmit={props.handleSubmit}>
        <input
          id="search-input"
          type="text"
          placeholder="Search Movie/Tv shows"
          name="movie"
          value={props.search}
          onChange={props.handleChange}
        />
        <button className="btn btn-primary" id="search-button"
        >Search</button>
      </form>
    </div>
  )
}

export default MovieSearchBar
