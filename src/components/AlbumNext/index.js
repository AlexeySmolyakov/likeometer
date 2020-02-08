import React from 'react';
import PropTypes from 'prop-types';

import { StyledAlbumNext, ImageBackground, Title } from './styled';

const getImageUrl = sizes => {
  const size = sizes.find(i => i.height > 180) || sizes[0];
  return size.src;
};

const AlbumNext = (props) => {
  const { data } = props;
  
  if (!data) return <StyledAlbumNext />;
  
  const { title, sizes } = data;
  const imageUrl = getImageUrl(sizes);
  const backgroundImage = `url(${imageUrl})`;
  
  return (
    <StyledAlbumNext>
      <ImageBackground style={{ backgroundImage }} />
      <Title>{title}</Title>
    </StyledAlbumNext>
  );
};

AlbumNext.propTypes = {};
AlbumNext.defaultProps = {};

export default AlbumNext;
