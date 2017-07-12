import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getPhotoSrcFromSizes } from '../helpers'
import { fetchPhotosById } from '../actions/PhotosActions'
import { KEY_CODE_ESC, KEY_CODE_LEFT_ARROW, KEY_CODE_RIGHT_ARROW } from '../constants'

class Viewer extends React.PureComponent {
	constructor (props) {
		super(props);

		this.photos = [];
		this.currentPhotoIndex = 0;

		this.state = {
			albumId: 0,
			photos: [],
			preloading: false,
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount () {
		this.fetchAlbumIdIfNeeded(this.props);

		document.addEventListener('keyup', this.onKeyPress, false);
	}

	fetchAlbumIdIfNeeded (props) {
		if (!this.state.albumId) {

			console.warn('fetchAlbumIdIfNeeded');

			const { photos, fetchPhotosById } = props;
			const ownerId = +this.props.match.params.ownerId;
			const photoId = +this.props.match.params.photoId;

			fetchPhotosById({ photos: `${ownerId}_${photoId}` })
			.then(([{ album_id }]) => {
				this.photos = (photos[`${ownerId}_${album_id}`] || { items: [] }).items;
				this.setState({
					albumId: album_id,
					photos: (photos[`${ownerId}_${album_id}`] || { items: [] }).items,
				});
			})
		}
	}

	componentWillUnmount () {
		document.removeEventListener('keyup', this.onKeyPress, false);
	}

	componentWillReceiveProps (nextProps) {
		console.warn('componentWillReceiveProps');

		this.fetchAlbumIdIfNeeded(nextProps);

		const { photos } = nextProps;
		const albumId = this.state.albumId;
		const ownerId = +nextProps.match.params.ownerId;
		const photoId = +nextProps.match.params.photoId;
		const items = (photos[`${ownerId}_${albumId}`] || { items: [] }).items;
		this.currentPhotoIndex = this.state.photos.findIndex(photo => photo.id === photoId);
		const photo = this.state.photos[this.currentPhotoIndex];
		this.setState({
			photos: items,
			preloading: true,
		});
		this.preloadPhoto(photo)
	}

	shouldComponentUpdate (nextProps, nextState, nextContext) {
		console.warn('shouldComponentUpdate');
		return true;
	}

	componentWillUpdate (nextProps, nextState, nextContext) {
		console.warn('componentWillUpdate')
	}

	componentDidUpdate (prevProps) {
		console.warn('componentDidUpdate');
	}

	getPhotoId (pathname) {
		return +pathname.match(/_(.+)/)[1];
	}

	preloadPhoto (photo) {
		if (!photo) return;
		const image = new Image();
		image.onload = () => this.setState({ preloading: false });
		image.src = getPhotoSrcFromSizes(photo.sizes);
	}

	onClick () {
		this.props.history.goBack()
	}

	onKeyPress (e) {
		const { history } = this.props;
		let index = this.currentPhotoIndex;

		switch (e.keyCode) {
			case KEY_CODE_ESC:
				return history.goBack();
			case KEY_CODE_LEFT_ARROW:
				index = Math.max(0, index - 1);
				break;
			case KEY_CODE_RIGHT_ARROW:
				index = Math.min(this.state.photos.length, index + 1);
				break;
		}

		if (index >= 0 && index < this.state.photos.length && index !== this.currentPhotoIndex) {
			this.currentPhotoIndex = index;
			const photo = this.state.photos[this.currentPhotoIndex];
			history.replace(`/photo${photo.owner_id}_${photo.id}`)
		}
	}

	render () {
		console.warn(this.state.preloading)
		let photo = this.state.photos[this.currentPhotoIndex];
		if (!this.state.albumId || !this.state.photos.length || this.state.preloading) return (
			<div className="viewer show">
				{photo && <img src={getPhotoSrcFromSizes(photo.sizes)} alt=""/>}
				<div className="loader white"/>
			</div>
		);

		const photoId = +this.props.match.params.photoId;
		this.currentPhotoIndex = this.state.photos.findIndex(photo => photo.id === photoId);
		photo = this.state.photos[this.currentPhotoIndex];
		console.warn(photo.id);
		return (
			<div className="viewer show image-loaded" onClick={::this.onClick}>
				<img src={getPhotoSrcFromSizes(photo.sizes)} alt=""/>
			</div>
		);
	}
}

Viewer.propTypes = {};
Viewer.defaultProps = {};

const mapStateToProps = (state) => ({
	photos: state.photos.photos,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPhotosById (options) {
		return dispatch(fetchPhotosById(options))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);