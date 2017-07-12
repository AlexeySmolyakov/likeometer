import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withImageOnLoad from '../decorators/withImageOnLoad'
import Photo from '../components/Photo'
const PhotoHOC = withImageOnLoad(Photo);

import Viewer from './Viewer'
import Loader from '../components/Loader'
import { fetchAllPhotos, fetchPhotos, fetchPhotosById } from '../actions/PhotosActions'
import { fetchAlbums } from '../actions/AlbumsActions'
import { declensionPhotos, createPlaceholder, getPhotoSrcFromSizes } from '../helpers'

class Photos extends Component {
	constructor () {
		super();

		this.state = {
			offset: 30,
			limit: 30,
			completed: false,
			albumId: 0,
		};
		this.albumId = 0;

		this.$views = null;
		this.onScrollToBottom = this.onScrollToBottom.bind(this);
	}

	componentDidMount () {
		this.fetchData();

		this.$views = document.querySelector('.views');
		this.$views.addEventListener('scroll', this.onScrollToBottom, false);
	}

	componentWillUpdate (prevProps) {
		//console.warn('componentWillUpdate')
		const isSamePath = this.props.location.pathname === prevProps.location.pathname;
		if (!isSamePath) this.fetchData();
	}

	fetchData () {
		//console.warn('fetch')

		const { fetchAllPhotos, fetchPhotosById, fetchAlbums, fetchPhotos } = this.props;
		let { page, ownerId: owner_id, objectId } = this.props.match.params;

		if (page === 'album') {
			fetchAlbums({ owner_id });
			//fetchPhotos({ owner_id, album_id: objectId });
			fetchAllPhotos({ owner_id, album_id: objectId });
			//fetchAAA({ owner_id, album_id: objectId });
			//this.setState({ albumId: +objectId });
			//console.warn(page, objectId)
			this.albumId = +objectId;
		}

		if (page === 'photo' && !this.albumId) {
			fetchPhotosById({ photos: `${owner_id}_${objectId}` })
			.then(([{ owner_id, album_id }]) => {
				fetchAlbums({ owner_id });
				fetchPhotos({ owner_id, album_id });
				//this.setState({ albumId: album_id });
				this.albumId = album_id;
			});
		}
	}

	componentWillUnmount () {
		this.$views.removeEventListener('scroll', this.onScrollToBottom, false);
	}

	onScrollToBottom (e) {
		const $views = e.target;
		if (this.state.completed) return;

		const { page, ownerId, objectId } = this.props.match.params;
		let key = `${ownerId}_${objectId}`;
		if (page === 'photo') key = `${ownerId}_${this.state.albumId}`;
		const photos = this.props.photos[key].items;

		if ($views.scrollTop + window.innerHeight >= $views.scrollHeight - 100) {
			const offset = this.state.offset + this.state.limit;
			this.setState({
				offset,
				completed: photos.length <= offset
			});
		}
	}

	render () {
		const { photos, albums, isFetching } = this.props;
		const { page, ownerId, objectId } = this.props.match.params;

		let key = `${ownerId}_${objectId}`;
		if (page === 'photo') key = `${ownerId}_${this.albumId}`;

		const photosLoaded = photos[key] ? photos[key].items.length : 0;
		const photosTotal = photos[key] ? photos[key].count : 0;

		//console.warn(isFetching, !albums[ownerId], !photos[key], !this.albumId)
		if (isFetching || !albums[ownerId] || !photos[key] || !this.albumId)
			return <Loader photosLoaded={photosLoaded} photosTotal={photosTotal}/>;

		//console.warn('photos', photos[key].items)
		//console.warn('[key]', key)
		//console.warn('photos[key].items', photos[key].items)

		const albumPhotos = photos[key] ? photos[key].items : [];
		//console.warn('albumPhotos', albumPhotos)
		const album = albums[ownerId].items.find(album => album.id === this.albumId);
		const albumTitle = album ? album.title : <span>&nbsp;</span>;
		if (album) document.title = album.title;
		const myLikesCount = albumPhotos.reduce((prev, curr) => curr.likes.user_likes + prev, 0);

		const slicedPhotos = albumPhotos.slice(0, this.state.offset);
		const list = slicedPhotos.map(photo =>
			<PhotoHOC
				key={photo.id}
				photo={photo}
				imageSrc={getPhotoSrcFromSizes(photo.sizes, 7)}
			/>
		);

		let placeholders = createPlaceholder(5, (i) => <div key={i} className="photo"/>);
		return (
			<div>
				<h1>{albumTitle}</h1>
				<h3>
					{albumPhotos.length} {declensionPhotos(albumPhotos.length)}
					{myLikesCount > 0 && [
						<span key={'Dot1'}> &middot; </span>,
						`Нравится ${myLikesCount} ${declensionPhotos(myLikesCount)}`
					]}
				</h3>

				<div className="photos">
					{list}
					{placeholders}
				</div>
				{/*<Viewer*/}
				{/*pathname={this.props.location.pathname}*/}
				{/*history={this.props.history}*/}
				{/*photos={albumPhotos}/>*/}
			</div>
		);
	}
}

Photos.propTypes = {
	photos: PropTypes.object.isRequired,
	albums: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
};
Photos.defaultProps = {};

const mapStateToProps = (state) => {
	const photos = state.photos.photos;
	const albums = state.albums.albums;

	const isFetching =
		state.photos.isFetching ||
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

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
