import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

class Photo extends React.Component {
	state = {
		isLoaded: '',
		imageSrc: this.getPhotoSize(this.props.photo.sizes),
	};

	getPhotoSize (sizes = []) {
		let image = sizes.find(size => size.type === 'q');
		if (!image) image = sizes.find(size => size.type === 'x');
		return image.src;
	}

	componentDidMount () {
		this.image = new Image();
		this.image.onload = () => this.setState({ isLoaded: 'is-loaded' });
		this.image.src = this.state.imageSrc;
	}

	componentWillUnmount () {
		this.image.onload = null;
	}

	render () {
		const { photo } = this.props;
		const imageStyle = { backgroundImage: `url(${this.state.imageSrc})` };
		const user_likes = photo.likes.user_likes ? 'fa-heart' : 'fa-heart-o';

		return (
			<Link className="photo" to={`/photo${photo.owner_id}_${photo.id}`}>
				<div className="wrap">
					<div className="thumb">
						<div className={`image ${this.state.isLoaded}`} style={imageStyle}/>
					</div>
					<div className="counters">
						<div className="likes">
							<i className={`fa ${user_likes}`} aria-hidden="true"/>
							{photo.likes.count}
						</div>
						{photo.comments.count > 0 &&
						<div className="comments">
							<i className="fa fa-comment-o" aria-hidden="true"/>
							{photo.comments.count}
						</div>}
					</div>
				</div>
			</Link>
		);
	}
}

Photo.propTypes = {
	photo: PropTypes.object.isRequired,
};
Photo.defaultProps = {};

export default Photo;