import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KEY_CODE_LEFT_ARROW, KEY_CODE_RIGHT_ARROW, KEY_CODE_ESC } from '../constants'

class Viewer extends Component {
	constructor (props) {
		super(props);

		this.image = null;
		const { pathname, photos } = this.props;

		let currentPhotoIndex = 0;
		if (this.isPhotoPath(pathname))
			currentPhotoIndex = photos.findIndex(
				photo => photo.id === this.getPhotoId(pathname));

		this.state = {
			photos: photos,
			isLoading: false,
			currentPhotoIndex,
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount () {
		if (this.isPhotoPath(this.props.pathname))
			this.preloadPhoto(this.state.photos[this.state.currentPhotoIndex]);
	}

	componentWillReceiveProps (nextProps) {
		if (this.isPhotoPath(nextProps.pathname)) {
			const currentPhotoIndex = this.state.photos.findIndex(
				photo => photo.id === this.getPhotoId(nextProps.pathname));
			this.setState({ currentPhotoIndex });
			this.preloadPhoto(this.state.photos[currentPhotoIndex]);
		}
	}

	isPhotoPath (pathname) {
		return /^\/photo/.test(pathname);
	}

	getPhotoSrc (photo) {
		return photo.sizes.slice(-1)[0].src;
	}

	getPhotoId (pathname) {
		return +pathname.match(/_(.+)/)[1];
	}

	preloadPhoto (photo) {
		this.setState({ isLoading: true });
		const image = new Image();
		image.onload = () => this.setState({ isLoading: false });
		image.src = this.getPhotoSrc(photo);
	}

	onClick () {
		this.props.history.goBack()
	}

	onKeyPress (e) {
		const { history } = this.props;
		let { currentPhotoIndex, photos } = this.state;

		if (e.keyCode === KEY_CODE_ESC) return history.goBack();

		switch (e.keyCode) {
			case KEY_CODE_LEFT_ARROW:
				currentPhotoIndex--;
				break;
			case KEY_CODE_RIGHT_ARROW:
				currentPhotoIndex++;
				break;
		}

		if (currentPhotoIndex >= 0 && currentPhotoIndex < photos.length) {
			const photo = this.state.photos[currentPhotoIndex];
			history.replace(`/photo${photo.owner_id}_${photo.id}`)
		}
	}

	render () {
		const { pathname } = this.props;
		const photo = this.state.photos[this.state.currentPhotoIndex];

		if (!this.isPhotoPath(pathname) || !photo) {
			document.removeEventListener('keyup', this.onKeyPress, false);
			return <div className="viewer"/>;
		} else {
			document.addEventListener('keyup', this.onKeyPress, false);
		}

		if (this.state.isLoading) return (
			<div className="viewer show">
				<img alt=""/>
				<div className="loader white"/>
			</div>
		);

		return (
			<div className="viewer show image-loaded" onClick={::this.onClick}>
				<img src={this.getPhotoSrc(photo)} alt=""/>
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
