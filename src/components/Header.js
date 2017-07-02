import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class Header extends Component {
	render () {
		const { user } = this.props;
		const image = { backgroundImage: `url(${user.photo_200_orig})` };

		return (
			<header>
				<div className="wrap">
					<NavLink className="links" to={`/albums${user.uid}`}>фото</NavLink>
					<NavLink className="links" to='/friends'>друзья</NavLink>
					<NavLink className="links" to='/groups'>группы</NavLink>
					{user.uid ?
						<div className="user">
							<div>{user.first_name}</div>
							<div className="image" style={image}/>
						</div> :
						<span className="links">Вход</span>
					}
				</div>
			</header>
		);
	}
}

Header.propTypes = {
	user: PropTypes.object.isRequired,
};
Header.defaultProps = {};

export default Header;