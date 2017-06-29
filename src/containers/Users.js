import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/UsersActions'
import User from '../components/User'

class Users extends Component {
	componentDidMount () {
		const { fetchUsers } = this.props;
		fetchUsers();
	}

	render () {
		const { users: { users } } = this.props;
		const userList = users.map(user => <User key={user.id} user={user}/>);

		return (
			<div>
				<h2>Пользователи</h2>
				<div className="user-list">{userList}</div>
			</div>
		);
	}
}

Users.propTypes = {};
Users.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		users: state.users,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers() {
			return dispatch(fetchUsers())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);