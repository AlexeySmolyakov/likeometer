import React, { useEffect, useState } from 'react';

import API from 'api';
import { Title, Subtitle } from 'styles/common';
import Photo from './Photo';
import { Photo as StyledPhoto } from './Photo/styled';
import * as Styled from './styled';
import { inflectionPhotos } from '../../helpers';

const PhotosNext = props => {
  const { match: { params: { ownerId, albumId } } } = props;

  // photos = {count, items}
  const [photos, setPhotos] = useState({ count: 0, items: [] });
  const [album, setAlbum] = useState({ title: '' });
  const [group, setGroup] = useState({ name: '' });

  const photosLength = photos.items.length;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    API.photos.fetchPhotos({ album_id: albumId, owner_id: ownerId })
      .then(setPhotos)
      .catch(console.warn);

    API.photos.fetchAlbums({ owner_id: ownerId, album_ids: albumId })
      .then(albums => {
        const currentAlbum = albums.items.find(i => i.id === +albumId);
        setAlbum(currentAlbum);
        document.title = `${currentAlbum.title} | Likeometer`;
      })
      .catch(console.warn);

    API.groups.fetchGroupsById({ group_ids: [-+ownerId] })
      .then(groups => setGroup(groups[0]))
      .catch(console.warn);
  }, [ownerId, albumId]);

  return (
    <Styled.PhotosNext>
      <Title>{album.title}</Title>
      <Subtitle>{`${group.name} • ${photosLength} ${inflectionPhotos(photosLength)}`}</Subtitle>
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

PhotosNext.propTypes = {};
PhotosNext.defaultProps = {};

export default PhotosNext;
