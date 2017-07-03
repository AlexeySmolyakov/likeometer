import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withImageOnLoad from '../decorators/withImageOnLoad'
import Photo from '../components/Photo'
const PhotoHOC = withImageOnLoad(Photo);

import Loader from '../components/Loader'
import Viewer from './Viewer'
import { fetchPhotos, fetchPhotosById } from '../actions/PhotosActions'
import { fetchAlbums } from '../actions/AlbumsActions'
import { declensionPhotos } from '../helpers'

class Photos extends Component {
	constructor () {
		super();
		this.$views = null;
		this.onScrollToBottom = this.onScrollToBottom.bind(this);
	}

	state = {
		offset: 30,
		limit: 30,
		completed: false,
		albumId: 0,
	};

	componentDidMount () {
		const { fetchPhotosById, fetchAlbums, fetchPhotos } = this.props;
		let { ownerId: owner_id, objectId: album_id, page } = this.props.match.params;
		album_id = +album_id;

		// fetch albums to get album name, always
		fetchAlbums({ owner_id });

		// if photo page, getPhotoById for album_id first
		Promise.resolve()
		.then(() => {
			if (page === 'photo')
				return fetchPhotosById({ photos: `${owner_id}_${album_id}` })
				.then(([{ owner_id, album_id }]) => ({ owner_id, album_id }));
			else
				return { owner_id, album_id };
		})
		.then(({ owner_id, album_id }) => {
			this.setState({ albumId: album_id });
			fetchPhotos({ owner_id, album_id });
		});

		this.$views = document.querySelector('.views');
		this.$views.addEventListener('scroll', this.onScrollToBottom, false);
	}

	componentWillUnmount () {
		this.$views.removeEventListener('scroll', this.onScrollToBottom, false);
	}

	onScrollToBottom (e) {
		const $views = e.target;
		if ($views.scrollTop + window.innerHeight >= $views.scrollHeight - 100) {
			this.setState({
				offset: this.state.offset + this.state.limit,
			});
		}
	}

	getPhotoSrc (sizes = []) {
		let image = sizes.find(size => size.type === 'q');
		if (!image) image = sizes.find(size => size.type === 'x');
		return image.src;
	}

	sortAlbumPhotos (photos = []) {
		return photos.sort((a, b) => {
			if (a.likes.count > b.likes.count) return -1;
			if (a.likes.count < b.likes.count) return 1;
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		});
	}

	render () {
		const { photos, albums, isFetching } = this.props;
		const { page, ownerId, objectId } = this.props.match.params;

		if (isFetching || !this.state.albumId) return <Loader/>;

		let key = `${ownerId}_${objectId}`;
		if (page === 'photo') key = `${ownerId}_${this.state.albumId}`;

		const albumPhotos = photos[key] ? this.sortAlbumPhotos(photos[key].items) : [];
		const album = albums[ownerId].items.find(album => album.id === this.state.albumId);
		const albumTitle = album ? album.title : <span>&nbsp;</span>;
		if (albumTitle) document.title = albumTitle;
		const myLikesCount = albumPhotos.reduce((prev, curr) => curr.likes.user_likes + prev, 0);

		const slicedPhotos = albumPhotos.slice(0, this.state.offset);
		const list = slicedPhotos.map(photo =>
			<PhotoHOC
				key={photo.id}
				photo={photo}
				imageSrc={this.getPhotoSrc(photo.sizes)}
			/>
		);

		let placeholders = [1, 2, 3, 4, 5].map(i => <div key={i} className="photo"/>);
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
				<Viewer
					pathname={this.props.location.pathname}
					history={this.props.history}
					photos={albumPhotos}/>
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

const mapStateToProps = (state, ownProps) => {
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
