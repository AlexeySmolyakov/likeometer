import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Friend = ({ friend, isLoaded, imageSrc }) => {
	const imageStyle = { backgroundImage: `url(${imageSrc})` };
	const isLoadedClass = isLoaded ? 'is-loaded' : '';

	return (
		<Link className="friend" to={`/albums${friend.id}`}>
			<div className="wrap">
				<div className="thumb" title={name}>
					<div className={`image ${isLoadedClass}`} style={imageStyle}/>
				</div>
				<div className="name">
					<div title={name}>{friend.first_name}</div>
					<div title={name}>{friend.last_name}</div>
				</div>
			</div>
		</Link>
	);
};

Friend.propTypes = {
	friend: PropTypes.object.isRequired,
	isLoaded: PropTypes.bool.isRequired,
};
Friend.defaultProps = {};

export default Friend;
