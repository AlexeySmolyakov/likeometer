import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Friend extends React.Component {
	state = {
		isLoaded: '',
	};

	componentDidMount () {
		const { friend } = this.props;
		const imageSrc = friend.photo_100;

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
		const { friend } = this.props;

		const imageSrc = friend.photo_100;
		const imageStyle = { backgroundImage: `url(${imageSrc})` };

		const name = friend.first_name + ' ' + friend.last_name;

		return (
			<Link className="friend" to={`/albums${friend.id}`}>
				<div className="wrap">
					<div className="thumb" title={name}>
						<div className={`image ${this.state.isLoaded}`} style={imageStyle}/>
					</div>
					<div className="name">
						<div title={name}>{friend.first_name}</div>
						<div title={name}>{friend.last_name}</div>
					</div>
				</div>
			</Link>
		);
	}
}

Friend.propTypes = {};
Friend.defaultProps = {};

export default Friend;