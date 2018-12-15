import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withImageOnLoad from '../decorators/withImageOnLoad';
import PhotoComponent from '../components/Photo';

const Photo = withImageOnLoad(PhotoComponent);

import { inflectionPhotos, createPlaceholder, getPhotoSrcFromSizes } from '../helpers';

class Photos extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      limit: 30,
      offset: 30,
      completed: false,
    };

    this.$views = null;
    this.onScrollToBottom = this.onScrollToBottom.bind(this);
  }

  componentDidMount() {
    this.$views = document.querySelector('.views');
    this.$views.addEventListener('scroll', this.onScrollToBottom, false);

    //const options = {
    //	root: document.querySelector('.views'),
    //	rootMargin: '0px',
    //	threshold: 1.0
    //};
    //const callback = function (entries, observer) {
    //	console.warn('callback')
    //};
    //window.observer = new IntersectionObserver(callback, options);
    //
    //const target = document.querySelector('.photo');
    //window.observer.observe(target);
  }

  componentWillUnmount() {
    this.$views.removeEventListener('scroll', this.onScrollToBottom, false);
  }

  onScrollToBottom(e) {
    const $views = e.target;
    if (this.state.completed || this.props.isFetching) return;

    const { ownerId, albumId } = this.props;
    let key = `${ownerId}_${albumId}`;
    const photos = this.props.photos[key].items;

    if ($views.scrollTop + window.innerHeight >= $views.scrollHeight - 100) {
      const offset = this.state.offset + this.state.limit;
      this.setState({
        offset,
        completed: photos.length <= offset,
      });
    }
  }

  render() {
    const { photos, albums, ownerId, albumId } = this.props;

    const key = `${ownerId}_${albumId}`;
    const photosObject = (photos[key] || { items: [], count: 0 });
    const photosItems = photosObject.items;
    const albumsObject = (albums[ownerId] || { items: [], count: 0 });
    const albumsItems = albumsObject.items;

    const album = albumsItems.find(album => album.id === albumId) || {};
    document.title = album.title;

    const myLikesCount = photosItems.reduce((prev, curr) => curr.likes.user_likes + prev, 0);
    const slicedPhotos = photosItems.slice(0, this.state.offset);
    const list = slicedPhotos.map(photo =>
      <Photo
        key={photo.id}
        photo={photo}
        imageSrc={getPhotoSrcFromSizes(photo.sizes, 7)}
      />,
    );

    return (
      <div>
        <h1>{album.title}</h1>
        <h3>
          {photosItems.length} {inflectionPhotos(photosItems.length)}
          {myLikesCount > 0 && [
            <span key={'Dot1'}> &middot; </span>,
            `Нравится ${myLikesCount} ${inflectionPhotos(myLikesCount)}`,
          ]}
        </h3>
        <div className="photos">
          {list}
          {createPlaceholder(5, (i) => <div key={i} className="photo" />)}
        </div>
      </div>
    );
  }
}

Photos.propTypes = {
  albums: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  ownerId: PropTypes.number.isRequired,
  albumId: PropTypes.number.isRequired,
};
Photos.defaultProps = {};

export default Photos;
