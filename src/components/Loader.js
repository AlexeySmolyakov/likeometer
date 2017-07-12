import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ photosTotal, photosLoaded }) => {
	const photosLoadedString = `${photosLoaded} / ${photosTotal}`;

	return (
		<div className="loader-wrap">
			<div className="loader"/>
			{photosTotal > 0 && <div className="photos-loaded">{photosLoadedString}</div>}
		</div>
	);
};

Loader.propTypes = {
	photosTotal: PropTypes.number,
	photosLoaded: PropTypes.number,
};
Loader.defaultProps = {};

export default Loader;