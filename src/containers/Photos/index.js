import React, { Component } from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import API from '../../api';
import Photo from '../../components/Photo/index';
import Album from '../../components/Album/index';
import Loader from '../../components/Loader/index';

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
    isLoading: true,
  };

  componentDidMount() {
    const { user, fetchAllPhotos, fetchPhotos, fetchAlbums } = this.props;

    const { params } = this.props.match;

    const owner_id = Number(params.ownerId);
    const album_id = Number(params.objectId);

    fetchAlbums({ owner_id });

    if (params.section === 'photo') return;

    API.photos.fetchAllPhotos({ owner_id, album_id })
    .then(response => {
      const sortedPhotos = response.items.sort((a, b) => b.likes.count - a.likes.count);
      this.setState({
        photos: sortedPhotos,
        isLoading: false,
      });
    })
    .catch(error => {
      console.warn(error);
    });
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.match.params !== this.props.match.params) {
      if (this.props.match.params.section === 'album') {
        if (this.state.photos.length === 0) {

          const owner_id = Number(this.props.match.params.ownerId);
          const album_id = Number(this.props.match.params.objectId);

          API.photos.fetchAllPhotos({ owner_id, album_id })
          .then(response => {
            const sortedPhotos = response.items.sort((a, b) => b.likes.count - a.likes.count);
            this.setState({
              photos: sortedPhotos,
              isLoading: false,
            });
          })
          .catch(error => {
            console.warn(error);
          });
        }
      }
    }
  }

  render() {
    const { photos, isLoading } = this.state;

    const b = block('Photos');
    const list = photos.map(i =>
      <WrapperPhoto photo={i} key={i.id} imageSrc={getPhotoSrcFromSizes(i.sizes, 5)} />);
    const placeholders = createPlaceholder(7, (i) => <div key={i} className="Photo" />);

    if (isLoading) return <Loader />;

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