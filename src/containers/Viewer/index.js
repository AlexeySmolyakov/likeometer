import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styled';

const Viewer = props => {
  const { photo, isOpened, onClose } = props;

  if (!photo || !isOpened) {
    return null;
  }

  return (
    <Styled.Viewer>
      <picture>
        {photo.sizes.sort((a, b) => b.width - a.width)
          .map(size => (
            <source key={size.type} media={`(max-width: ${size.width}px)`} srcSet={size.url} />
          ))}
        <Styled.Image src={photo.sizes[0].url} alt="Photo" />
      </picture>
      <Styled.Overlay onClick={onClose} />
    </Styled.Viewer>
  );
};

Viewer.propTypes = {
  isOpened: PropTypes.bool,
  photo: PropTypes.shape({
    sizes: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string,
      width: PropTypes.number,
    })),
  }),
  onClose: PropTypes.func,
};

Viewer.defaultProps = {
  photo: null,
  isOpened: false,
  onClose: () => false,
};

export default Viewer;
