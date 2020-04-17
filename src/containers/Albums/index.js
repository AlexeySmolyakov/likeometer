import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import Album from '../../components/Album/index';
import Loader from '../../components/Loader';
import { albumsSelector, fetchAlbums } from '../../redux/albums';

import { fetchFriends } from '../../actions/FriendsActions';
import { fetchGroups } from '../../actions/GroupsActions';
import { createPlaceholder } from '../../helpers/index';

import './styles.scss';

class Albums extends Component {
  componentDidMount() {
    const { fetchAlbums, fetchGroups, fetchFriends, match: { params } } = this.props;
    const { ownerId: owner_id } = params;

    fetchAlbums({ owner_id });
    //(owner_id > 0) ? fetchFriends() : fetchGroups();
  }

  render() {
    const { isFetching, albums, owner } = this.props;
    const { ownerId } = this.props.match.params;

    const b = block('Albums');

    if (isFetching) return <Loader />;

    const albumsWithPhotos = albums.filter(album => album.size > 0);
    const list = albumsWithPhotos.map(album => <Album key={album.id} album={album} />);
    const placeholders = createPlaceholder(5, (i) => <div key={i} className="Album" />);

    let ownerName = <span>&nbsp;</span>;

    if (owner) {
      if (ownerId > 0) ownerName = `${owner.first_name} ${owner.last_name}`;
      else ownerName = owner.name;
    } else if (+ownerId === this.props.currentUserId) {
      ownerName = 'Мои альбомы';
    }
    document.title = ownerName;

    return (
      <div className={b()}>
        {list}
        {placeholders}
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
  const currentUserId = state.user.user.id;
  let ownerId = ownProps.match.params.ownerId || currentUserId;

  const albums = state.albums;
  //const friends = state.friends.friends;
  //const groups = state.groups.groups;

  //console.warn(albums);

  const albumItems = albums[ownerId] ? albums[ownerId].items : [];
  //console.warn(albumItems)
  let owner = null;

  //if (ownerId > 0) {
  //  // user albums
  //  ownerId = +ownerId;
  //  const friendItems = friends[currentUserId] ? friends[currentUserId].items : [];
  //  owner = friendItems.find(item => item.id === ownerId);
  //} else {
  //  // groups albums
  //  ownerId = -ownerId;
  //  const groupItems = groups[currentUserId] ? groups[currentUserId].items : [];
  //  owner = groupItems.find(item => item.id === ownerId);
  //}

  return {
    owner,
    currentUserId,
    albums: albumItems,
    isFetching: state.albums.isFetching,
  };
};

const mapDispatchToProps = {
  fetchAlbums,
  //fetchGroups,
  //fetchFriends,
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
