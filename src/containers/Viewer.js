import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getPhotoSrcFromSizes } from '../helpers'
import { KEY_CODE_ESC, KEY_CODE_LEFT_ARROW, KEY_CODE_RIGHT_ARROW } from '../constants'

class Viewer extends React.PureComponent {
	constructor (props) {
		super(props);

		this.currentPhotoIndex = 0;
		this.state = {
			isPreloading: true,
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount () {
		const photo = this.getCurrentPhoto(this.props);
		this.preloadPhoto(photo);

		document.addEventListener('keyup', this.onKeyPress, false);
	}

	componentWillUnmount () {
		document.removeEventListener('keyup', this.onKeyPress, false);
	}

	componentWillReceiveProps (nextProps) {
		if (this.props.photoId === nextProps.photoId) return;

		const photo = this.getCurrentPhoto(nextProps);
		this.preloadPhoto(photo);
	}

	getCurrentPhoto (props) {
		const { photos, ownerId, albumId, photoId } = props;
		const items = photos[`${ownerId}_${albumId}`].items;
		this.currentPhotoIndex = items.findIndex(photo => photo.id === photoId);
		return items[this.currentPhotoIndex];
	}

	preloadPhoto (photo) {
		this.setState({ isPreloading: true });
		const image = new Image();
		image.onload = () => this.setState({ isPreloading: false });
		image.src = getPhotoSrcFromSizes(photo.sizes);
	}

	onClick () {
		this.props.history.goBack()
	}

	onKeyPress (e) {
		const { history, photos, ownerId, albumId } = this.props;
		let index = this.currentPhotoIndex;
		const items = photos[`${ownerId}_${albumId}`].items;

		switch (e.keyCode) {
			case KEY_CODE_ESC:
				return history.goBack();
			case KEY_CODE_LEFT_ARROW:
				index = Math.max(0, index - 1);
				break;
			case KEY_CODE_RIGHT_ARROW:
				index = Math.min(items.length, index + 1);
				break;
		}

		if (index >= 0 && index < items.length && index !== this.currentPhotoIndex) {
			this.currentPhotoIndex = index;
			const photo = items[this.currentPhotoIndex];
			history.replace(`/photo${photo.owner_id}_${photo.id}`);
		}
	}

	render () {
		const { photos, ownerId, albumId, photoId } = this.props;

		const key = `${ownerId}_${albumId}`;
		const items = photos[key].items;

		let classes = ['viewer', 'show'];
		if (!this.state.isPreloading) classes.push('image-loaded');

		this.currentPhotoIndex = items.findIndex(photo => photo.id === photoId);
		const photo = items[this.currentPhotoIndex];

		return (
			<div className={classes.join(' ')} onClick={::this.onClick}>
				<img src={getPhotoSrcFromSizes(photo.sizes)} alt="Image"/>
				{this.state.isPreloading && <div className="loader white"/>}
			</div>
		);
	}
}

Viewer.propTypes = {
	albums: PropTypes.object.isRequired,
	photos: PropTypes.object.isRequired,
	ownerId: PropTypes.number.isRequired,
	albumId: PropTypes.number.isRequired,
	photoId: PropTypes.number.isRequired,
	history: PropTypes.object.isRequired,
};
Viewer.defaultProps = {};

export default Viewer;