import React, { useEffect, useState, useRef } from 'react';

import API from 'api';
import { inflectionPhotos } from 'helpers';
import { Title, Subtitle } from 'styles/common';
import { Photo as StyledPhoto } from './Photo/styled';
import Photo from './Photo';
import * as Styled from './styled';

const PhotosNext = props => {
  const { match: { params } } = props;

  // params
  const ownerId = +params.ownerId;
  const albumId = +params.albumId;
  const isGroup = ownerId < 0;

  // states
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({ title: '', size: 0 });
  const [group, setGroup] = useState({ name: '' });
  const [page, setPage] = useState(0);
  const [canFetchPhotos, setCanFetchPhotos] = useState(false);

  const photosRef = useRef();

  // fetch initial data
  useEffect(() => {
    // scroll to top on new page
    window.scrollTo({ top: 0 });

    // fetch albums
    API.photos.fetchAlbums({ owner_id: +ownerId, album_ids: +albumId })
      .then(albums => {
        // find album
        const currentAlbum = albums.items.find(i => i.id === +albumId);

        // set album info
        setAlbum(currentAlbum);

        // change title
        document.title = `${currentAlbum.title} | Likeometer`;
      })
      .catch(console.warn);

    // fetch groups
    if (isGroup) {
      API.groups.fetchGroupsById({ group_ids: [-ownerId] })
        .then(groups => setGroup(groups[0]))
        .catch(console.warn);
    }
  }, [ownerId, albumId, isGroup]);

  // infinite scroll
  useEffect(() => {
    const onScroll = () => {
      const height = photosRef.current.clientHeight;
      const { innerHeight, pageYOffset } = window;

      if ((height - 300 < innerHeight + pageYOffset) && canFetchPhotos) {
        setCanFetchPhotos(true);
        setPage(page + 1);
        console.warn('>>> Load');
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, canFetchPhotos]);

  // fetch photos
  useEffect(() => {
    const options = {
      album_id: albumId,
      owner_id: ownerId,
      offset: page * 100,
    };

    setCanFetchPhotos(false);

    API.photos.fetchPhotos(options)
      .then(({ items }) => {
        setPhotos(p => [...p, ...items]);
        setCanFetchPhotos(true);
      })
      .catch(console.warn);
  }, [ownerId, albumId, page]);

  const pieces = [];
  if (group.name) pieces.push(group.name);
  pieces.push(`${album.size} ${inflectionPhotos(album.size)}`);
  const subtitle = pieces.join(' • ');

  return (
    <Styled.PhotosNext ref={photosRef}>
      <Title>{album.title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Styled.Wrapper>
        {photos.map(photo => <Photo key={photo.id} photo={photo} />)}
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
        <StyledPhoto />
      </Styled.Wrapper>
    </Styled.PhotosNext>
  );
};

export default PhotosNext;
