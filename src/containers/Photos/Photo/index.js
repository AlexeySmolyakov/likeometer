import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useImageLoaded } from 'helpers/hooks';
import { getPhotoSrcFromSizes } from 'helpers';
import heartFilledIcon from 'assets/heart-filled.svg';
import heartOutlineIcon from 'assets/heart-outline.svg';
import * as Styled from './styled';

const Photo = ({ photo }) => {
  const imageSrc = getPhotoSrcFromSizes(photo.sizes, 3);
  const backgroundImage = `url(${imageSrc})`;
  const imageLoaded = useImageLoaded(imageSrc);
  const isLiked = photo.likes.user_likes > 0;
  const likesCount = photo.likes.count;
  const photoHref = `/photo${photo.owner_id}_${photo.id}`;

  return (
    <Styled.Photo>
      <Link to={photoHref}>
        <Styled.Panel>
          <Styled.Likes>
            <Styled.Icon src={isLiked ? heartFilledIcon : heartOutlineIcon} />
            <div>{likesCount}</div>
          </Styled.Likes>
          <Styled.Image style={{ backgroundImage }} imageLoaded={imageLoaded} />
        </Styled.Panel>
      </Link>
    </Styled.Photo>
  );
};

Photo.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number,
    likes: PropTypes.shape({
      user_likes: PropTypes.number,
      count: PropTypes.number,
    }),
    owner_id: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
  }).isRequired,
};

export default Photo;
