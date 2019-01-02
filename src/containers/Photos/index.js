import React, { Component } from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import API from '../../api';
import Photo from '../../components/Photo/index';
import Album from '../../components/Album/index';

import { userSelector } from '../../redux/user';
import { fetchAlbums } from '../../redux/albums';
import { fetchAllPhotos } from '../../actions/PhotosActions';
import { fetchPhotos, photosSelector } from '../../redux/photos';
import withImageLoader from '../../decorators/withImageOnLoad';
import { createPlaceholder, getPhotoSrcFromSizes } from '../../helpers';

import './styles.scss';

const WrapperPhoto = withImageLoader(Photo);

class Photos extends Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    const { user, fetchAllPhotos, fetchPhotos, fetchAlbums } = this.props;

    const { params } = this.props.match;

    const owner_id = Number(params.ownerId);
    const album_id = Number(params.objectId);

    //console.warn(owner_id, album_id);
    //fetchPhotos({ owner_id, album_id });

    fetchAlbums({ owner_id });

    API.photos.fetchPhotos({ owner_id, album_id })
    .then(response => {
      this.setState({ photos: response.items });
    })
    .catch(error => {
      console.warn(error);
    });
  }

  render() {
    const { photos } = this.state;

    const b = block('Photos');
    const list = photos.map(i =>
      <Photo photo={i} isLoaded key={i.id} imageSrc={getPhotoSrcFromSizes(i.sizes, 7)} />);
    const placeholders = createPlaceholder(7, (i) => <div key={i} className="Photo" />);

    return (
      <div className={b()}>
        {list}
        {placeholders}
      </div>
    );
  }
}

Photos.propTypes = {};
Photos.defaultProps = {};

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  fetchAlbums,
  fetchPhotos,
  fetchAllPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);