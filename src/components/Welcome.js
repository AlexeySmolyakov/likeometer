import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Welcome extends Component {
	componentDidMount () {
		console.warn('Welcome')
	}

	render () {
		if (this.props.user.uid) return <Redirect to={`/albums${this.props.user.uid}`}/>;

		return (
			<div>
				<div>Welcome & Auth</div>
			</div>
		);
	}
}

Welcome.propTypes = {};
Welcome.defaultProps = {};


const mapStateToProps = (state) => ({
	user: state.user.user,
});

export default connect(mapStateToProps)(Welcome);