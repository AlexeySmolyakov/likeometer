import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/AuthActions'

class Landing extends Component {
	onLoginClick () {
		this.props.login();
	}

	render () {
		return (
			<div>
				<div>
					Landing{this.props.checkingAuth && `, checking auth`}
				</div>
				<div>
					<button type="button" onClick={::this.onLoginClick}>Login VK</button>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {};
Landing.defaultProps = {};

const mapStateToProps = (state) => ({
	checkingAuth: state.user.checkingAuth,
});

const mapDispatchToProps = (dispatch) => ({
	login () {
		return dispatch(login())
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
