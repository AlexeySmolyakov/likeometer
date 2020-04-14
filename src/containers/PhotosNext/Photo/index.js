import React from 'react';
import PropTypes from 'prop-types';

import { getPhotoSrcFromSizes } from 'helpers';
import * as Styled from './styled';

const Photo = ({ photo }) => {
  const photoUrl = getPhotoSrcFromSizes(photo.sizes, 3);
  const backgroundImage = `url(${photoUrl})`;

  return (
    <Styled.Photo>
      <Styled.Panel style={{ backgroundImage }} />
    </Styled.Photo>
  );
};

Photo.propTypes = {
  photo: PropTypes.shape({
    sizes: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
    })),
  }).isRequired,
};

export default Photo;
