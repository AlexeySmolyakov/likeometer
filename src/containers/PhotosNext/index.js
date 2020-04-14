import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import API from 'api';
import { Title } from 'styles/common';
import Photo from './Photo';
import { Photo as StyledPhoto } from './Photo/styled';
import * as Styled from './styled';

const PhotosNext = props => {
  const { match: { params: { ownerId, albumId } } } = props;

  // photos = {count, items}
  const [photos, setPhotos] = useState({ count: 0, items: [] });
  const [album, setAlbum] = useState({ title: '' });

  useEffect(() => {
    API.photos.fetchPhotos({ album_id: albumId, owner_id: ownerId })
      .then(setPhotos)
      .catch(console.warn);

    API.photos.fetchAlbums({ owner_id: ownerId, album_ids: albumId })
      .then(albums => {
        const currentAlbum = albums.items.find(i => i.id === +albumId);
        setAlbum(currentAlbum);
      })
      .catch(console.warn);
  }, [ownerId, albumId]);

  return (
    <Styled.PhotosNext>
      <Title>{album.title}</Title>
      <Styled.Wrapper>
        {photos.items.map(photo => <Photo key={photo.id} photo={photo} />)}
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
      </Styled.Wrapper>
    </Styled.PhotosNext>
  );
};

PhotosNext.propTypes = {
  photo: PropTypes.shape({}).isRequired,
};
PhotosNext.defaultProps = {};

export default PhotosNext;
