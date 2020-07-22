import React from 'react';

const Trailer = ({ trailerIds, title }) => {
  return (
    <div className="container">
      {trailerIds.length > 0 ?
        <div className="trailer">
          <h2>Trailer</h2>
          <hr />
          <iframe className="iframe" src={`https://www.youtube.com/embed/${trailerIds[0]}`} title={title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        :
        null
      }
    </div>
  )
};

export default Trailer;