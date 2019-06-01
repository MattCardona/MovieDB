import React from 'react'

const ActorCards = (props) => {
  const actorImage = `https://image.tmdb.org/t/p/w500${props.profile_path}`;
  console.log("wow", props)
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      {/* <Link
        to={{
          pathname: `/movie/${id}`,
          state: { prev: prev }
        }}
      > */}
      <div className="card">
        <img className="card-image" src={actorImage} alt="" />
        <h4 className="card-title hover-effect">
          {props.name}
        </h4>
      </div>

      {/* </Link> */}
    </div>
  )
}

export default ActorCards;