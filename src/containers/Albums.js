import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Album from '../components/Album'
import Loader from '../components/Loader'
import { fetchAlbums } from '../actions/AlbumsActions'
import { fetchFriends } from '../actions/FriendsActions'
import { declensionAlbums } from '../helpers'

class Albums extends Component {
	componentDidMount () {
		const { ownerId: owner_id } = this.props.match.params;

		this.props.fetchFriends();
		this.props.fetchAlbums({ owner_id });
	}

	render () {
		const { isFetching, albums, owner } = this.props;

		if (isFetching) return <Loader/>;

		const albumsWithPhotos = albums.filter(album => album.size > 0);
		const list = albumsWithPhotos.map(album =>
			<Album key={album.id} album={album}/>
		);

		const ownerName = owner ? `${owner.first_name} ${owner.last_name}` : <span>&nbsp;</span>;

		let placeholders = [];
		for (let i = 0; i < 11; i++) placeholders.push(<div key={i} className="album"/>);

		return (
			<div>
				<h1>{ownerName}</h1>
				<h3>
					{albumsWithPhotos.length} {declensionAlbums(albumsWithPhotos.length)}
				</h3>

				<div className="albums">
					{list}
					{placeholders}
				</div>
			</div>
		);
	}
}

Albums.propTypes = {};
Albums.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const currentUserId = state.user.user.uid;
	const ownerId = +ownProps.match.params.ownerId || currentUserId;
	const albums = state.albums.albums[ownerId] ? state.albums.albums[ownerId].items : [];
	const friends = state.friends.friends[currentUserId] ? state.friends.friends[currentUserId].items : [];

	const owner = friends.find(friend => friend.id === ownerId);

	return {
		owner,
		albums,
		isFetching: state.albums.isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchAlbums (options) {
		return dispatch(fetchAlbums(options))
	},
	fetchFriends () {
		return dispatch(fetchFriends())
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
