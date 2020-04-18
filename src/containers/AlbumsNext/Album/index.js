import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getAlbumImageSrc } from 'helpers';
import { useImageLoaded } from 'helpers/hooks';
import * as Styled from './styled';

const AlbumNext = props => {
  const { album } = props;

  const { id, owner_id, title, sizes } = album;

  const imageSrc = getAlbumImageSrc({ sizes });
  const backgroundImage = `url(${imageSrc})`;
  const href = `/album${owner_id}_${id}`;
  const imageLoaded = useImageLoaded(imageSrc);

  return (
    <Styled.Album>
      <Link to={href}>
        <Styled.Panel>
          <Styled.Image style={{ backgroundImage }} imageLoaded={imageLoaded} />
          <Styled.Info>
            <Styled.Title>{title}</Styled.Title>
            <Styled.Size>{album.size}</Styled.Size>
          </Styled.Info>
        </Styled.Panel>
      </Link>
    </Styled.Album>
  );
};

AlbumNext.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number,
    owner_id: PropTypes.number,
    size: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
    })),
    title: PropTypes.string,
  }).isRequired,
};

export default AlbumNext;
