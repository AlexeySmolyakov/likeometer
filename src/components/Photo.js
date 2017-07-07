import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import 'tracking'
import 'tracking/build/data/face-min'

class Photo extends React.PureComponent {
	state = {
		faceDetected: false,
	};

	componentDidUpdate (prevProps, prevState, prevContext) {
		if (this.props.isLoaded) {
			const objects = new tracking.ObjectTracker(['face']);

			objects.on('track', (event) => {
				if (event.data.length === 0) {
					// No objects were detected in this frame.
				} else {
					console.warn('Face detected');
					this.setState({
						faceDetected: true,
					});

					//event.data.forEach((rect) => {
					//	// rect.x, rect.y, rect.height, rect.width
					//	console.warn(rect)
					//});
				}
			});

			tracking.track(`#photo${this.props.photo.id}`, objects);
		}
	}

	render () {
		const { photo, isLoaded, imageSrc } = this.props;
		const imageStyle = { backgroundImage: `url(${imageSrc})` };
		const userLikes = photo.likes.user_likes ? 'fa-heart' : 'fa-heart-o';
		const isLoadedClass = isLoaded ? 'is-loaded' : '';

		return (
			<div className={`photo ${this.state.faceDetected ? 'detected' : ''}`}>
				<img src={imageSrc} style={{ display: 'none' }} id={`photo${photo.id}`}/>
				<Link className="wrap" to={{
					pathname: `/photo${photo.owner_id}_${photo.id}`,
					state: { modal: true }
				}}>
					<div className="thumb">
						<div className={`image ${isLoadedClass}`} style={imageStyle}/>
					</div>
					<div className="counters">
						<div className="likes">
							<i className={`fa ${userLikes}`} aria-hidden="true"/>
							{photo.likes.count}
						</div>
						{photo.comments.count > 0 &&
						<div className="comments">
							<i className="fa fa-comment-o" aria-hidden="true"/>
							{photo.comments.count}
						</div>}
					</div>
				</Link>
			</div>
		);
	}
}

Photo.propTypes = {
	photo: PropTypes.object.isRequired,
	isLoaded: PropTypes.bool.isRequired,
};
Photo.defaultProps = {};

export default Photo;