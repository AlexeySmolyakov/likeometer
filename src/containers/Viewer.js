import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Viewer extends Component {
	state = {
		isLoaded: false
	};

	isPhotoPath (pathname) {
		return /^\/photo/.test(pathname);
	}

	componentWillReceiveProps (nextProps, nextContext) {

	}

	componentWillUnmount () {

	}

	onClick () {
		this.props.history.goBack()
	}

	render () {
		const isPhoto = this.isPhotoPath(this.props.pathname);
		if (!isPhoto) return <div className="viewer"/>;

		const photoId = +this.props.pathname.match(/_(.+)/)[1];
		const currentPhoto = this.props.photos.find(photo => photo.id === photoId);

		if (!currentPhoto) return <div className="viewer"/>;
		const imageSrc = currentPhoto.sizes.slice(-1)[0].src;

		return (
			<div className="viewer show" onClick={::this.onClick}>
				<img src={imageSrc} alt=""/>
			</div>
		);
	}
}

Viewer.propTypes = {
	history: PropTypes.object.isRequired,
	pathname: PropTypes.string.isRequired,
	photos: PropTypes.array.isRequired,
};
Viewer.defaultProps = {};

export default Viewer;
