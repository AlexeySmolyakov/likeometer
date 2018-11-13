import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSelector } from '../redux/user';

const PrivateRoute = ({ component, user, ...rest }) => {
  if (user.id) return <Route {...rest} component={component} />;
  else return <Redirect to={{ pathname: '/', state: { from: rest.location } }} />;
};

const mapStateToProps = (state) => {
  return {
    user: userSelector(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
