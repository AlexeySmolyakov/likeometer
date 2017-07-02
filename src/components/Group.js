import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Group = ({ group, isLoaded }) => {
	const imageStyle = { backgroundImage: `url(${group.photo_100})` };
	const isLoadedClass = isLoaded ? 'is-loaded' : '';

	return (
		<Link className="group" to={`/albums-${group.id}`}>
			<div className="wrap">
				<div className="thumb" title={group.name}>
					<div className={`image ${isLoadedClass}`} style={imageStyle}/>
				</div>
				<div className="name" title={group.name}>{group.name}</div>
			</div>
		</Link>
	);
};

Group.propTypes = {
	group: PropTypes.object.isRequired,
	isLoaded: PropTypes.bool.isRequired,
};
Group.defaultProps = {};

export default Group;