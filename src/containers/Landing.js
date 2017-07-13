import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/AuthActions'

import preview00 from '../assets/preview-00.png'
import preview01 from '../assets/preview-01.png'
import preview02 from '../assets/preview-02.png'

import likeometer from '../assets/likeometer.svg'

class Landing extends Component {
	constructor () {
		super();
		const min = 0;
		const max = 2;
		const previewIndex = Math.floor(Math.random() * (max - min + 1)) + min;
		this.preview = [preview00, preview01, preview02][previewIndex];
	}


	onLoginClick () {
		this.props.login();
	}

	render () {
		const style = { backgroundImage: `url(${this.preview})` };
		return (
			<div className="landing">
				<div className="preview" style={style}/>
				<div className="likeometer">
					<img src={likeometer} alt=""/>
				</div>
				<div className="login-button">
					<button type="button" onClick={::this.onLoginClick}>Войти через <i className="fa fa-vk"/></button>
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
