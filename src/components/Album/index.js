import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import { inflectionPhotos, getAlbumImageSrc } from '../../helpers/index';
import './styles.scss';

class Album extends React.Component {
  state = {
    isImageLoaded: false,
  };

  componentDidMount() {
    const { album } = this.props;

    this.image = new Image();
    this.image.onload = () => this.setState({ isImageLoaded: true });
    this.image.src = getAlbumImageSrc(album);
  }

  componentWillUnmount() {
    this.image.onload = null;
  }

  render() {
    const { album, album: { size, id, title, owner_id } } = this.props;
    const { isImageLoaded } = this.state;

    const b = block('Album');

    const subtitle = `${size} ${inflectionPhotos(size)}`;
    const style = { backgroundImage: `url(${getAlbumImageSrc(album)})` };

    return (
      <Link className={b()} to={`/album${owner_id}_${id}`}>
        <div className={b('wrap')}>
          <div className={b('thumb')}>
            <div className={b('image', { isImageLoaded })} style={style} />
          </div>
          <div className={b('title')} title={title}>{title}</div>
          <div className={b('subtitle')}>{subtitle}</div>
        </div>
      </Link>
    );
  }
}

Album.propTypes = {
  album: PropTypes.object,
};
Album.defaultProps = {};

export default Album;