import React from 'react';
import PropTypes from 'prop-types';
import image from '../assets/broken-heart.svg'

const NotFound = (props) => {
	return (
		<div className="error404">
			<img src={image} alt="Not found" className="image"/>
			<div className="code">404</div>
		</div>
	);
};

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
