import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styled';

const Viewer = props => {
  const { photo, isOpened, onClose } = props;

  if (!photo || !isOpened) {
    return null;
  }

  console.log('>>>', photo);

  return (
    <Styled.Viewer onClick={onClose}>
      <picture>
        {photo.sizes.map(size => (
          <source key={size.width} media={`(max-width: ${size.width}px)`} srcSet={size.url} />
        ))}
        <Styled.Image src={photo.sizes[4].url} alt="" />
      </picture>
    </Styled.Viewer>
  );
};

Viewer.propTypes = {
  isOpened: PropTypes.bool,
  photo: PropTypes.shape({}),
  onClose: PropTypes.func,
};

Viewer.defaultProps = {
  photo: null,
  isOpened: false,
  onClose: () => false,
};

export default Viewer;
