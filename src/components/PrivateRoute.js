import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component, user, ...rest }) => {
	if (user.id) return <Route {...rest} component={component}/>;
	else return <Redirect to={{ pathname: '/login', state: { from: rest.location } }}/>
};

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
};

export default connect(mapStateToProps)(PrivateRoute);
