import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Album from '../components/Album'
import Loader from '../components/Loader'
import { fetchAlbums } from '../actions/AlbumsActions'
import { fetchFriends } from '../actions/FriendsActions'
import { fetchGroups } from '../actions/GroupsActions'
import { declensionAlbums } from '../helpers'

class Albums extends Component {
	componentDidMount () {
		const { ownerId: owner_id } = this.props.match.params;

		this.props.fetchAlbums({ owner_id });

		(owner_id > 0) ?
			// user albums
			this.props.fetchFriends() :
			// group albums
			this.props.fetchGroups();
	}

	render () {
		const { isFetching, albums, owner } = this.props;
		const { ownerId } = this.props.match.params;

		if (isFetching) return <Loader/>;

		const albumsWithPhotos = albums.filter(album => album.size > 0);
		const list = albumsWithPhotos.map(album =>
			<Album key={album.id} album={album}/>
		);

		let ownerName = <span>&nbsp;</span>;
		if (owner) {
			if (ownerId > 0) ownerName = `${owner.first_name} ${owner.last_name}`;
			else ownerName = owner.name;
			document.title = ownerName;
		}

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

Albums.propTypes = {
	owner: PropTypes.object,
	albums: PropTypes.array.isRequired,
};
Albums.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const currentUserId = state.user.user.uid;
	let ownerId = ownProps.match.params.ownerId || currentUserId;

	const albums = state.albums.albums;
	const friends = state.friends.friends;
	const groups = state.groups.groups;

	const albumItems = albums[ownerId] ? albums[ownerId].items : [];
	let owner = null;

	if (ownerId > 0) {
		// user albums
		ownerId = +ownerId;
		const friendItems = friends[currentUserId] ? friends[currentUserId].items : [];
		owner = friendItems.find(item => item.id === ownerId);
	} else {
		// groups albums
		ownerId = -ownerId;
		const groupItems = groups[currentUserId] ? groups[currentUserId].items : [];
		owner = groupItems.find(item => item.id === ownerId);
	}

	return {
		owner,
		albums: albumItems,
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
	fetchGroups () {
		return dispatch(fetchGroups())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
