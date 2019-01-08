import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';

import heart from '../../assets/heart.svg';
import './styles.scss';

class Photo extends React.PureComponent {
  render() {
    const { photo, isLoaded, imageSrc } = this.props;
    const imageStyle = { backgroundImage: `url(${imageSrc})` };
    const userLikes = photo.likes.user_likes ? 'fa-heart' : 'fa-heart-o';
    const isLoadedClass = isLoaded ? 'is-loaded' : '';

    const b = block('Photo');

    const pathname = `/photo${photo.owner_id}_${photo.id}`;
    const count = new Intl.NumberFormat().format(photo.likes.count);

    return (
      <Link className={b()} to={{ pathname }}>
        <div className="wrap">
          <div className="thumb">
            <div className={`image ${isLoadedClass}`} style={imageStyle} />
            <div className="counters">
              <div className="likes">
                <img src={heart} alt="Likes" />
                {count}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};
Photo.defaultProps = {};

export default Photo;