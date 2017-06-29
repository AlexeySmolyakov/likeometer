import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect, withRouter } from 'react-router-dom'

class Header extends Component {
	render () {
		const { user } = this.props;
		const userName = user.first_name || 'Пользователь #' + user.id;

		return (
			<header className="app-header">
				{!!user.id ?
					<NavLink className="links profile" to='/profile'>{userName}</NavLink>
					:
					<NavLink className="links profile" to='/login'>Вход</NavLink>
				}
				<NavLink className="links" to='/companies'>
					<i className="fa fa-building" aria-hidden="true"/>
					<span>Компании</span>
				</NavLink>
				<NavLink className="links" to='/users'>
					<i className="fa fa-user"/>
					<span>Пользователи</span>
				</NavLink>
				<NavLink className="links" to='/bills'>
					<i className="fa fa-file-text-o" aria-hidden="true"/>
					<span>Чеки</span>
				</NavLink>
				<NavLink className="links" to='/categories'>
					<i className="fa fa-th" aria-hidden="true"/>
					<span>Категории</span>
				</NavLink>
				<NavLink className="links" to='/models'>
					<i className="fa fa-shopping-bag" aria-hidden="true"/>
					<span>Модели</span>
				</NavLink>
				<NavLink className="links" to='/items'>
					<i className="fa fa-shopping-cart" aria-hidden="true"/>
					<span>Товары</span>
				</NavLink>
			</header>
		);
	}
}

Header.propTypes = {
	user: PropTypes.object.isRequired,
};
Header.defaultProps = {};

export default Header;