import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styled';

const Viewer = props => {
  const { photo, isOpened, onClose } = props;

  if (!photo || !isOpened) {
    return null;
  }

  return (
    <Styled.Viewer onClick={onClose}>
      <Styled.Image src={photo.sizes[4].url} alt="" />
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
