import React from 'react';

const Trailer = ({ trailerIds }) => {
  return (
    <div className="container">
      {trailerIds.length > 0 ?
        <div className="trailer" style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
          <h2>Trailers</h2>
          <iframe className="iframe" src={`https://www.youtube.com/embed/${trailerIds[0]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        :
        null
      }
    </div>
  )
};

export default Trailer;