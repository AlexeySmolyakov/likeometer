import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Group extends React.Component {
	state = {
		isLoaded: '',
	};

	componentDidMount () {
		const { group } = this.props;
		const imageSrc = group.photo_100;

		this.image = new Image();
		this.image.onload = () => {
			this.setState({ isLoaded: 'is-loaded' });
		};
		this.image.src = imageSrc;
	}

	componentWillUnmount () {
		this.image.onload = null;
	}

	render () {
		const { group } = this.props;
		const imageStyle = { backgroundImage: `url(${group.photo_100})` };

		return (
			<Link className="group" to={`/albums-${group.id}`}>
				<div className="wrap">
					<div className="thumb" title={group.name}>
						<div className={`image ${this.state.isLoaded}`} style={imageStyle}/>
					</div>
					<div className="name" title={group.name}>{group.name}</div>
				</div>
			</Link>
		);
	}
}

Group.propTypes = {
	group: PropTypes.object.isRequired,
};
Group.defaultProps = {};

export default Group;