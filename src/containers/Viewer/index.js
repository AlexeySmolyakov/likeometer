import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite';

import API from '../../api';
import './styles.scss';

class Viewer extends Component {
  state = {
    photo: null,
  };

  componentDidMount() {
    this.getPhoto();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps.location.pathname !== this.props.location.pathname)
      this.getPhoto();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      photo: !nextProps.isOpen ? null : prevState.photo,
    };
  }

  getPhoto = () => {
    const photoRegExp = new RegExp(/\/photo([\d\-_]+)/);
    const matches = photoRegExp.exec(this.props.location.pathname);

    if (!matches) return;
    const photos = matches[1];

    API.photos.fetchPhotosById({ photos })
    .then(photo => {
      this.setState({ photo: photo[0] });
    });
  };

  onImgClick = () => {
    const { history } = this.props;
    const { photo } = this.state;

    const href = `/album${photo.owner_id}_${photo.album_id}`;
    history.push(href);
  };

  render() {
    const { isOpen } = this.props;
    const { photo } = this.state;

    const b = block('Viewer');

    if (!photo) return null;

    console.warn(photo);

    const src = photo.sizes[0].src;
    const sizes = photo.sizes.sort((a, b) => -a.width + b.width);

    return (
      <div className={b({ isOpen })}>
        <picture>
          {
            sizes.map(i =>
              <source key={i.type} srcSet={i.src} media={`(min-width: ${i.width}px)`} />)
          }
          <img src={src} alt={'Image'} onClick={this.onImgClick} />
        </picture>
      </div>
    );
  }
}

Viewer.propTypes = {
  isOpen: PropTypes.bool,
};
Viewer.defaultProps = {
  isOpen: false,
};

export default Viewer;
