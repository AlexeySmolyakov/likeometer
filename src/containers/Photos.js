import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withImageOnLoad from '../decorators/withImageOnLoad'
import Photo from '../components/Photo'
const PhotoHOC = withImageOnLoad(Photo);

import Loader from '../components/Loader'
import { fetchPhotos } from '../actions/PhotosActions'
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
		loading: false,
	};

	componentDidMount () {
		const { ownerId: owner_id, albumId: album_id } = this.props.match.params;

		this.props.fetchPhotos({ owner_id, album_id });
		this.props.fetchAlbums({ owner_id });

		this.$views = document.querySelector('.views');
		this.$views.addEventListener('scroll', this.onScrollToBottom, false);
	}

	onScrollToBottom (e) {
		const $views = e.target;
		if ($views.scrollTop + window.innerHeight >= $views.scrollHeight - 100) {
			this.setState({
				offset: this.state.offset + this.state.limit,
			});
		}
	}

	componentWillReceiveProps (nextProps, nextContext) {
		const { album = {} } = nextProps;
		if (album.title) document.title = album.title;
	}

	componentWillUnmount () {
		this.$views.removeEventListener('scroll', this.onScrollToBottom, false);
	}

	getPhotoSize (sizes = []) {
		let image = sizes.find(size => size.type === 'q');
		if (!image) image = sizes.find(size => size.type === 'x');
		return image.src;
	}

	render () {
		const { album = { title: '' }, photos, isFetching, myLikes } = this.props;

		if (isFetching) return <Loader/>;

		let placeholders = [];
		for (let i = 0; i < 5; i++) placeholders.push(<div key={i} className="photo"/>);

		const slicedPhotos = photos.slice(0, this.state.offset);

		const list = slicedPhotos.map(photo =>
			<PhotoHOC
				key={photo.id}
				photo={photo}
				imageSrc={this.getPhotoSize(photo.sizes)}
			/>
		);

		return (
			<div>
				<h1>{album.title ? album.title : <span>&nbsp;</span>}</h1>
				<h3>
					{photos.length} {declensionPhotos(photos.length)}
					{myLikes > 0 && [
						<span key={'Dot1'}> &middot; </span>,
						`Нравится ${myLikes} ${declensionPhotos(myLikes)}`
					]}
				</h3>

				<div className="photos">
					{list}
					{placeholders}
				</div>
			</div>
		);
	}
}

Photos.propTypes = {
	photos: PropTypes.array.isRequired,
};
Photos.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	let { ownerId, albumId } = ownProps.match.params;
	albumId = +albumId;
	ownerId = +ownerId;

	const key = `${ownerId}_${albumId}`;
	const photos = state.photos.photos[key] ? state.photos.photos[key].items : [];
	const sortedPhotos = photos.sort((a, b) => {
		if (a.likes.count > b.likes.count) return -1;
		if (a.likes.count < b.likes.count) return 1;
		return 0;
	});

	const myLikes = photos.reduce((prev, curr) => curr.likes.user_likes + prev, 0);

	const albums = state.albums.albums[ownerId] || { items: [] };
	const album = albums.items.find(album => album.id === albumId);

	return {
		album,
		myLikes,
		photos: sortedPhotos,
		isFetching: state.photos.isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchPhotos (options) {
		return dispatch(fetchPhotos(options))
	},
	fetchAlbums (options) {
		return dispatch(fetchAlbums(options))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
