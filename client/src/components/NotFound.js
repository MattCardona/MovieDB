import React from 'react'

const NotFound = (props) => {
  return (
    <div className="container" id="not-found">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i>Page Not Found
      </h1>
      <p className="large">Sorry, that page not exist.</p>
    </div>
  )
}

export default NotFound;