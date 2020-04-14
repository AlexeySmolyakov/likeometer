import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Styled from './styled';

const getImageUrl = sizes => {
  const size = sizes.find(i => i.height > 180) || sizes[0];
  return size.src;
};

const AlbumNext = props => {
  const { album } = props;

  const { id, owner_id, title, sizes } = album;

  const imageUrl = getImageUrl(sizes);
  const backgroundImage = `url(${imageUrl})`;
  const href = `/album${owner_id}_${id}`;

  return (
    <Styled.AlbumNext as={Link} to={href}>
      <Styled.Panel style={{ backgroundImage }} />
      <Styled.Title>{title}</Styled.Title>
    </Styled.AlbumNext>
  );
};

AlbumNext.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number,
    owner_id: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
    })),
    title: PropTypes.string,
  }).isRequired,
};

export default AlbumNext;
