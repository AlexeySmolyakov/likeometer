import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import PrivateRoute from '../components/PrivateRoute'
import Welcome from '../components/Welcome'
import Albums from './Albums'
import NotFound from '../components/NotFound'

import { checkAuth }from '../actions/AuthActions'

class Root extends Component {
	componentDidMount () {
		this.props.checkAuth();
	}

	render () {
		const { user, checkingAuth } = this.props;

		if (!checkingAuth && !user.uid) return <div>Landing</div>;
		if (checkingAuth) return <div>Checking auth</div>;

		return (
			<Router>
				<div className="layout">
					<div className="views">
						<Switch>
							<Route exact={true} path="/" component={Welcome}/>
							<PrivateRoute path="/albums:userId" component={Albums}/>
							<Route component={NotFound}/>
						</Switch>
					</div>
				</div>
			</Router>
		);

	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	checkingAuth: state.user.checkingAuth,
});

const mapDispatchToProps = (dispatch) => ({
	checkAuth () {
		return dispatch(checkAuth())
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Root)