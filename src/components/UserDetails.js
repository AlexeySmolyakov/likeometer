import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserDetails extends Component {
	render () {
		const userId = +this.props.match.params.userId
		const user = null

		if (!user) return (
			<div>
				<div>User details</div>
				<div>User not found</div>
			</div>
		)

		return (
			<div>
				<div>User details</div>
				<div>---</div>
				<div>ID: {user.id}</div>
				<div>NAME: {user.name}</div>
				<div>PHONE: {user.phone}</div>
			</div>
		);
	}
}

UserDetails.propTypes = {};
UserDetails.defaultProps = {};

export default UserDetails;
