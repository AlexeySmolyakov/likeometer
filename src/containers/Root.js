import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import Header from '../components/Header'
import Welcome from '../components/Welcome';

import Companies from './Companies'
import Company from './Company'

import Users from './Users'
import UserDetails from '../components/UserDetails'

import Categories from '../containers/Categories'
import Category from './Category'

import Bills from '../containers/Bills'
import Login from '../components/Login'
import PrivateRoute from '../components/PrivateRoute'
import Profile from '../components/Profile'
import NotFound from '../components/NotFound'

import { checkAuth }from '../actions/AuthActions'

class Root extends Component {
	componentDidMount () {
		const { checkAuth } = this.props;
		checkAuth();
	}

	render () {
		const { user } = this.props;

		if (!!user.id) document.querySelector('body').classList.add('app-is-on');
		else document.querySelector('body').classList.remove('app-is-on');

		if (user.id === void(0)) return null;

		return (
			<Router>
				<div className="layout">
					{!!user.id && <Header name='LetsQuest' user={this.props.user}/>}
					<div className="views">
						<Switch>
							<PrivateRoute exact={true} path="/" component={Welcome}/>

							<PrivateRoute exact={true} path="/companies" component={Companies}/>
							<PrivateRoute path='/companies/:companyId' component={Company}/>

							<PrivateRoute exact={true} path='/users' component={Users}/>
							<PrivateRoute path='/users/:userId' component={UserDetails}/>

							<PrivateRoute exact={true} path="/categories" component={Categories}/>
							<PrivateRoute path='/categories/:categoryId' component={Category}/>

							<PrivateRoute exact={true} path='/bills' component={Bills}/>
							<PrivateRoute path='/profile' component={Profile}/>
							<Route path='/login' component={Login}/>
							<Route component={NotFound}/>
						</Switch>
					</div>
				</div>
			</Router>
		);

	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuth () {
			return dispatch(checkAuth())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Root)