import React, { Component } from 'react';
import { connect } from 'react-redux';
import block from 'bem-cn-lite';

import API from '../../api';
import Photo from '../../components/Photo';
import { userSelector } from '../../redux/user';
import { fetchAlbums } from '../../actions/AlbumsActions';
import { fetchAllPhotos } from '../../actions/PhotosActions';
import withImageLoader from '../../decorators/withImageOnLoad';
import './styles.scss';
import { getPhotoSrcFromSizes } from '../../helpers';

const WrapperPhoto = withImageLoader(Photo);

class Photos extends Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    const { user, fetchAllPhotos } = this.props;

    const { params } = this.props.match;

    const owner_id = Number(params.ownerId);
    const album_id = Number(params.objectId);

    console.warn(owner_id, album_id);

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

    return (
      <div className={b()}>
        {
          photos.map(i => {
            return <Photo
              photo={i}
              key={i.id}
              isLoaded
              imageSrc={getPhotoSrcFromSizes(i.sizes, 7)}
            />;
          })
        }
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
  fetchAllPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);