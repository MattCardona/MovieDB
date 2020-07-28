import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ component: AuthComponent, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authenticated ?
        <AuthComponent {...props} />
        :
        <Redirect to="/signin" />
    )}
  />
);

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute);