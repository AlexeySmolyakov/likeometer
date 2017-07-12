import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Viewer from './Viewer'
import Photos from './Photos'
import Loader from '../components/Loader'
import { fetchAlbums } from '../actions/AlbumsActions'
import { fetchAllPhotos, fetchPhotosById } from '../actions/PhotosActions'
import { sortPhotos } from '../helpers'

class PhotosWithViewer extends Component {
	constructor (props) {
		super(props);
		this.albumId = 0;
		this.state = {
			offset: 30,
		}
	}

	componentDidMount () {
		this.update();
	}

	componentDidUpdate (prevProps) {
		const isSamePath = prevProps.location.pathname === this.props.location.pathname;
		if (!isSamePath) this.update();
	}

	update () {
		let { page, ownerId: owner_id, objectId } = this.props.match.params;
		const { fetchAllPhotos, fetchPhotosById, fetchAlbums } = this.props;

		this.albumId = 0;

		if (page === 'album') {
			this.albumId = +objectId;
			fetchAlbums({ owner_id });
			fetchAllPhotos({ owner_id, album_id: objectId });
		}

		if (page === 'photo') {
			fetchPhotosById({ photos: `${owner_id}_${objectId}` })
			.then(([{ owner_id, album_id }]) => {
				this.albumId = album_id;
				fetchAlbums({ owner_id });
				fetchAllPhotos({ owner_id, album_id });
			});
		}
	}

	render () {
		const { photos, albums, isFetching } = this.props;
		const { page, ownerId, objectId } = this.props.match.params;

		let photosKey = `${ownerId}_${objectId}`;
		if (page === 'photo') photosKey = `${ownerId}_${this.albumId}`;

		const albumPhotos = sortPhotos((photos[photosKey] || { items: [] }).items);
		const photosLoaded = albumPhotos.length;
		const photosTotal = photos[photosKey] ? photos[photosKey].count : 0;

		if (isFetching || !this.albumId)
			return <Loader photosTotal={photosTotal} photosLoaded={photosLoaded}/>;

		return (
			<div>
				<Viewer
					photos={albumPhotos}
					history={this.props.history}
					pathname={this.props.location.pathname}/>
			</div>
		);
	}
}

PhotosWithViewer.propTypes = {
	photos: PropTypes.object.isRequired,
	albums: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
PhotosWithViewer.defaultProps = {};

const mapStateToProps = (state) => {
	const photos = state.photos.photos;
	const albums = state.albums.albums;

	const isFetching =
		state.photos.isFetching ||
		state.photos.isFetchingById ||
		state.albums.isFetching;

	return {
		photos,
		albums,
		isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchAllPhotos (options) {
		return dispatch(fetchAllPhotos(options))
	},
	fetchAlbums (options) {
		return dispatch(fetchAlbums(options))
	},
	fetchPhotosById (options) {
		return dispatch(fetchPhotosById(options))
	},
});


const mapDispatchToProps = (dispatch) => ({
	fetchAllPhotos (options) {
		return dispatch(fetchAllPhotos(options))
	},
	fetchPhotos (options) {
		return dispatch(fetchPhotos(options))
	},
	fetchAlbums (options) {
		return dispatch(fetchAlbums(options))
	},
	fetchPhotosById (options) {
		return dispatch(fetchPhotosById(options))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosWithViewer);