import React from 'react';
import PropTypes from 'prop-types';
import { USER_ROLE } from '../constants'
import { Link } from 'react-router-dom'
import moment from 'moment'

const User = ({ user }) => {
	const createdAt = moment(`${user.created_at}Z`).format('DD.MM.YYYY | HH:mm:ss');
	const role = user.role === USER_ROLE.ADMIN ? 'admin' : 'user';

	return (
		<div className="user">
			<div>#{user.id}</div>
			<div>{user.first_name} {user.last_name}</div>
			<div>{user.phone}</div>
			<div>{role}</div>
			<div>{createdAt}</div>
			<div className="edit">
				<Link to={`/users/${user.id}`}>
					<i className="fa fa-pencil"/>
				</Link>
			</div>
		</div>
	);
};

User.propTypes = {};
User.defaultProps = {};

export default User;
