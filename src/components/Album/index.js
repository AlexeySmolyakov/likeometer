import React from 'react';
import PropTypes from 'prop-types';
import { declensionPhotos } from '../../helpers/index';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  state = {
    isLoaded: 'is-loaded',
  };

  componentDidMount() {
    const { album } = this.props;
    const imageSrc = album.sizes.slice(-1)[0].src;

    //this.image = new Image();
    //this.image.onload = () => this.setState({ isLoaded: 'is-loaded' });
    //this.image.src = imageSrc;
  }

  componentWillUnmount() {
    //this.image.onload = null;
  }

  render() {
    const { album } = this.props;

    const imageSrc = album.sizes.slice(-1)[0].src;
    const imageStyle = { backgroundImage: `url(${imageSrc})` };

    const size = `${album.size} ${declensionPhotos(album.size)}`;

    return (
      <Link className="album" to={`/album${album.owner_id}_${album.id}`}>
        <div className="wrap">
          <div className="thumb">
            <div className={`image ${this.state.isLoaded}`} style={imageStyle} />
          </div>
          <div className="title" title={album.title}>{album.title}</div>
          <div className="size">{size}</div>
        </div>
      </Link>
    );
  }
}

Album.propTypes = {};
Album.defaultProps = {};

export default Album;