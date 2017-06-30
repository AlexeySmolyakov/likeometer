import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Album from '../components/Album'
import Loader from '../components/Loader'
import { fetchAlbums } from '../actions/AlbumsActions'

class Albums extends Component {
	componentDidMount () {
		const userId = this.props.match.params.userId;
		this.props.fetchAlbums(userId);
	}

	render () {
		if (this.props.isFetching) return <Loader/>;

		const albumsWithPhotos = this.props.albums.filter(album => album.size > 0);
		const albums = albumsWithPhotos.map(album =>
			<Album key={album.id} album={album}/>
		);

		return (
			<div>
				<h1>Альбомы</h1>

				<div className="albums">
					{ albums }
					<div className="album"/>
					<div className="album"/>
					<div className="album"/>
					<div className="album"/>
					<div className="album"/>
				</div>
			</div>
		);
	}
}

Albums.propTypes = {};
Albums.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.userId || state.user.user.uid;
	const albums = state.albums.albums[uid] ? state.albums.albums[uid].items : [];

	return {
		albums,
		isFetching: state.albums.isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchAlbums (owner_id) {
		return dispatch(fetchAlbums({ owner_id }))
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
