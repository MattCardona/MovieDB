import React from 'react'

const ActorSearchBar = (props) => {
  return (
    <div
      className="container popular-actors-form" >
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="actress/actor name"
          value={props.search}
          onChange={props.handleChange}
        />
        <button
          className="btn btn-primary"
          id="search-button"
        >Submit</button>
      </form>
    </div>
  )
}

export default ActorSearchBar
