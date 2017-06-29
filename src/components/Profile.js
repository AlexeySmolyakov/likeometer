import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../actions/AuthActions'

class Profile extends Component {
	state = {
		user: {
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name,
			phone: this.props.user.phone,
			id: this.props.user.id,
		},
		isProcessing: false,
	};

	onLogoutClick () {
		this.props.userLogout();
	}

	handleInput (e) {
		let { user } = this.state;
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}

	onSubmit (e) {
		e.preventDefault();

		this.setState({
			isProcessing: true,
		});

	}

	render () {
		const { user } = this.state;

		return (
			<div>
				<h2>Профиль</h2>

				<form onSubmit={::this.onSubmit}>
					<div>
						<input
							type="text"
							name="first_name"
							value={user.first_name}
							onChange={::this.handleInput}
							placeholder="Имя"
						/>
					</div>
					<div>
						<input
							type="text"
							name="last_name"
							value={user.last_name}
							onChange={::this.handleInput}
							placeholder="Фамилия"
						/>
					</div>
					<div>
						<button
							type="submit"
							disabled={this.state.isProcessing}
						>Сохранить
						</button>
					</div>
				</form>
				<div>ID: {user.id}</div>
				<div>NAME: {user.first_name} {user.last_name}</div>
				{user.email && <div>EMAIL: {user.email}</div>}
				{user.phone && <div>PHONE: {user.phone}</div>}
				<div>
					<button type="button" onClick={::this.onLogoutClick}>Выход</button>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {};
Profile.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLogout () {
			return dispatch(logout())
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
