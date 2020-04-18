import React from 'react';
import PropTypes from 'prop-types';

import { useImageLoaded } from 'helpers/hooks';
import { getPhotoSrcFromSizes } from 'helpers';
import * as Styled from './styled';

const Photo = ({ photo }) => {
  const imageSrc = getPhotoSrcFromSizes(photo.sizes, 3);
  const backgroundImage = `url(${imageSrc})`;
  const imageLoaded = useImageLoaded(imageSrc);

  return (
    <Styled.Photo>
      <Styled.Panel>
        <Styled.Image style={{ backgroundImage }} imageLoaded={imageLoaded} />
      </Styled.Panel>
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
