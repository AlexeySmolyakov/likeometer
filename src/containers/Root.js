import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import PrivateRoute from '../components/PrivateRoute'
import Welcome from '../components/Welcome'
import Header from "../components/Header";
import Groups from './Groups'
import Photos from './Photos'
import Albums from './Albums'
import Friends from './Friends'
import NotFound from '../components/NotFound'
import { checkAuth }from '../actions/AuthActions'

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();

class Root extends Component {
	componentDidMount () {
		this.props.checkAuth();
	}

	render () {
		const { user, checkingAuth } = this.props;

		if (!checkingAuth && !user.uid) return <div>Landing</div>;
		if (checkingAuth) return <div>Checking auth</div>;

		return (
			<Router history={history}>
				<div className="layout">
					<div className="views">
						<Header user={user}/>
						<Switch>
							<Route exact={true} path="/" component={Welcome}/>
							<PrivateRoute path="/albums:ownerId" component={Albums}/>
							<PrivateRoute path="/album:ownerId([\d\-]+)_:albumId" component={Photos}/>
							<PrivateRoute path="/friends:userId?" component={Friends}/>
							<PrivateRoute path="/groups:userId?" component={Groups}/>
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