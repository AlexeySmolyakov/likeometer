import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../actions/AuthActions'

class Login extends Component {
	state = {
		redirectToReferrer: false,
		hasAuthError: false,
		isProcessing: false,
		phone: '',
		password: '',
	};

	handleChange (e) {
		this.setState({
			[e.target.name]: e.target.value.trim(),
			hasAuthError: false,
		})
	}

	onSubmit (e) {
		e.preventDefault();

		if (!this.state.phone || !this.state.password) return false;

		this.setState({
			isProcessing: true,
		});

		this.props.userLogin({
			phone: this.state.phone,
			password: this.state.password
		})
		.catch(error => {
			this.setState({
				hasAuthError: true,
				isProcessing: false,
			});
		});

		return true;
	}

	render () {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;
		const { user } = this.props;
		if (redirectToReferrer || user.id) return <Redirect to={from}/>;

		return (
			<div className="login content">
				<div className="title">LetsQuest</div>
				<form onSubmit={::this.onSubmit}>
					<div>
						<input
							type="text"
							name="phone"
							value={this.state.phone}
							onChange={::this.handleChange}
							disabled={this.state.isProcessing}
							placeholder="Логин"
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={::this.handleChange}
							disabled={this.state.isProcessing}
							placeholder="Пароль"
						/>
					</div>
					<div className="error">{this.state.hasAuthError ? 'Неправильный логин/пароль' : ''}</div>
					<div>
						<button type="submit" disabled={this.state.isProcessing}>Войти</button>
					</div>
				</form>
			</div>
		)
	}
}

Login.propTypes = {};
Login.defaultProps = {};


const mapStateToProps = (state) => {
	return {
		user: state.user.user,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLogin (credentials) {
			return dispatch(login(credentials))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);