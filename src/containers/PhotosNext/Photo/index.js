import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getPhotoSrcFromSizes } from 'helpers';
import * as Styled from './styled';

const Photo = ({ photo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = getPhotoSrcFromSizes(photo.sizes, 3);
  const backgroundImage = `url(${imageSrc})`;

  useEffect(() => {
    let image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = imageSrc;

    return () => {
      image.src = null;
      image = null;
    };
  }, [imageSrc]);

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
