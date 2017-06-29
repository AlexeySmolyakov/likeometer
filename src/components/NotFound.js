import React from 'react';
import PropTypes from 'prop-types';

function NotFound (props) {
	console.warn()
	return (
		<div>
			<div>404 Sorry</div>
			<div>{props.location.pathname}</div>
		</div>
	);
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
