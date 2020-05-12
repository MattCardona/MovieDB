import React from 'react';

const Trailer = ({ trailerIds }) => {
  return (
    <div className="container-fluid">
      {trailerIds.length > 0 ?
        <div style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
          <h2>Trailers</h2>
          <iframe width="640" height="315" src={`https://www.youtube.com/embed/${trailerIds[0]}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        :
        null
      }
    </div>
  )
};

export default Trailer;